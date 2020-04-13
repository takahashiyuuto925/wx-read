<template>
  <div class="search-list-wrapper">
      <search-item
        icon="apps-o"
        :title="category"
        subTitle="分类"
        @onClick="showList(category, 'category')"
        v-if="category"
      ></search-item>
      <search-item
        icon="user-o"
        :title="author"
        subTitle="作者"
        @onClick="showList(author, 'author')"
        v-if="author"
      ></search-item>
      <search-item
        icon="newspaper-o"
        :title="publisher"
        subTitle="出版社"
        @onClick="showList(publisher, 'publisher')"
        v-if="publisher"
      ></search-item>
      <search-table
        :data="data.book"
      ></search-table>
  </div>
</template>

<script>
import SearchItem from './SearchItem'
import SearchTable from './SearchTable'
export default {
    components: {
        SearchItem,
        SearchTable
    },
    props: {
        data: Object
    },
    computed: {
        category() {
            if (this.data && this.data.category && this.data.category.length > 0) {
                return this.data.category[0].categoryText
            } else {
                return null
            }
        },
        author() {
            if (this.data && this.data.author && this.data.author.length > 0) {
                return this.data.author[0].author
            } else {
                return null
            }
        },
        publisher() {
            if (this.data && this.data.publisher && this.data.publisher.length > 0) {
                return this.data.publisher[0].publisher
            } else {
                return null
            }
        }
    },
    methods: {
        showList(text, key) {
            this.$router.push({
                path: '/pages/list/main',
                query: {
                    text, key, title: text
                }
            })
        }
    }
}
</script>

<style>

</style>