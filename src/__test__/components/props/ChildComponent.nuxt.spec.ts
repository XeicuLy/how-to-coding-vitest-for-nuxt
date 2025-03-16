import { describe, expect, test } from 'vitest';
import ChildComponent from '@/components/props/ChildComponent.vue';
import { mountSuspendedComponent } from '@/helpers/test';

describe('ChildComponent.vue', () => {
  describe('Propsのテスト', () => {
    test('親コンポーネントから受け取ったPropsの値が適切に表示されるか', async () => {
      const props = {
        text: 'Test Props',
      };
      const wrapper = await mountSuspendedComponent(ChildComponent, { props });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('#child-component').text()).toBe('Test Props');
    });
  });
});
