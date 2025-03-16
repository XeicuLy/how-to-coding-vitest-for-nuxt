<script setup lang="ts">
type Props = {
  text?: string;
};

withDefaults(defineProps<Props>(), {
  text: 'Default Text',
});
</script>
<template>
  <div id="child-component">{{ text }}</div>
</template>
