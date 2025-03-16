<script setup lang="ts">
type Props = {
  text: string;
};

defineProps<Props>();
</script>
<template>
  <div id="child-component">{{ text }}</div>
</template>
