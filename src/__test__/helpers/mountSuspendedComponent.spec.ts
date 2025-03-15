import { defineComponent, h, ref, computed, defineAsyncComponent, nextTick } from 'vue';
import { defineStore } from 'pinia';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { bindTestingPinia } from '@/helpers/test/bindTestingPinia';
import { mountSuspendedComponent } from '@/helpers/test/mountSuspendedComponent';

// テスト用のシンプルなコンポーネント
const TestComponent = defineComponent({
  props: {
    message: {
      type: String,
      default: 'デフォルトメッセージ',
    },
  },
  setup(props) {
    const count = ref(0);
    const doubledCount = computed(() => count.value * 2);

    const increment = () => {
      count.value++;
    };

    return {
      count,
      doubledCount,
      increment,
      message: props.message,
    };
  },
  render() {
    return h('div', [
      h('h1', this.message),
      h('p', `Count: ${this.count}`),
      h('p', `Doubled: ${this.doubledCount}`),
      h('button', { onClick: this.increment }, 'Increment'),
    ]);
  },
});

// 非同期コンポーネント
const AsyncComponent = defineComponent({
  setup() {
    const asyncData = ref('非同期データ');
    return { asyncData };
  },
  render() {
    return h('div', [h('p', `Async data: ${this.asyncData}`)]);
  },
});

// 非同期コンポーネントとして使用
const AsyncTestComponent = defineAsyncComponent(() => Promise.resolve(AsyncComponent));

// Piniaストアの定義
const useCounterStore = defineStore('counter', {
  state: () => ({
    globalCount: 0,
  }),
  actions: {
    increment() {
      this.globalCount++;
    },
  },
});

describe('mountSuspendedComponent', () => {
  beforeEach(() => {
    // テスト実行前の初期化処理
    vi.resetAllMocks();
  });

  test('基本的なコンポーネントをマウントできること', async () => {
    const wrapper = await mountSuspendedComponent(TestComponent);

    expect(wrapper.find('h1').text()).toBe('デフォルトメッセージ');
    expect(wrapper.find('p').text()).toBe('Count: 0');

    await wrapper.find('button').trigger('click');
    expect(wrapper.find('p').text()).toBe('Count: 1');
  });

  test('propsを渡してコンポーネントをマウントできること', async () => {
    const wrapper = await mountSuspendedComponent(TestComponent, {
      props: { message: 'カスタムメッセージ' },
    });

    expect(wrapper.find('h1').text()).toBe('カスタムメッセージ');
  });

  test('VMValue型パラメータを使用してコンポーネントインスタンスにアクセスできること', async () => {
    interface TestComponentInstance {
      doubledCount: number;
      increment: () => void;
      message: string;
    }

    const wrapper = await mountSuspendedComponent<TestComponentInstance>(TestComponent);

    expect(wrapper.vm.doubledCount).toBe(0);

    wrapper.vm.increment();
    await nextTick();

    expect(wrapper.vm.doubledCount).toBe(2);
    expect(wrapper.vm.message).toBe('デフォルトメッセージ');
  });

  test('非同期コンポーネントを正しくマウントできること', async () => {
    const wrapper = await mountSuspendedComponent(AsyncTestComponent);

    expect(wrapper.find('p').text()).toBe('Async data: 非同期データ');
  });

  test('スロットを持つコンポーネントをマウントできること', async () => {
    const SlottedComponent = defineComponent({
      render() {
        return h('div', [
          h('header', {}, this.$slots.header ? this.$slots.header() : 'デフォルトヘッダー'),
          h('main', {}, this.$slots.default ? this.$slots.default() : 'デフォルトコンテンツ'),
          h('footer', {}, this.$slots.footer ? this.$slots.footer() : 'デフォルトフッター'),
        ]);
      },
    });

    const wrapper = await mountSuspendedComponent(SlottedComponent, {
      slots: {
        header: () => 'カスタムヘッダー',
        default: () => 'カスタムコンテンツ',
        footer: () => 'カスタムフッター',
      },
    });

    expect(wrapper.find('header').text()).toBe('カスタムヘッダー');
    expect(wrapper.find('main').text()).toBe('カスタムコンテンツ');
    expect(wrapper.find('footer').text()).toBe('カスタムフッター');
  });

  test('Piniaストアを使用するコンポーネントをテストできること', async () => {
    const StoreComponent = defineComponent({
      setup() {
        const store = useCounterStore();

        return {
          store,
          incrementGlobal: () => store.increment(),
        };
      },
      render() {
        return h('div', [
          h('p', `Global count: ${this.store.globalCount}`),
          h('button', { onClick: this.incrementGlobal }, 'Increment Global'),
        ]);
      },
    });

    const pinia = bindTestingPinia();
    const wrapper = await mountSuspendedComponent(StoreComponent, {
      testingPinia: pinia,
    });

    expect(wrapper.find('p').text()).toBe('Global count: 0');

    await wrapper.find('button').trigger('click');
    expect(wrapper.find('p').text()).toBe('Global count: 1');

    const store = useCounterStore();
    expect(store.globalCount).toBe(1);
  });

  test('初期状態を持つPiniaストアを使用するコンポーネントをテストできること', async () => {
    const StoreComponent = defineComponent({
      setup() {
        const store = useCounterStore();
        return { store };
      },
      render() {
        return h('p', `Global count: ${this.store.globalCount}`);
      },
    });

    const pinia = bindTestingPinia({
      counter: {
        globalCount: 10,
      },
    });

    const wrapper = await mountSuspendedComponent(StoreComponent, {
      testingPinia: pinia,
    });

    expect(wrapper.find('p').text()).toBe('Global count: 10');
  });

  test('shallow オプションが機能すること', async () => {
    const ChildComponent = defineComponent({
      render() {
        return h('div', 'Child Component');
      },
    });

    const ParentComponent = defineComponent({
      components: {
        ChildComponent,
      },
      render() {
        return h('div', [h('h1', 'Parent Component'), h(ChildComponent)]);
      },
    });

    const wrapper = await mountSuspendedComponent(ParentComponent, {
      shallow: true,
    });

    // shallowがtrueの場合、子コンポーネントはスタブ化される
    expect(wrapper.findComponent(ChildComponent).exists()).toBe(true);
    expect(wrapper.text()).not.toContain('Child Component');
  });

  test('stubsオプションが機能すること', async () => {
    const CustomButton = defineComponent({
      name: 'CustomButton',
      render() {
        return h('button', '複雑なボタン');
      },
    });

    const StubTestComponent = defineComponent({
      components: {
        CustomButton,
      },
      render() {
        return h('div', [h('h1', 'Main Component'), h(CustomButton)]);
      },
    });

    const wrapper = await mountSuspendedComponent(StubTestComponent, {
      stubs: {
        CustomButton: true, // CustomButtonをスタブ化
      },
    });

    expect(wrapper.findComponent(CustomButton).exists()).toBe(true);
    expect(wrapper.text()).not.toContain('複雑なボタン');
  });

  test('mocksオプションが機能すること', async () => {
    const mockPush = vi.fn();

    const MockTestComponent = defineComponent({
      methods: {
        navigate() {
          // Vue Testでは、mocksはthis経由でアクセスする
          this.$router.push('/test');
        },
      },
      render() {
        return h('button', { onClick: this.navigate }, 'Navigate');
      },
    });

    const wrapper = await mountSuspendedComponent(MockTestComponent, {
      mocks: {
        $router: {
          push: mockPush,
        },
      },
    });

    await wrapper.find('button').trigger('click');
    expect(mockPush).toHaveBeenCalledWith('/test');
  });
});
