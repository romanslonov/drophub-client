<template>
  <div v-if="file.type === 'uploading'" class="flex flex-col bg-blue-100 rounded p-4">
    <div class="flex items-center justify-center flex-1 text-center">
      <div class="2xl font-bold">{{ file.progress }}%s</div>
      <h4 class="font-medium">Uploading...</h4>
    </div>
    <div class="mt-2">
      <h4 class="truncate font-medium">{{ file.file.name }}</h4>
      <div class="text-sm text-gray-600">{{ file.file.size }}</div>
    </div>
  </div>
  <div v-if="file.type === 'uploaded'" class="bg-gray-200 rounded p-4">
    <div
      class="bg-cover bg-gray-400 h-0 w-full rounded"
      :style="{
        'padding-bottom': '100%',
        'background-image': `url(https://fra.hubgridcloudbuckets.com/drophub/${file.key})`,
      }"
    ></div>
    <div class="mt-2">
      <h4 class="truncate font-medium">{{ file.name }}</h4>
      <div class="text-sm text-gray-600">{{ formatBytes(file.size) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { formatBytes } from '@/utils';
import { BObject } from '@/api';

export default defineComponent({
  emits: ['uploaded'],
  props: {
    file: {
      type: Object as PropType<BObject>,
      default: null,
    },
  },
  setup() {
    return {
      formatBytes,
    };
  },
});
</script>
