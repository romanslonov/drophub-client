<template>
  <ul
    v-if="opened"
    ref="el"
    class="absolute bg-gray-900 text-white rounded p-1"
    style="min-width: 140px;"
  >
    <li
      @click="select(option)"
      v-for="option in options"
      :key="option.id"
      class="cursor-pointer hover:bg-gray-800 p-1 rounded"
    >
      {{ option.label }}
    </li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent, nextTick, onBeforeUnmount, onMounted, Ref, ref,
} from 'vue';

export default defineComponent({
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const el = ref(null) as Ref<HTMLElement | null>;
    const opened = ref(false);

    const open = async (event: PointerEvent) => {
      opened.value = true;

      await nextTick();

      if (!el.value) return;

      el.value.style.left = `${event.pageX}px`;
      el.value.style.top = `${event.pageY}px`;
    };

    const close = () => {
      opened.value = false;
    };

    const select = (option: any) => {
      emit('select', option);

      close();
    };

    const clickOutside = (event: any) => {
      if (opened.value && el.value) {
        if (!el.value.contains(event.target)) {
          close();
        }
      }
    };

    onMounted(() => {
      document.addEventListener('mousedown', clickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', clickOutside);
    });

    return {
      el,
      opened,
      open,
      select,
    };
  },
});
</script>
