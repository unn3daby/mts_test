<template>
    <nav class="navbar">
        <div class="navbar__buttons">
            <img @click = "$router.push('/pokemons')" class="navbar__logo" src="@/assets/Logo.svg" alt="Pokemon logo">
        </div>
    </nav>
</template>

<script>
    export default {
        
    }
</script>

<style lang = "scss" scoped>
    @import "@/styles/index.scss";
    .navbar{
        position: sticky;
        top: 0;
        z-index: 999;
        min-height: 70px;
        background-color: $primary-color;
        width: 100%;
        left: 0;
        display: flex;
        justify-content: right;
        align-items: center;
        padding: 20px;
        &__logo{
            cursor: pointer;
            position: absolute;
            left: 50%;
            top: 5%;
            transform: translateX(-50%);
            max-width: 160px;
        }
    }
</style>