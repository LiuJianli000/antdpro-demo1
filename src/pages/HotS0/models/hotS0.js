import { postQuery } from '@/services/api';

export default {
  namespace: 'hotS0',
  state: {},

  effects: {
    *fetch({ payload }, { call }) {
      const res = yield call(postQuery, `s0-products`, payload);

      if (res) return res;
    },
  },

  reducers: {},
};
