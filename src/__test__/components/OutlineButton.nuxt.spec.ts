import { describe, expect, test } from 'vitest';
import OutlineButton from '@/components/OutlineButton.vue';
import { mountSuspendedComponent } from '@/helpers/test';

describe('src/components/OutlineButton.vue', () => {
  test('slotのコンテンツが正しくレンダリングされるか', async () => {
    const slots = {
      default: () => h('div', { id: 'slot-test' }, [h('p', 'slot content')]),
    };
    const wrapper = await mountSuspendedComponent(OutlineButton, { slots });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#slot-test').exists()).toBe(true);
    expect(wrapper.find('p').text()).toBe('slot content');
  });
});
