<script setup lang="ts">
type Props = {
  textContent?: string;
};

withDefaults(defineProps<Props>(), {
  textContent: 'Default Text',
});
</script>
<template>
  <div id="child-component">{{ textContent }}</div>
</template>
