import { describe, expect, test } from 'vitest';
import ChildComponent from '@/components/props/ChildComponent.vue';
import ParentComponent from '@/components/props/ParentComponent.vue';
import { mountSuspendedComponent } from '@/helpers/test';

describe('src/components/props/ParentComponent.vue', () => {
  test('子コンポーネントに正しいPropsが渡されるか（stub）', async () => {
    const ChildComponent = {
      props: ['text'],
      template: '<div id="test">Child Component Stub</div>',
    };
    const stubs = { ChildComponent };
    const wrapper = await mountSuspendedComponent(ParentComponent, { stubs });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(ChildComponent).props('text')).toBe('Hello World');
  });

  test('子コンポーネントに正しいPropsが渡されるか（mount）', async () => {
    const wrapper = await mountSuspendedComponent(ParentComponent);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(ChildComponent).props('text')).toBe('Hello World');
  });
});
