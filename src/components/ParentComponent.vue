<script setup lang="ts">
import ChildComponent from '@/components/ChildComponent.vue';

const textContent = ref('Hello World');
</script>
<template>
  <div id="parent-component">
    <ChildComponent :text-content />
  </div>
</template>
