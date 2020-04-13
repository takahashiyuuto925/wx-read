<template>
  <div>
      <search-bar
        :hotSearch="hotSearchKeyword"
        :focus="searchFocus"
        @onChange="onChange"
        @onClear="onClear"
        @onConfirm="onConfirm"
        ref="searchBar"
      ></search-bar>
      <tag-group
        headerText="热门搜索"
        btnText="换一批"
        :value="hotSearchArray"
        @onBtnClick="changeHotSearch"
        @onTagClick="showBookDetail"
        v-if="hotSearchArray && hotSearchArray.length > 0 && !showList"
      ></tag-group>
      <tag-group
        headerText="历史搜索"
        btnText="清空"
        :value="historySearch"
        @onBtnClick="clearHistorySearch"
        @onTagClick="searchKeyword"
        v-if="historySearch && historySearch.length > 0 && !showList"
      ></tag-group>
      <search-list
        :data="searchList"
        v-if="showList"
      ></search-list>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import TagGroup from '../../components/base/tagGroup'
import SearchList from '../../components/search/SearchList'
import { getStorageSync, setStorageSync, showToast } from '../../api/weChat'
import { search, hotSearch } from '../../api/index'

const KEY_HISTORYSEARCH = 'historySearch'
export default {
    components: {
      SearchBar,
      TagGroup,
      SearchList
    },
    data() {
        return {
          hotSearch: [],
          hotSearchKeyword: '',
          historySearch: [],
          searchFocus: true,
          searchList: {},
          openId : '',
          page: 1
        }
    },
    computed: {
      showList() {
        const keys = JSON.stringify(this.searchList)
        return keys && keys !== '{}'
      },
      hotSearchArray() {
        const _hotSearch = []
        this.hotSearch.forEach(o => _hotSearch.push(o.title))
        return _hotSearch
      }
    },
    methods: {
      onConfirm(keyword) {
        if (!keyword || keyword.trim().length === 0) {
          keyword = this.hotSearchKeyword
          this.$refs.searchBar.setValue(keyword)
        } else {

        }
        this.onSearch(keyword)
        if (!this.historySearch.includes(keyword)) {
          this.historySearch.push(keyword)
          setStorageSync(KEY_HISTORYSEARCH, this.historySearch)
        }
        this.searchFocus = false
      },
      onClear() {
        this.searchList = {}
      },
      onChange(keyword) {
        this.searchFocus = true
        if (!keyword || keyword.trim().length === 0) {
          this.searchList = {}
          return 
        }
        this.page = 1
        this.onSearch(keyword)
      },
      onSearch(keyword) {
        search({
          keyword, openId: this.openId, page: this.page
        }).then(res => {
          this.searchList = res.data.data
        })
      },
      changeHotSearch() {
        hotSearch().then(res => {
          this.hotSearch = res.data.data
        })
      },
      showBookDetail(text, index) {
        console.log('show book detail', text, index)
      },
      clearHistorySearch() {
        this.historySearch = []
        setStorageSync(KEY_HISTORYSEARCH, [])
      },
      searchKeyword(text, index) {
        this.$refs.searchBar.setValue(text)
        this.onSearch(text)
      }
    },
    mounted() {
      this.openId = getStorageSync('openId')
      hotSearch().then(res => {
        this.hotSearch = res.data.data
      })
      this.hotSearchKeyword = this.$route.query.hotSearch
      this.historySearch = getStorageSync(KEY_HISTORYSEARCH) || []
      this.page = 1
    },
    onPageScroll() {
      if (this.searchFocus) {
        this.searchFocus = false
      }
    },
    onReachBottom() {
      if (this.showList) {
        this.page++
        const searchWord = this.$refs.searchBar.getValue()
        search({
          keyword: searchWord, openId: this.openId, page: this.page
        }).then(res => {
          const { book } = res.data.data
          if (book && book.length > 0) {
            this.searchList.book.push(...book)
          } else {
            showToast('没有更多数据了')
          }
        })
      }
    }
}
</script>

<style lang='scss' scoped>

</style>