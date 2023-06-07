<template>
    <img src="@/assets/pokeball.svg" alt="pokeball icon">
</template>

<script>
    export default {
        name: 'Loader'
    }
</script>

<style lang="scss" scoped>
img {
    animation: frames .8s  linear 0s infinite;
    width: 120px;
    height: auto;
    margin: 50px;
}
@keyframes frames{
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>