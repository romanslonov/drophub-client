<template>
  <div class="w-full max-w-sm p-4 border shadow-sm rounded-lg">
    <h2 class="text-2xl font-medium text-center mb-8">Register</h2>
    <form @submit.prevent="submit">
      <div class="mb-2">
          <v-textbox
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            v-model="form.email"
          />
      </div>
      <div class="mb-2">
          <v-textbox
            type="text"
            name="name"
            label="Name"
            placeholder="Enter your name"
            v-model="form.name"
          />
      </div>
      <div class="mb-4">
        <v-textbox
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          v-model="form.password"
        />
      </div>
      <v-button type="submit" appearance="primary" class="w-full mb-2">Register</v-button>
      <div class="text-center text-sm">
        or <router-link class="text-blue-600 hover:text-blue-700" :to="{ name: 'Login' }">
        login
        </router-link> if you have an account.
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
// eslint-disable-next-line import/no-cycle
import { register } from '@/api/auth';
import VTextbox from '@/components/Textbox.vue';
import VButton from '@/components/Button.vue';
import Auth from '@/Auth';

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter();

    const form = reactive({
      email: '',
      password: '',
      name: '',
    });
    const submit = async () => {
      const token = await register(form).then((data) => data.token);

      Auth.authenticateUser(token);

      router.push({ name: 'Home' });
    };

    return {
      form,
      submit,
    };
  },
  components: { VTextbox, VButton },
});
</script>
