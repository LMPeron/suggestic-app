import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "prismjs/themes/prism-coy.css";
import "./assets/styles/layout.scss";
import "./assets/demo/flags/flags.css";

import { createApp, reactive } from "vue";
import router from "./router";
import AppWrapper from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Password from "primevue/password";
import Ripple from "primevue/ripple";
import SelectButton from "primevue/selectbutton";
import StyleClass from "primevue/styleclass";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Toolbar from "primevue/toolbar";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Tooltip from "primevue/tooltip";
import ToggleButton from "primevue/togglebutton";

const app = createApp(AppWrapper);

app.config.globalProperties.$appState = reactive({
  darkTheme: true,
});

import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);
app.use(PrimeVue, { ripple: true, inputStyle: "outlined" });
app.use(ToastService);
app.use(router);

app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.component("Button", Button);
app.component("Card", Card);
app.component("Column", Column);
app.component("DataTable", DataTable);
app.component("DataView", DataView);
app.component("Image", Image);
app.component("InputText", InputText);
app.component("Menu", Menu);
app.component("Menubar", Menubar);
app.component("Password", Password);

app.component("SelectButton", SelectButton);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Toast", Toast);
app.component("Toolbar", Toolbar);
app.component("ToggleButton", ToggleButton);

app.mount("#app");
