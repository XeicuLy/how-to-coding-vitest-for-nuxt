<script setup lang="ts">
import { useTestStore } from '@/store/testStore';

const testStore = useTestStore();
const { count: countState, doubleCount } = storeToRefs(testStore);
const { incrementCount } = testStore;
</script>
<template>
  <div data-testid="state">{{ countState }}</div>
  <div data-testid="getters">{{ doubleCount }}</div>
  <button data-testid="actions" @click="incrementCount">increment</button>
</template>
