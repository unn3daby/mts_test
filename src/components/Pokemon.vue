<template>
    <div v-if="!isLoading && !isError" class="pokemon">
        <h1 class="pokemon__name">
            {{choosenPokemon.name}}
        </h1>
        <div class="pokemon__base">
            <MySlider class = "pokemon__main-slider" :data = "imgs"/>
            <div class="pokemon__descr">
                <h2 class="pokemon__descr__title">
                    STATS:
                </h2>
                <div class="pokemon__descr__stats">
                    <div class="stats__id">ID: <span class="value">{{ choosenPokemon.id }}</span></div>
                    <div class="stats__id">HP: <span class="value" :style="{color: getHpColor(hp)}">{{hp}}</span></div>
                    <div class="stats__weight">WEIGHT: <span :style="{color: getColor(choosenPokemon.weight)}" class="value">{{ choosenPokemon.weight }}</span></div>
                    <div class="stats__height">HEIGHT: <span class="value">{{ choosenPokemon.height }}</span></div>
                    <div class="stats__types">TYPE: 
                        <span v-for="type in choosenPokemon.types" :key="type.slot" class="value">{{ type.type.name }}</span>
                    </div>
                    <MyDropdown :data="choosenPokemon.abilities">Abilities</MyDropdown>
                    
                </div>
            </div>
        </div>
        <div v-if="!ELoading" class="pokemon__evolution">
            <h2 class="pokemon__evolution__title">Evolution chain:</h2>
            <div v-if="evolutions.length > 0" class="pokemon__evolution__cards">
                <div class="pokemon__evolution__card" v-for="pokemon in evolutions">
                    <img class="card__img" :src="pokemon.imageUrl" alt="">
                    <div class="card__name">{{pokemon.name}}</div>
                </div>
            </div>
            <div v-else-if="!ELoading && evolutions.length <= 0" class="pokmeon_evolutions_zero">
                Pokemon has not evolved yet :(
            </div>
        </div>
    </div>
    <Loader v-else class="loader"></Loader>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';
    export default {
        methods: {
            ...mapActions({
                fetchOnePokemon: 'main/fetchOnePokemon'
            }),
            parseToArray(object) {
                try {
                    const keys = Object.keys(object);
                    return keys.map(key => {
                    if (object[key] !== null && typeof object[key] !== 'object') {
                        return object[key];
                    }
                    }).filter(value => value !== undefined);
                } catch (error) {
                    console.log(error);
                }
            },
            getColor(number) {
                if (number >= 0 && number < 250) {
                    return 'green';
                } else if (number >= 250 && number < 500) {
                    return 'yellow';
                } else if (number >= 500 && number <= 750) {
                    return 'orange';
                } else if (number >= 750 && number <= 1000) {
                    return 'red';
                } else {
                    return '$primary-color'; // Цвет по умолчанию
                }
            },
            getHpColor(number) {
                if (number >= 0 && number < 15) {
                    return 'red';
                } else if (number >= 15 && number < 40) {
                    return 'yellow';
                } else if (number >= 40) {
                    return 'green';
                }
            },
            async evolutionChain() {
                if (!this.choosenPokemon.species) return [];
                const chainUrl = this.choosenPokemon.species.url;
                try {
                    this.ELoading = true;
                    const res = await axios.get(chainUrl);

                    const evolutionChainUrl = res.data.evolution_chain.url;
                    const evolutionChainRes = await axios.get(evolutionChainUrl);
                    const evolutionChainData = evolutionChainRes.data;

                    const evolvedPokemonIds = [];

                    function extractEvolutionIds(evolution) {
                    const evolvedPokemonId = evolution.species.url.split('/').slice(-2, -1)[0];
                    evolvedPokemonIds.push(evolvedPokemonId);

                    const nextEvolutions = evolution.evolves_to;
                        nextEvolutions.forEach(nextEvolution => {
                            extractEvolutionIds(nextEvolution);
                        });
                    }

                    const baseEvolution = evolutionChainData.chain;
                    extractEvolutionIds(baseEvolution);

                    const ids = evolvedPokemonIds;
                    const evolutionsArray = await Promise.all(
                        ids.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
                    )
                    evolutionsArray.forEach(({data}) => {
                        const name = data.name;
                        const imageUrl = data.sprites.front_default;
                        const id = data.id;
                        
                        const pokemonInfo = {
                            name: name,
                            imageUrl: imageUrl,
                            id: id
                        };
                        this.evolutions.push(pokemonInfo);
                    });
                    this.ELoading = false;
                } catch (error) {
                    console.log(error)
                }
            },
        },   
        data() {
            return {
                imgs: [],
                hp: 0,
                evolutions: [],
                ELoading: false
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.main.isLoading,
                isError: state => state.main.isError,
                choosenPokemon: state => state.main.choosenPokemon
            }),
            changeImg() {
                return this.parseToArray(this.choosenPokemon.sprites);
            },
            /* getStatValue(statName) {
                console.log(this.choosenPokemon);
                const stat = this.choosenPokemon.stats.find(stat => stat.stat.name === statName);
                return stat ? stat.base_stat : '';
            } */
        },
        async beforeMount() {
            await this.$store.dispatch('main/fetchOnePokemon', this.$route.params.id);
            this.imgs = this.parseToArray(this.choosenPokemon.sprites);
            this.hp = this.choosenPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
            await this.evolutionChain();
        }
    }
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
    .pokemon {
        @media (max-width: 768px) {
            padding: 30px 50px;
        } 
        padding: 50px 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__base {
            
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            .slider__wrapper {
                margin: 50px;
                margin-right: 150px;
                @media (max-width: 1000px) {
                    margin: 50px;
                } 
                @media (max-width: 400px) {
                    margin: 0;
                    margin-bottom: 30px;
                } 
            }
        }
        &__name {
            color: $primary-color;
            margin-bottom: 30px;
            font-size: 60px;  
        }
        &__descr {
            margin: 50px;
            max-width: 300px;
            margin: 0 auto;
            &__title {
                color: $primary-color ;
                font-size: 30px;
            }
            &__stats {
                min-width: 300px;
                border: 2px solid $primary-color;
                border-radius: 10px;
                background-color: #535252;
                color: $primary-color;
                font-weight: bold;
                font-size: 20px;
                padding: 25px 30px;
                div {
                    margin: 5px;
                }
            }
        }
        &__evolution {
            margin-top: 30px;
            color: $primary-color;
            font-size: 30px;
            &__cards {
                margin-top: 20px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: center;
                @media (max-width: 670px) {
                    flex-wrap: nowrap;
                    flex-direction: column;
                }
            }
            &__card {
                flex-shrink: 0;
                margin: 20px;
            }
        }
    }
    .stats {
        &__id {
            .value {
                color: $secondary-color;
            }
        }
        
    }
    .pokemon__name {
        @media (max-width: 460) {
            font-size: 10px;
        } 
    }
</style>