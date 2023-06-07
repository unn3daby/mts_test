<template>
    <div class="slider__wrapper">
      <div class="slider__slides">
            <div
                class="slider__slide"
                v-for="(item, index) in reversedItems"
                :key="index"
                :class="{ active: index === current, prev: index === prevIndex, next: index === nextIndex }"
            >
                <img v-if="!isLoading" :src="item" alt="pokemon img">
                <Loader v-else/>
            </div>
      </div>
      <div class="slider__buttons">
        <div class="slider__button_prev" @click="changeSlide('prev')"></div>
        <div class="slider__button_next" @click="changeSlide('next')"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  export default {
    name: 'MySlider',
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        current: 0,
        prevIndex: null,
        nextIndex: null
      }
    },
    methods: {
      changeSlide(type) {
        if (type === 'next') {
          if (this.current < this.data.length - 1) {
            this.prevIndex = this.current;
            this.current += 1;
            this.nextIndex = this.current + 1;
          } else {
            this.prevIndex = this.current;
            this.current = 0;
            this.nextIndex = 1;
          }
        } else if (type === 'prev') {
          if (this.current > 0) {
            this.nextIndex = this.current;
            this.current -= 1;
            this.prevIndex = this.current - 1;
          } else {
            this.nextIndex = this.current;
            this.current = this.data.length - 1;
            this.prevIndex = this.current - 1;
          }
        }
      }
    },
    computed: {
      reversedItems() {
        return this.data.slice().reverse();
      },
      ...mapState({
                isLoading: state => state.main.isLoading,
            }),
    },
  };
  </script>
  
  <style lang="scss" scoped>
    @import "@/styles/index.scss";
    .slider {
        &__slide {
            opacity: 0;
            transition: opacity 0.5s;
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translateX(50%) translateY(-50%);
            width: 200px;
            height: 200px;
            border: 2px solid $primary-color;
            border-radius: 10px;
            background-color: #535252;
            img{ 
                width: 100%;
                height: 100%;
            }
            &.active {
                opacity: 1;
            }
            &.prev, &.next {
                pointer-events: none;
            }
        }
        &__wrapper {
            position: relative;
            display: flex;
            height: 200px;
            justify-content: right;
            align-items: center;
            width: 300px;
        }
        &__button {
            &_next {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                &::before {
                    content: '';
                    display: block;
                    width: 0;
                    height: 0;
                    border-top: 20px solid transparent;
                    border-bottom: 20px solid transparent;
                    border-left: 20px solid $primary-color;
                    margin-top: 5px;
                    margin-left: 7px;
                }
            }
            &_prev {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                &::before {
                    content: '';
                    display: block;
                    width: 0;
                    height: 0;
                    border-top: 20px solid transparent;
                    border-bottom: 20px solid transparent;
                    border-right: 20px solid $primary-color;
                    margin-top: 5px;
                    margin-left: 7px;
                }
            }
        }
    }
  
  </style>