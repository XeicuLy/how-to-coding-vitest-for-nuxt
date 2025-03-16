import { describe, expect, test } from 'vitest';
import Mount from '@/components/mount/Mount.vue';
import { mountSuspendedComponent } from '@/helpers/test';

describe('src/components/mount/Mount.vue', () => {
  test('マウントされるか', async () => {
    const wrapper = await mountSuspendedComponent(Mount);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#mount').exists()).toBe(true);
  });
});
