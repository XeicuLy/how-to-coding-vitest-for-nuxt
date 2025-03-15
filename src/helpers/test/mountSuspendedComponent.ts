import type { Component, ComponentPublicInstance, Slots } from 'vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { RouterLinkStub, type VueWrapper } from '@vue/test-utils';
import type { bindTestingPinia } from './bindTestingPinia';

interface MountOptions {
  attachTo?: Element | string;
  props?: Record<string, unknown>;
  slots?: Record<string, () => VNode | VNode[] | string> | Slots;
  shallow?: boolean;
  stubs?: Record<string, Component | boolean>;
  mocks?: Record<string, unknown>;
  options?: Record<string, unknown>;
}

const DEFAULT_STUBS = {
  NuxtLink: RouterLinkStub,
} as const;

const DEFAULT_OPTIONS = {
  attachTo: undefined,
  props: {},
  slots: {},
  shallow: false,
  stubs: DEFAULT_STUBS,
  mocks: {},
  options: {},
} as const satisfies MountOptions;

/**
 * Vueコンポーネントをテスト用に非同期マウントするヘルパー関数
 * Nuxtの非同期コンポーネントとPiniaストアを適切に処理します
 *
 * @template VMValue - コンポーネントインスタンスの型。コンポーネントのプロパティやメソッドへの型安全なアクセスを提供します
 * @param component - テスト対象のVueコンポーネント
 * @param testingPinia - テスト用のPiniaインスタンス（bindTestingPinia関数で作成したもの）
 * @param options - マウントオプション（任意）
 * @param options.props - コンポーネントに渡すprops
 * @param options.slots - コンポーネントのスロット
 * @param options.shallow - 浅いレンダリングを行うかどうか
 * @param options.stubs - コンポーネントをスタブ化するためのオブジェクト（NuxtLinkはデフォルトでスタブ化されます）
 * @param options.mocks - モックオブジェクト
 * @param options.options - その他のマウントオプション
 * @returns テスト用のVueラッパーオブジェクト。find()やtrigger()などのメソッドとvm経由でコンポーネントインスタンスにアクセスできます
 *
 * @example
 * // Piniaストアを使用するコンポーネントのテスト
 * const pinia = bindTestingPinia();
 * const useUserStore = pinia.stores.user;
 * useUserStore.user = { name: 'Test User' };
 *
 * const wrapper = await mountSuspendedComponent<{ computedProperty: string }>(MyComponent, pinia, {
 *   props: { message: 'Hello' }
 * });
 *
 * // コンポーネントの検証
 * expect(wrapper.find('h1').text()).toBe('Hello');
 * expect(wrapper.vm.computedProperty).toBe('computedValue');
 *
 * // イベントのテスト
 * await wrapper.find('button').trigger('click');
 * expect(useUserStore.updateCalled).toBe(true);
 */
export async function mountSuspendedComponent<VMValue>(
  component: Component,
  testingPinia: ReturnType<typeof bindTestingPinia>,
  options: Partial<MountOptions> = DEFAULT_OPTIONS,
): Promise<VueWrapper<ComponentPublicInstance & VMValue>> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const { attachTo, props, slots, shallow, stubs, mocks, options: additionalOptions } = mergedOptions;

  return await mountSuspended(component, {
    ...additionalOptions,
    attachTo,
    props,
    slots,
    shallow,
    global: {
      plugins: [testingPinia],
      stubs: {
        ...DEFAULT_STUBS,
        ...stubs,
      },
      mocks: { ...mocks },
    },
  });
}
