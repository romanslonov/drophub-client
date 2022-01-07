<template>
  <div
    v-if="files.length > 0"
    class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
  >
    <v-file
      v-for="file in files"
      :key="file.id"
      :file="file"
    />
    <button
      class="
        flex flex-col items-center justify-center
        border-2 border-dashed hover:border-gray-400
        rounded
      "
      @click="openSelectFilesHandler"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-gray-600 h-10 w-10 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <h3 class="text-lg font-medium">Upload file</h3>
    </button>
  </div>
  <div
    v-else
    class="text-center py-8"
  >
    <div class="bg-gray-100 inline-block p-8 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-gray-400 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <h2 class="mt-2 text-xl font-medium text-gray-900">Upload files</h2>
      <p class="mt-1 text-gray-500">You haven’t added any files to your board yet.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { nanoid } from 'nanoid';
import {
  defineComponent, ref, watch, Ref,
} from 'vue';
import { useRoute } from 'vue-router';
import VFile from '@/components/File.vue';
import { BObject, getBoardFiles } from '@/api';
import useDrop from '@/hooks/useDrop';
import request from '@/api/request';

export type FileEventTarget = EventTarget & { files: FileList };

export default defineComponent({
  name: 'Board',
  setup() {
    const route = useRoute();
    const files = ref([]) as Ref<BObject[]>;
    const { files: drop } = useDrop();

    const boardId = route.params.id as string;

    const upload = (file: BObject) => {
      if (file.type !== 'uploading') {
        return;
      }
      const data = new FormData();
      data.append('files', file.file);

      request<{ files: BObject[] }>({
        url: `/boards/${boardId}/files/`,
        method: 'POST',
        onUploadProgress: (e: ProgressEvent) => {
          files.value = files.value.map((item) => {
            if (item.id === file.id) {
              return { ...item, progress: (e.loaded / e.total) * 100 };
            }

            return item;
          });
        },
        data,
      }).then((response) => {
        files.value = files.value.map((item) => {
          if (item.id === file.id) {
            return { ...response.files[0], type: 'uploaded' } as BObject;
          }

          return item;
        });
      });
    };

    watch(drop, (response) => {
      const formatted = response.map(
        (file) => ({ id: nanoid(), type: 'uploading', file } as BObject),
      );

      formatted.forEach((item) => upload(item));

      files.value = [...formatted, ...files.value];
    });

    getBoardFiles(Number(route.params.id)).then((data) => {
      files.value = data.files.map(
        (file) => ({ ...file, type: 'uploaded' } as BObject),
      );
    });

    const openSelectFilesHandler = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;

      input.onchange = (e: Event) => {
        const selected = [...(e.target as FileEventTarget).files];
        const formatted = selected.map(
          (file) => ({ id: nanoid(), type: 'uploading', file } as BObject),
        );

        formatted.forEach((item) => upload(item));

        files.value = [...formatted, ...files.value];
      };

      input.click();
    };

    return {
      files,
      openSelectFilesHandler,
    };
  },
  components: { VFile },
});
</script>
