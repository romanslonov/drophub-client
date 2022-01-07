<template>
  <router-link
    class="flex items-center mb-2"
    :to="{ name: 'Boards' }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414
        9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="font-medium ml-2">Boards list</span>
  </router-link>
  <header
    v-if="board"
    class="mb-4"
  >
    <h2 class="font-medium text-xl">{{ board.name }}</h2>
    <p class="text-sm text-gray-600">{{ counter }}</p>
  </header>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Board, getBoard } from '@/api';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const board = computed((): Board => store.state.board.board);

    const counter = computed(
      () => `${board.value.count} file${
        board.value.count === 0 || board.value.count > 1 ? 's' : ''
      }`,
    );

    getBoard(Number(route.params.id)).then((data) => store.dispatch('setBoard', data.board));

    return {
      counter,
      board,
    };
  },
});
</script>
