// declare var window: any;
// (window as any).addEventListener('DOMContentLoaded', () => {
//     console.log("hello world!")
// })

import { Vue } from "vue-property-decorator";
import App from "./app/App.vue";

console.log("hello world! --1");

new Vue({
  components: { App },
}).$mount("#app");

