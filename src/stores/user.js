import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

import { login, register, renewToken } from "@/service/auth";

let store = defineStore({
  id: "user",
  state: () => ({
    _user: useStorage("user", {}, undefined, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v),
      },
    }),
    _token: useStorage("token", {}, undefined, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v),
      },
    }),
  }),
  getters: {
    user() {
      return this._user;
    },
    token() {
      return this._token;
    },
    hasPermission(state) {
      return (permission) => {
        if (!state._user || !state._user.permissions) return false;
        return (state._user.permissions & permission) == permission;
      };
    },
  },
  actions: {
    logout() {
      this._user = null;
      this._token = false;
    },
    async login(data) {
      let response = await login(data);
      this._user = response.user;
      this._token = response.token;
    },
    async renewToken() {
      let response = await renewToken();
      this._user = response.user;
      this._token = response.token;
    },
    async register(data) {
      let response = await register(data);
      this._user = response.user;
      this._token = response.token;
    },
  },
});

export default store;
