<template>
    <div class="card" @click="$router.push(`/pokemons/${pokemon.id}`)">
        <div class="card-image">
            <img  :src="pokemon.imageUrl" alt={{pokemon.name}}>
        </div>
        <div class="card-description">
            <p class="text-title">{{ pokemon.name.slice() }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pokemon:{
                type: [Object]
            }
        },
        name: 'MyCard'
    }
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 254px;
    width: 190px;
    position: relative;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 16px;
    box-shadow: 0 0 10px 1px #f7f59d;
    overflow: hidden;
    margin-bottom: 30px;
  &:hover{
    box-shadow: 0 0 13px 1px #f7f59d;
    .card-description {
        transform: translateY(110%);
    }
    img{ 
        width: 170px;
        height: auto;
    }
  }
  
}

 /*Image*/
.card-image {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        object-fit: cover;
        width: 120px;
        height: auto;
        display: block;
    }
}

/*Description */
.card-description {
    width: 100%;
    display: flex;
    position: absolute;
    gap: .5em;
    flex-direction: column;
    background-color: #f7e893;
    color: #212121;
    height: 20%;
    bottom: 0;
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 1rem;
}

/*Text*/
.text-title {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    width: 100%;
    height: 20px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* Hover states */


</style>