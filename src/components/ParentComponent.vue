<script setup lang="ts">
import ChildComponent from '@/components/ChildComponent.vue';
import OutlineButton from '@/components/OutlineButton.vue';

const textContent = ref('Hello World');
</script>
<template>
  <div id="parent-component">
    <ChildComponent :text-content />
    <OutlineButton>ボタン1</OutlineButton>
    <OutlineButton>ボタン2</OutlineButton>
  </div>
</template>
