<template>
    <NavBar/>
    <RouterView/>
</template>

<script>
import NavBar from "@/components/NavBar.vue"

export default {
	name: 'App',
	components: {
        NavBar
	},
	
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    
    }
    body {
        overflow: scroll;
        background-color: #212121;
    }
    @font-face {
        font-family: 'MainFont';
        src: url('@/fonts/MainFont.ttf') format('truetype');
  }
    #app {
        font-family: MainFont, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        position: relative;
        min-height: 100vh;
        height: 100%;
    }
</style>
