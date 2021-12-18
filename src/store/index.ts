import { createStore } from "vuex";
import getters from "./getters";
import system from "./modules/common";

export default createStore({
  getters,
  modules: {
    system
  }
});
