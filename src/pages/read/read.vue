<template>
    <web-view :src="url"></web-view>
</template>

<script>

export default {
   onShow() {
       const { query } = this.$route
       let _url = 'https://read.lxyamusement.cn/book/#/ebook/book|'
       if (query.fileName) {
           _url = `${_url}${query.fileName}`
            if (query.opf) {
               _url = `${_url}?opf=${query.opf}`
            }
            if (query.navigation && query.opf) {
                _url = `${_url}?navigation=${query.navigation}`
            } else if (query.navigation) {
                _url = `${_url}?navigation=${query.navigation}`
            }
            this.url = _url
        }
   },
   data() {
       return {
           url: ''
       }
   }
}
</script>

<style>

</style>