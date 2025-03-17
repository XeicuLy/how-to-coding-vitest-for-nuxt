import { describe, expect, test } from 'vitest';
import ChildComponent from '@/components/ChildComponent.vue';
import ParentComponent from '@/components/ParentComponent.vue';
import { mountSuspendedComponent } from '@/helpers/test';

describe('src/components/ParentComponent.vue', () => {
  describe('レンダリングテスト', () => {
    test('要素が適切にマウントされるか', async () => {
      const wrapper = await mountSuspendedComponent(ParentComponent);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('#parent-component').exists()).toBe(true);
    });

    test('子コンポーネントが正しくレンダリングされているか(stub)', async () => {
      const ChildComponent = {
        template: '<div id="test">Child Component Stub</div>',
      };
      const stubs = { ChildComponent };
      const wrapper = await mountSuspendedComponent(ParentComponent, { stubs });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(ChildComponent).exists()).toBe(true);
    });

    test('子コンポーネントが正しくレンダリングされているか(実際のコンポーネント)', async () => {
      const wrapper = await mountSuspendedComponent(ParentComponent);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(ChildComponent).exists()).toBe(true);
    });

    test('複数ある同じ名前の子コンポーネントが正しくレンダリングされているか', async () => {
      const OutlineButton = {
        template: '<button class="test">Outline Button</button>',
      };
      const stubs = { OutlineButton };
      const wrapper = await mountSuspendedComponent(ParentComponent, { stubs });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findAllComponents(OutlineButton).length).toBe(2);
      expect(wrapper.findAllComponents(OutlineButton)[0].exists()).toBe(true);
      expect(wrapper.findAllComponents(OutlineButton)[1].exists()).toBe(true);
    });
  });

  describe('Propsテスト', () => {
    test('子コンポーネントに正しいPropsが渡されるか(stub)', async () => {
      const ChildComponent = {
        props: ['textContent'],
        template: '<div id="test">Child Component Stub</div>',
      };
      const stubs = { ChildComponent };
      const wrapper = await mountSuspendedComponent(ParentComponent, { stubs });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(ChildComponent).props('textContent')).toBe('Hello World');
    });

    test('子コンポーネントに正しいPropsが渡されるか(実際のコンポーネント)', async () => {
      const wrapper = await mountSuspendedComponent(ParentComponent);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(ChildComponent).props('textContent')).toBe('Hello World');
    });
  });
});
