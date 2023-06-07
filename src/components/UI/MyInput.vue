<template>
    <div class="input-wrapper">
        <button class="icon"> 
            <svg @click="updateInput" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#afabab" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#afabab" d="M22 22L20 20"></path>
            </svg>
        </button>
        <input :value="modelValue" @change="inputValue = $event.target.value" placeholder="search.." class="input" name="text" type="text">
    </div>
</template>

<script>
    export default {
        name: 'MyInput',
        data() {
            return {
                inputValue: ''
            }
        },
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput() {
                this.$emit('update:modelValue', this.inputValue);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/styles/index.scss';
    .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        position: relative;
    }

    .input {
        border-style: none;
        height: 50px;
        width: 50px;
        padding: 10px;
        outline: none;
        border-radius: 50%;
        transition: .5s ease-in-out;
        background-color: $primary-color;
        box-shadow: 0px 0px 3px #f3f3f3;
        padding-right: 40px;
        color: #fdfdfd;
    }

    .input::placeholder,
    .input {
        font-family: 'MainFont', sans-serif;
        font-size: 17px;
    }

    .input::placeholder {
        color: #ebeaea;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        outline: none;
        border-style: none;
        border-radius: 50%;
        pointer-events: painted;
        background-color: transparent;
        transition: .2s linear;
    }

    .icon:focus ~ .input,
    .input:focus {
        box-shadow: none;
        width: 250px;
        border-radius: 0px;
        background-color: transparent;
        border-bottom: 3px solid $primary-color;
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    }



</style>