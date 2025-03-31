<script setup lang="ts">
import { logger } from '@/utils/logger';

type Props = {
  textContent?: string;
};

withDefaults(defineProps<Props>(), {
  textContent: 'Default Text',
});

const handleClick = () => {
  logger();
};
</script>
<template>
  <div id="child-component">{{ textContent }}</div>
  <button @click="handleClick">クリック</button>
</template>
