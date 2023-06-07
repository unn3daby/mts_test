import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '@/pages/MainPage';
import SinglePokemonPage from '@/pages/SinglePokemonPage';

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/pokemons',
        component: MainPage
    },
    {
        path: '/pokemons/:id',
        component: SinglePokemonPage
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
});

export default router;