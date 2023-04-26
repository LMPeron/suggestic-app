<template>
  <div />
</template>

<script>
import useUserStore from "@/stores/user.js";

export default {
  data: () => ({
    timeout: null,
    user: useUserStore(),
  }),
  methods: {
    async renewToken() {
      try {
        await this.user.renewToken();
      } catch (err) {
        this.user.logout();
      }
    },
  },
  mounted() {
    this.renewToken();
    this.timeout = setInterval(this.renewToken, 1000 * 60);
  },
};
</script>

<style></style>
