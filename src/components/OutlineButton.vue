<template>
  <button class="button default">
    <slot />
  </button>
</template>
<style scoped>
.button {
  border: 2px solid #333;
  background-color: white;
  color: #333;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
}

.default {
  border-color: #e7e7e7;
  color: #333;
}

.default:hover {
  background: #e7e7e7;
}
</style>
