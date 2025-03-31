import { describe, expect, test, vi } from 'vitest';
import ChildComponent from '@/components/ChildComponent.vue';
import { mountSuspendedComponent } from '@/helpers/test';

vi.mock('@/utils/logger.ts', () => ({
  logger: vi.fn(),
}));

describe('src/components/ChildComponent.vue', () => {
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

  test('ボタンをクリックしたときに外部で定義したイベントが正しく発火するか', async () => {
    const wrapper = await mountSuspendedComponent(ChildComponent);
    const target = wrapper.find('button');

    expect(target.exists()).toBe(true);

    await target.trigger('click');

    expect(logger).toHaveBeenCalledTimes(1);
  });
});
