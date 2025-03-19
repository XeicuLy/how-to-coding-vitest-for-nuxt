<script setup lang="ts">
import ChildComponent from '@/components/ChildComponent.vue';
import OutlineButton from '@/components/OutlineButton.vue';

const textContent = ref('Hello World');

const handleClick = () => {
  console.log('Button clicked');
};
</script>
<template>
  <div id="parent-component">
    <ChildComponent :text-content />
    <OutlineButton :handle-click>ボタン1</OutlineButton>
    <OutlineButton :handle-click>ボタン2</OutlineButton>
  </div>
</template>
