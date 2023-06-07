<template>
    <button class="button"><slot></slot></button>
</template>

<script>
    export default {
        name: 'MyButton'
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/index.scss";
    .button {
        font-family: MainFont, sans-serif;
        font-weight: bold;
        font-size: 17px;
        width: 120px;
        height: 60px;
        background-color: $primary-color;
        border: none;
        border-radius: 20px;
        cursor: pointer;
    }
</style>