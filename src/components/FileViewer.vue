<template>
  <div class="fixed flex items-center justify-center inset-0 bg-black bg-opacity-70 p-8">
    <div class="">
      <img :src="`https://fra.hubgridcloudbuckets.com/drophub/${file.key}`" alt="image">
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from 'vue';

export default defineComponent({
  props: {
    file: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const opened = computed(() => props.file !== null);

    watch(opened, (value) => {
      if (value) {
        document.body.classList.add('overflow-hidden');
      }
    }, { immediate: true });
  },
});
</script>
