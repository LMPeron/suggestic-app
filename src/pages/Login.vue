<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img alt="Logo" height="80" :src="topbarImage()" />
      </div>
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          :style="`
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              #a2cef9 10.9%,
              var(--surface-0)
            );
          `"
        >
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
            <span class="text-600 font-medium color-white">
              Login to continue</span
            >
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="login1" class="block text-900 text-xl font-medium mb-2"
              >Email</label
            >
            <InputText
              id="login1"
              v-model="userData.email"
              type="text"
              class="w-full mb-3"
              placeholder="Login"
              style="padding: 1rem"
              @keyup.enter="email"
            />

            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Password</label
            >
            <Password
              id="password1"
              v-model="userData.password"
              placeholder="Senha"
              :toggleMask="true"
              :feedback="false"
              @keyup.enter="login"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
            ></Password>

            <div class="flex align-items-center justify-content-between mb-5">
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                @click="forgotPassword()"
                >Signup</a
              >
            </div>

            <div style="text-align: center">
              <Button
                @click="login"
                :loading="loading"
                label="Enter"
                class="w-full p-3 text-xl color-white"
              ></Button>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useUserState from "@/stores/user";

export default {
  data() {
    return {
      selectedLanguage: "pt",
      options: ["PT", "EN"],
      user: useUserState(),
      userData: {
        email: "",
        password: "",
      },
      checked: false,
      loading: false,
    };
  },
  methods: {
    topbarImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.png"
        : "images/logo-dark.png";
    },
    switchLanguage() {
      try {
        this.user.changeLanguage(this.selectedLanguage);
      } catch (e) {
        console.log(e);
      }
    },
    verifyLoginFields() {
      if (!this.userData.email) throw new Error("Email is required.");
      if (!this.userData.password) throw new Error("Password is required");
    },
    async login() {
      try {
        this.verifyLoginFields();
        this.loading = true;
        await this.user.login(this.userData);
        this.$router.push("/");
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "Could not login",
          detail: err.message || null,
          life: 3000,
        });
        this.loading = false;
      }
    },
    forgotPassword() {
      this.$router.push({
        name: "register",
      });
    },
  },
  mounted() {
    if (this.user.token) this.$router.push("/");
    this.selectedLanguage = this.user.lang;
  },
  computed: {
    is_pt() {
      return this.user._language == "PT";
    },
  },
  watch: {
    selectedLanguage(val, oldVal) {
      if (!val) return (this.selectedLanguage = oldVal);
      this.switchLanguage();
    },
  },
};
</script>

<style>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.p-selectbutton .p-button.p-highlight {
  background: #9dccff;
  border-color: #9dccff;
  color: #212529;
}

.color-white {
  color: #fff !important;
}
</style>
