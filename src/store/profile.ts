import { Profile } from '@/api';

export default {
  namespace: true,

  state: {
    profile: null,
  },

  mutations: {
    SET_PROFILE(state: any, profile: Profile) {
      state.profile = profile;
    },
  },

  actions: {
    setProfile({ commit }: { commit: any }, profile: Profile) {
      commit('SET_PROFILE', profile);
    },
  },
};
