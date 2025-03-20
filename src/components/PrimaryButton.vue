<script setup lang="ts">
type EmitsType = {
  emitTest: [];
};

const emit = defineEmits<EmitsType>();

const handleClick = () => {
  emit('emitTest');
};
</script>
<template>
  <button class="primary-button" @click="handleClick">
    <slot />
  </button>
</template>
