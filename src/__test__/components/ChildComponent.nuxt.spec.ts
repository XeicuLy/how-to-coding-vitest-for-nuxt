import { describe, expect, test } from 'vitest';
import ChildComponent from '@/components/ChildComponent.vue';
import { mountSuspendedComponent } from '@/helpers/test';

describe('src/components/ChildComponent.vue', () => {
  describe('Propsテスト', () => {
    test('親コンポーネントから受け取ったPropsの値が適切に表示されるか', async () => {
      const props = {
        textContent: 'Test Props',
      };
      const wrapper = await mountSuspendedComponent(ChildComponent, { props });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('#child-component').text()).toBe('Test Props');
    });

    test('親コンポーネントからPropsが渡されない場合、デフォルト値が表示されるか', async () => {
      const wrapper = await mountSuspendedComponent(ChildComponent);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('#child-component').text()).toBe('Default Text');
    });
  });
});
