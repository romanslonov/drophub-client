<template>
  <div class="
    hidden md:flex w-56 fixed top-0 left-0 bottom-0 flex-col justify-between border-r p-4
  ">
    <router-link to="/">
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 0C0.895431 0 0 0.895429 0 2V5.04762C0 6.15219 0.895431 7.04762 2 7.04762L5.87302
          7.04762H11.746H13.3651H13.5079V7.04824C22.2787 7.12495 29.3651 14.2587 29.3651
          23.0476V30.5397H11.746V15.0798L5.87302 12.4888V35C5.87302 36.1046 6.76845 37 7.87302
          37H34.4127C35.5173 37 36.4127 36.1046 36.4127 35V22C36.4127 9.84974 26.563 0 14.4127
          0H13.5079H7.87302H2Z"
          fill="black"
        />
      </svg>
    </router-link>

    <ul class="space-y-4">
      <router-link
        v-for="link in links"
        :key="link.id"
        :to="link.to"
        custom
        v-slot="{ isActive, navigate, href }"
      >
        <li
          :class="
            [isActive || subIsActive(href) ? 'font-medium text-gray-900' : 'text-gray-600']
          "
        >
          <a
            :href="href"
            @click="navigate"
          >{{ link.label }}</a>
        </li>
      </router-link>
    </ul>

    <div v-if="profile">
      <div class="text-sm text-center text-gray-600 mb-2">
        {{ formatBytes(profile.usage) }} of
        <span class="font-medium text-black">100 GB</span>
      </div>
      <div class="h-2 w-full bg-gray-200 rounded">
        <div
          class="h-2 w-full bg-black rounded"
          style="width:25%"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Profile } from '@/api';
import { formatBytes } from '@/utils';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const links = [
      { id: 1, label: 'Home', to: { name: 'Home' } },
      { id: 2, label: 'Boards', to: { name: 'Boards' } },
      { id: 3, label: 'Trash', to: { name: 'Trash' } },
      { id: 4, label: 'Settings', to: { name: 'Settings' } },
    ];
    const profile = computed((): Profile => store.state.profile.profile);

    // current path starts with this path string
    const subIsActive = (input: string) => {
      const paths = Array.isArray(input) ? input : [input];

      return paths.some((path) => route.path.indexOf(path) === 0);
    };

    return {
      links,
      profile,
      subIsActive,
      formatBytes,
    };
  },
});
</script>
