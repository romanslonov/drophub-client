<template>
  <div class="md:pt-16">
    <form
      @submit.prevent="submit"
      class="max-w-md mx-auto rounded p-4"
    >
      <div class="text-center mb-8">
        <div class="bg-gray-200 w-20 h-20 rounded-full mx-auto mb-4"></div>
        <h2 class="text-2xl font-medium">{{ profile.name }}</h2>
      </div>

      <div class="mb-2">
        <v-textbox
          name="name"
          label="Name"
          placeholder="Your name"
          v-model="form.name"
        />
      </div>
      <div class="mb-4">
        <v-textbox
          name="email"
          label="Email"
          placeholder="Your email"
          v-model="form.email"
        />
      </div>
      <v-button
        type="submit"
        appearance="primary"
        class="w-full mb-2"
      >Save changes</v-button>
      <v-button
        type="button"
        @click="logout"
        class="w-full"
      >Logout</v-button>
    </form>
  </div>
</template>

<script lang="ts">
import {
  reactive, computed, defineComponent, onMounted,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import VTextbox from '@/components/Textbox.vue';
import VButton from '@/components/Button.vue';
import Auth from '@/Auth';
import { Profile } from '@/api';

export default defineComponent({
  name: 'Settings',
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = reactive({
      name: '',
      email: '',
    });

    const profile = computed((): Profile => store.state.profile.profile);

    const submit = () => false;

    const logout = () => {
      Auth.deauthenticateUser();

      router.push({ name: 'Login' });
    };

    onMounted(() => {
      form.name = profile.value.name;
      form.email = profile.value.email;
    });

    return {
      profile,
      form,
      submit,
      logout,
    };
  },
  components: { VTextbox, VButton },
});
</script>
