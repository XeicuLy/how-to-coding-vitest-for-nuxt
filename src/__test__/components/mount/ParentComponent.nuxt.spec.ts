import { describe, expect, test } from 'vitest';
import ChildComponent from '@/components/mount/ChildComponent.vue';
import ParentComponent from '@/components/mount/ParentComponent.vue';
import { mountSuspendedComponent } from '@/helpers/test';

describe('src/components/mount/ParentComponent.vue', () => {
  test('子コンポーネントが正しくレンダリングされているか（stub）', async () => {
    const ChildComponent = {
      template: '<div id="test">Child Component Stub</div>',
    };
    const stubs = { ChildComponent };
    const wrapper = await mountSuspendedComponent(ParentComponent, { stubs });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(ChildComponent).exists()).toBe(true);
  });

  test('子コンポーネントが正しくレンダリングされているか（mount）', async () => {
    const wrapper = await mountSuspendedComponent(ParentComponent);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(ChildComponent).exists()).toBe(true);
  });
});
