<template>
  <div class="home">
    <h2 class="font-medium text-xl mb-4">Boards</h2>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <router-link
        :to="{ name: 'Board', params: { id: board.id } }"
        v-for="board in boards"
        :key="board.id"
      >
        <v-board :board="board" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from 'vue';
import VBoard from '@/components/Board.vue';
import { Board, getBoards } from '@/api';

export default defineComponent({
  name: 'Boards',
  setup() {
    const boards = ref([]) as Ref<Board[]>;

    getBoards()
      .then((data) => {
        boards.value = data.boards;
      });

    return {
      boards,
    };
  },
  components: { VBoard },
});
</script>
