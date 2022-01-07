<template>
  <div class="home">
    <header class="flex items-center justify-between mb-8">
      <h1 v-if="profile" class="font-medium text-2xl text-gray-600">
        {{ greeting }}, <span class="text-black">{{ profile.name }}</span>
      </h1>
    </header>

    <h2 class="font-medium text-xl mb-4">Starred boards</h2>

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
import {
  ref, defineComponent, computed, Ref,
} from 'vue';
import { useStore } from 'vuex';
import VBoard from '@/components/Board.vue';
// eslint-disable-next-line import/no-cycle
import { Board, getStarredBoards } from '@/api';

export default defineComponent({
  name: 'Home',
  setup() {
    const boards = ref([]) as Ref<Board[]>;
    const store = useStore();
    const profile = computed(() => store.state.profile.profile);

    const greeting = computed(() => {
      const date = new Date();
      const currentTime = date.getHours();

      if (currentTime >= 0 && currentTime <= 12) {
        return 'Good morning';
      }

      if (currentTime > 12 && currentTime <= 18) {
        return 'Good afternoon';
      }

      return 'Good evening';
    });

    getStarredBoards(4)
      .then((data) => {
        boards.value = data.boards;
      });

    return {
      boards,
      profile,
      greeting,
    };
  },
  components: { VBoard },
});
</script>
