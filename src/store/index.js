import { createStore } from "vuex";
import { pokeModule } from "./pokeModule";

export default createStore({
    modules: {
        main: pokeModule
    }
});