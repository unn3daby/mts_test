<template>
    <div class="dropdown">
      <div class="block" @click="toggleInfo">
        <h2><slot></slot></h2>
      </div>
      <transition name="fade">
        <div class="info" v-if="showInfo">
          <div v-for="item in data">{{ item.ability.name }}</div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array
      }
    },
    data() {
      return {
        showInfo: false
      };
    },
    methods: {
      toggleInfo() {
        this.showInfo = !this.showInfo;
      },
      handleOutsideClick(event) {
        // Check if the clicked element is inside the dropdown
        const dropdownElement = this.$el;
        if (!dropdownElement.contains(event.target)) {
          this.showInfo = false;
        }
      }
    },
    name: 'MyDropdown',
    mounted() {
      // Add event listener for clicks on the document
      document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {
      // Remove event listener before the component is unmounted
      document.removeEventListener('click', this.handleOutsideClick);
    }
  };
  </script>
  
  <style lang="scss">
  @import "@/styles/index.scss";
  .block {
    background-color: $primary-color;
    color: black;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    line-height: 30px;
    position: relative;
  }
  
  .dropdown {
    position: relative;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .info {
    margin-top: 5px;
    position: absolute;
    width: 100%;
    border-radius: 10px;
    background-color: $background-color;
    padding: 10px;
    border: 2px solid $primary-color;
    div {
      margin: 5px;
    }
  }
  </style>