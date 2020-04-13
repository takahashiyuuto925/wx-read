<template>
  <div>
      <home-book 
        :row="category.length / 2" 
        :col="2" 
        :data="category" 
        mode="category" 
        :show-btn="false"
        :show-title="false"
        @onBookClick="onCategoryClick"
      ></home-book>
  </div>
</template>

<script>
// https://read.lxyamusement.cn/book/#/ebook/book|56a93c5159bb6b8c20832963511757a8
import HomeBook from '../../components/home/HomeBook'
import { categoryList } from '../../api/index'
export default {
   components: {
       HomeBook
   },
   data() {
       return {
           category: []
       }
   },
   methods: {
    onCategoryClick(category) {
        this.$router.push({
            path: '/pages/list/main',
            query: {
                key: 'categoryId',
                text: category.category,
                title: category.categoryText 
            }
        })
    }
   },
   mounted() {
       categoryList().then(res => {
           this.category = res.data.data
       })
   }
}
</script>

<style>

</style>