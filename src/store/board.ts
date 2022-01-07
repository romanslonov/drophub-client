import { Board } from '@/api';

export default {
  namespace: true,

  state: {
    board: null,
  },

  mutations: {
    SET_BOARD(state: any, board: Board) {
      state.board = board;
    },
  },

  actions: {
    setBoard({ commit }: { commit: any }, board: Board) {
      commit('SET_BOARD', board);
    },
  },
};
