<template>
  <div
    v-if="file.type === 'uploading'"
    class="flex flex-col bg-blue-100 rounded p-4"
  >
    <div class="flex items-center justify-center flex-1 text-center">
      <div class="2xl font-bold">{{ file.progress }}%s</div>
      <h4 class="font-medium">Uploading...</h4>
    </div>
    <div class="mt-2">
      <h4 class="truncate font-medium">{{ file.file.name }}</h4>
      <div class="text-sm text-gray-600">{{ file.file.size }}</div>
    </div>
  </div>
  <div
    v-if="file.type === 'uploaded'"
    class="bg-gray-200 rounded p-4"
  >
    <div
      @click="onclick"
      class="bg-cover bg-gray-400 h-0 w-full cursor-pointer rounded"
      :style="{
        'padding-bottom': '100%',
        'background-image': `url(https://fra.hubgridcloudbuckets.com/drophub/${file.key})`,
      }"
    ></div>
    <div class="mt-2">
      <h4 class="truncate font-medium">{{ file.name }}</h4>
      <div class="text-sm text-gray-600">{{ formatBytes(file.size) }}</div>
    </div>

    <div
      v-if="full"
      class="bg-black bg-opacity-80 fixed inset-0 flex items-center justify-center"
    >
      <img
        ref="image"
        style="max-height: calc(100vh - 80px)"
        :src="`https://fra.hubgridcloudbuckets.com/drophub/${file.key}`"
        alt="preview"
        class="select-none"
      >
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onUnmounted, PropType, Ref, ref, watch,
} from 'vue';
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
  setup(props) {
    const full = ref(false);
    const image = ref(null) as Ref<HTMLElement | null>;

    const handleContextMenuSelect = (option: any) => {
      switch (option.id) {
        case 'delete':
          // removeFile(props.file.id);
          break;

        default:
          break;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && full.value) {
        full.value = false;
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (full.value && image.value && !image.value.contains((e.target as HTMLElement))) {
        full.value = false;
      }
    };

    const onclick = () => {
      full.value = true;
    };

    watch(full, (value) => {
      if (value) {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClickOutside, true);
      } else {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('click', handleClickOutside, true);
      }
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside, true);
    });

    return {
      image,
      formatBytes,
      handleContextMenuSelect,
      onclick,
      full,
    };
  },
});
</script>
