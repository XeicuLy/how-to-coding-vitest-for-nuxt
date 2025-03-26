import { describe, expect, test } from 'vitest';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { mountSuspendedComponent } from '@/helpers/test';

describe('src/components/PrimaryButton.vue', () => {
  test('ボタンをクリックしたときに、emitイベントが発火するか', async () => {
    const wrapper = await mountSuspendedComponent(PrimaryButton);
    const target = wrapper.find('button');

    expect(wrapper.exists()).toBe(true);
    expect(target.exists()).toBe(true);

    await target.trigger('click');

    // どちらか一方でも良い
    expect(wrapper.emitted('emitTest')).toHaveLength(1);
    expect(wrapper.emitted()).toHaveProperty('emitTest');
  });
});
