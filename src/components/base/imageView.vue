<template>
  <div class="image-view" @click="onClick" :style="{ 'height':height }">
      <img
        :class="round ? 'round image' : 'image'"
        :style="{ 'height':height }"
        :src="src"
        :mode="mode"
        :lazy-load="lazyLoad"
        @load="onLoad"
        @error="onError"
        v-show="!isLoading && !error"
      >
      <img
        :class="round ? 'round image' : 'image'"
        :style="{ height }"
        src="https://read.lxyamusement.cn:9000/defaultCover/loading.jpg"
        :mode="mode"
        :lazy-load="lazyLoad"
        v-show="isLoading || error"
      >
  </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: 'widthFix'
        },
        lazyLoad: {
            type: Boolean,
            default: true
        },
        round: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: 'auto'
        }
    },
    onShow() {
        this.src = this.src.replace("http://127.0.0.1","https://read.lxyamusement.cn")
    },
    watch: {
        src(newValue, preValue) {
            if (newValue && newValue.length > 0 && newValue !== preValue) {
                this.$nextTick(() => {
                    this.isLoading = true
                    this.error = false
                })
            }
        }
    },
    data() {
        return {
            isLoading: true,
            error: false
        }
    },
    methods: {
        onClick() {
            this.$emit('onClick')
        },
        onLoad() {
            this.isLoading = false
            this.error = false
        },
        onError() {
            this.error = true
            this.isLoading = false
        }
    }
}
</script>

<style lang="scss" scoped>
.image-view {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .image {
        width: 100%;
        height: 100%;
        &.round {
            border-radius: 50%;
        }
    }
}
</style>