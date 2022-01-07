<template>
  <div class="bg-gray-200 rounded p-4">
    <div class="flex flex-wrap -m-1">
      <div
        class="w-1/2 p-1"
        v-for="preview in previews"
        :key="preview.id"
      >
        <div
          v-if="preview.file"
          class="bg-cover bg-gray-400 h-0 w-full rounded"
          :style="{
            'padding-bottom': '100%',
            'background-image': `url(https://fra.hubgridcloudbuckets.com/drophub/${preview.file.key})`,
          }"
        ></div>
        <div
          v-else
          class="
            relative flex items-center justify-center
            bg-gray-300 text-gray-600
            h-0 w-full
            rounded
          "
          style="padding-bottom:100%;"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4
            16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6
            20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <h4 class="font-medium">{{ board.name }}</h4>
      <div class="text-sm text-gray-600">
        {{ counter(board) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Board } from '@/api';

export default defineComponent({
  name: 'Board',
  props: {
    board: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const previews = computed(() => {
      const items = new Array(4).fill(null).map((_, i) => ({
        id: i,
        file: props.board.files[i] || null,
      }));

      return items;
    });

    const counter = (board: Board) => `${board.count} file${board.count === 0 || board.count > 1 ? 's' : ''}`;

    return {
      counter,
      previews,
    };
  },
});
</script>
