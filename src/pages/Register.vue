<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img alt="Logo" height="80" class="mb-5" :src="topbarImage()" />
      </div>
      <div
        class="col-12 xl:col-6"
        :style="`
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              #a2cef9 10.9%,
              var(--surface-0)
            );
          `"
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
            <div class="text-900 text-3xl font-medium mb-3">
              <h1>Welcome</h1>
            </div>
            <span class="text-600 font-medium color-white"
              >Please, register to continue.
            </span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="name" class="block text-900 text-xl font-medium mb-2"
              >Full Name
            </label>
            <InputText
              id="name"
              v-model="userData.name"
              @keyup.enter="signUp"
              type="text"
              class="w-full mb-3"
              placeholder="Full Name"
              style="padding: 1rem"
            />

            <label for="email1" class="block text-900 text-xl font-medium mb-2">
              Email
            </label>
            <InputText
              id="email1"
              type="text"
              v-model="userData.email"
              @keyup.enter="signUp"
              class="w-full mb-3"
              placeholder="Email"
              style="padding: 1rem"
              :rules="rules.email"
            />

            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
            >
              Password
            </label>
            <Password
              id="password1"
              v-model="userData.password"
              :toggleMask="true"
              @keyup.enter="signUp"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              :rules="[(v) => !!v || 'Senha é obrigatória']"
            ></Password>

            <Button
              :loading="loading"
              @click="signUp"
              label="Register"
              class="w-full p-3 text-xl"
            ></Button>
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
      options: ["PT", "EN"],
      userData: {
        name: "",
        email: "",
        password: "",
      },
      checked: false,
      loading: false,
      user: useUserState(),
      selectedLanguage: null,
      rules: {
        email: [
          (v) => !!v || "E-mail required",
          (v) => /.+@.+\..+/.test(v) || "invalid E-mail",
        ],
      },
    };
  },
  computed: {
    isValid() {
      return (
        this.userData.email &&
        this.userData.password &&
        /.+@.+\..+/.test(this.userData.email)
      );
    },
    is_pt() {
      return this.user._language == "PT";
    },
  },
  methods: {
    topbarImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.png"
        : "images/logo-dark.png";
    },
    async signUp() {
      try {
        this.loading = true;
        this.verifyFields();
        await this.user.register(this.userData);

        this.$router.push("/");
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "Could not register",
          detail: err.message || null,
          life: 3000,
        });
        this.loading = false;
      }
    },
    verifyFields() {
      if (!this.userData.name) throw new Error("Name is required.");
      if (!this.userData.email) throw new Error("E-mail is required.");
      if (!this.userData.password) throw new Error("Password is required.");
      if (this.userData.password.length < 6)
        throw new Error("Password must be at least 6 characters.");
    },
  },
  watch: {
    selectedLanguage(val, oldVal) {
      if (!val) return (this.selectedLanguage = oldVal);
      this.switchLanguage();
    },
  },

  async mounted() {},
};
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.color-white {
  color: #fff !important;
}
</style>
