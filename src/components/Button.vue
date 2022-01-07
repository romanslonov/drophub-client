<template>
  <button
    class="block font-medium text-sm rounded h-10 px-4"
    :class="{
      'bg-blue-600 hover:bg-blue-700 text-white': appearance === 'primary',
      'border-2 bg-white hover:border-gray-300 hover:bg-gray-100 text-gray-900':
        appearance === 'default',
    }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    appearance: {
      type: String,
      default: 'default',
    },
  },
});
</script>
