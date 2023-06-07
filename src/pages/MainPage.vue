<template>
    <div class="main">
        <PokeList/>
    </div>
</template>

<script>
import { mapActions, mapState} from 'vuex';
import PokeList from '@/components/PokeList';
    export default {
        components: {
            PokeList
        },
    }
</script>

<style lang="scss" scoped>
    .main {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 30px;
    }
</style>