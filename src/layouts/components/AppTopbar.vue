<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" src="images/logo-white.png" class="h-100" />
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>
    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <router-link to="/history" class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>{{ is_pt ? "Pefil" : "Profile" }}</span>
        </router-link>
      </li>
      <li>
        <button @click="logout" class="p-link layout-topbar-button">
          <i class="pi pi-sign-in"></i>
          <span>{{ is_pt ? "Sair" : "Exit" }}</span>
        </button>
      </li>
    </ul>
  </div>
  <balance ref="balance" />
</template>

<script>
import useUserState from "@/stores/user";

export default {
  data: () => ({
    selectedLanguage: "pt",
    options: ["PT", "EN"],
    user: useUserState(),
  }),
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },

    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    balance(plan) {
      this.$refs.balance.show(plan);
    },
    logout() {
      this.user.logout();
      this.$router.push("/login");
    },
  },

  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
    is_pt() {
      return this.user._language == "PT";
    },
  },
  mounted() {
    this.selectedLanguage = this.user.lang;
  },
};
</script>

<style>
.ax {
  margin: 1 1 1rem 1;
  line-height: 1.5;
  place-self: self-end;
}

.layout-topbar .layout-topbar-logo img {
  height: 7.5rem;
  margin-right: 0.5rem;
}

.btn-add {
  margin-right: 20px;
  background-color: #9dccff;
}

#malt-title {
  color: #9dccff;
}

.h-100 {
  height: 30px !important;
}
</style>
