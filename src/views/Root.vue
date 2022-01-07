<template>
  <div class="flex min-h-screen">
    <v-sidebar />
    <div class="flex-1 md:pl-64 p-4 md:p-8">
      <div class="md:max-w-6xl mx-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useStore } from 'vuex';
// eslint-disable-next-line import/no-cycle
import { getProfile } from '@/api';
import VSidebar from '@/components/Sidebar.vue';

export default defineComponent({
  setup() {
    const store = useStore();

    getProfile().then((data) => store.dispatch('setProfile', data.user));
  },
  components: { VSidebar },
});
</script>
