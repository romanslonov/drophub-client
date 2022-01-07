<template>
  <textarea v-if="multiline" name="" id="" cols="30" rows="10"></textarea>
  <div v-else>
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :type="type"
      class="block w-full border-2 text-sm hover:border-gray-300 rounded-md h-10 px-2"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
});
</script>
