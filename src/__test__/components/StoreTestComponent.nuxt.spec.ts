import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import StoreTestComponent from '@/components/StoreTestComponent.vue';
import { bindTestingPinia, mountSuspendedComponent } from '@/helpers/test';
import { useTestStore } from '@/store/testStore';

describe('src/components/StoreTestComponent.vue', () => {
  let testingPinia: ReturnType<typeof bindTestingPinia>;
  let testStore: ReturnType<typeof useTestStore>;

  beforeEach(() => {
    testingPinia = bindTestingPinia();
    testStore = useTestStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  test('storeの値が正しく表示されているか', async () => {
    testStore.count = 5;

    const wrapper = await mountSuspendedComponent(StoreTestComponent, { testingPinia });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="state"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="state"]').text()).toBe('5');
    expect(wrapper.find('[data-testid="getters"]').text()).toBe('10');
  });

  test('storeの値が変更されると表示も変更されるか', async () => {
    testStore.count = 5;

    const wrapper = await mountSuspendedComponent(StoreTestComponent, { testingPinia });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="state"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="state"]').text()).toBe('5');
    expect(wrapper.find('[data-testid="getters"]').text()).toBe('10');

    testStore.count = 10;

    await nextTick();

    expect(wrapper.find('[data-testid="state"]').text()).toBe('10');
    expect(wrapper.find('[data-testid="getters"]').text()).toBe('20');
  });
});
