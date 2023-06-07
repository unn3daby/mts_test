import axios from "axios"

export const pokeModule = {
    state: () => ({
        pokemonArray: [],
        isLoading: false,
        isError: false,
        page: 1,
        numOfPokemons: 20,
        startId: 1,
        choosenPokemon: {}
    }),
    getters: {

    },
    mutations: {
        pushPokemonArray(state, pokemon) {
            state.pokemonArray.push(pokemon);
        },
        setIsLoading(state, bool) {
            state.isLoading = bool;
        },
        setIsError(state, bool) {
            state.isError = bool;
        },
        setStartId(state, startId) {
            state.startId = startId;
        },
        setChoosenPokemon(state, pokemon) {
            state.choosenPokemon = pokemon;
        },
        clearPokeArray(state) {
            state.pokemonArray = [];
            state.page = 1;
            state.startId = 1;
        }
    },
    actions: {
        async fetchPokemons({state, commit}) {
                commit('setIsLoading', true);
                commit('setIsError', false);
                try {
                    const start = state.startId + (state.page - 1);
                    const end = start + state.numOfPokemons;
                    const ids = Array.from({ length: state.numOfPokemons }, (_, index) => start + index);
                    commit('setStartId', end);
                    const res = await Promise.all(
                        ids.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
                    );
                    res.forEach(({data}) => {
                        const name = data.name;
                        const imageUrl = data.sprites.front_default;
                        const id = data.id;
                        const exp = data.base_experience;
                        const weight = data.weight;
                        const pokemonInfo = {
                            name: name,
                            imageUrl: imageUrl,
                            id: id,
                            exp: exp,
                            weight: weight
                        };
                        commit('pushPokemonArray', pokemonInfo);
                    });
                        commit('setIsLoading', false);
                } catch (error) {
                    commit('setIsLoading', false);
                    commit('setIsError', true);
                    console.log(error);
                }
        },
        async fetchOnePokemon({state, commit}, id) {
            commit('setIsLoading', true);
            commit('setIsError', false);
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                commit('setChoosenPokemon', res.data);
                commit('setIsLoading', false);
            } catch (error) {
                commit('setIsLoading', false);
                commit('setIsError', true);
                console.log(error);
            }
        }
    },
    namespaced: true
}