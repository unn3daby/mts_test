<template>
    <div class="list">
        <div class="list__search">
            <MyInput class="list__input" v-model = "inputValue"/>
            <div class="list__buttons">
                <span>Filters</span>
                <div class="buttons">
                    <MyButton @click="changeFilter('alphabet')">By alphabet</MyButton>
                    <MyButton @click="changeFilter('exp')">By exp</MyButton>
                    <MyButton @click="changeFilter('weight')">By weight</MyButton>
                </div>
            </div>
        </div>
        <div class="main__cards">
            <TransitionGroup name="poke-list">
                <MyCard @click = "" v-for="pokemon in sortedPokemonsAndSearch" :pokemon = "pokemon" :key="pokemon.id"/>
            </TransitionGroup>
            <div v-if = "!isLoading" v-intersection = 'fetchPokemonsList' class="observer"></div>
        </div>
        <!-- <div v-if = "isLoading" class="loader">Loading...</div> -->
        <h1 v-if="!isLoading && sortedPokemonsAndSearch.length === 0 && inputValue !== ''" class="not-found"> not found</h1>
    </div>
    
   
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
    export default {
        data() {
            return{
                inputValue: '',
                filter: '',
            }
        },
        methods: {
            ...mapActions({
                fetchPokemons: 'main/fetchPokemons',
            }), 
            ...mapMutations({
                clearPokeArray: 'main/clearPokeArray'
            }),
            changeFilter(filter) {
                this.filter = filter;
            },
            fetchPokemonsList() {
                if((!this.isLoading && this.startId + (this.page - 1)) + this.numOfPokemons <= 1010)
                    this.fetchPokemons();
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.main.isLoading,
                isError: state => state.main.isError,
                startId: state => state.main.startId,
                pokemonArray: state => state.main.pokemonArray,
                page: state => state.main.page,
                numOfPokemons: state => state.main.numOfPokemons,
            }),
            sortedPokemons() {
                switch(this.filter) {
                    case 'alphabet' :{
                        return [...this.pokemonArray].sort((pokemon1, pokemon2) => {
                            return pokemon1.name?.localeCompare(pokemon2.name);
                        });
                    }
                    case 'exp' : {
                        return [...this.pokemonArray].sort((pokemon1, pokemon2) => {
                            return pokemon1.exp - pokemon2.exp;
                        }); 
                    }
                    case 'weight' : {
                        return [...this.pokemonArray].sort((pokemon1, pokemon2) => {
                            return pokemon1.weight - pokemon2.weight;
                        }); 
                    }
                    case '': {
                        return this.pokemonArray;
                    }
                    default: {
                        return this.pokemonArray;
                    }
                }
            },
            sortedPokemonsAndSearch() {
                return this.sortedPokemons.filter(item => item.name.toLowerCase().indexOf(this.inputValue.toLowerCase()) >= 0);
            }
        },
        mounted() {
            this.fetchPokemons();
        },
        unmounted() {
            this.clearPokeArray();
        }
        
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/index.scss";
    .list{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &__search{ 
            width: 50%;
            min-width: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 10px 0 25px 0;
            flex-wrap: wrap;
            button{
                margin: 10px;
            }
            span {
                display: block;
                color: white;
            }
        }
        &__buttons {
            @media (max-width: 700px) {
                width: 200px;
            }
            display: flex;
            align-items: center;
            flex-direction: column;
            flex-wrap: wrap;
            border: 2px solid $primary-color;
            border-radius: 10px;
            padding: 10px;
            .buttons {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                /* @media (max-width: 950px) {
                    flex-direction: column;
                } */
                margin: 0 auto;
                button {
                    display: block;
                }
            }
        }
        &__input{
            margin-bottom: 30px;
        }
    }
    .main__cards {
        width: 70%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
            .card {
                flex-shrink: 0;
                margin: 20px;
            }
        }
    .observer {
        position: absolute;
        bottom: 40px;
        width: 100%;
        height: 10px;
        z-index: 999;
    }
    .loader {
        width: 100%;
        color: $primary-color;
        font-size: 40px;
        margin: 50px auto;
    }
    .not-found {
        font-size: 50px;
        color: $primary-color;
        margin-top: 40px;
    }
    .poke-list-enter-active,
    .poke-list-move,
    .poke-list-leave-active {
        transition: all 0.6s ease;
    }
    .poke-list-enter-from {
        opacity: 0;
        transform: translateX(-100%);
    }
    .poke-list-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
    .input-wrapper {
    }
</style>