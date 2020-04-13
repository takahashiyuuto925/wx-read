<template>
<div>
  <div class="home" v-if="isAuth">
      <search-bar 
        disabled
        @onClick="onSearchBarClick"
        :hot-search="hotSearch"
      ></search-bar>
    <home-card :data="homeCard" @onClick="onHomeBookClick"></home-card>
    <home-banner
      img="https://read.lxyamusement.cn:9000/defaultCover/wxwelcomebg.jpg"
      title="欢迎来到爱尚书城"
      subTitle="立即找书"
      @onClick="onBannerClick"
    ></home-banner>
    <div class="home-book">
      <home-book 
        title="为你推荐" 
        :row="1" 
        :col="3" 
        :data="recommend" 
        height="110px"
        mode="col" 
        btn-text="换一批"
        @onMoreClick="recommendChange('recommend')"
        @onBookClick="onHomeBookClick"
      ></home-book>
    </div>
    <div class="home-book">
      <home-book 
        title="免费阅读" 
        :row="2" 
        :col="2" 
        :data="freeRead"
        height="66.25px"
        mode="row" 
        btn-text="换一批"
        @onMoreClick="recommendChange('freeRead')"
        @onBookClick="onHomeBookClick"
      ></home-book>
    </div>
    <div class="home-book">
      <home-book 
        title="当前最热" 
        :row="1" 
        :col="4" 
        :data="hotBook" 
        height="78.75px"
        mode="col" 
        btn-text="换一批"
        @onMoreClick="recommendChange('hotBook')"
        @onBookClick="onHomeBookClick"
      ></home-book>
    </div>
    <div class="home-book">
      <home-book 
        title="分类" 
        :row="2" 
        :col="2" 
        :data="category" 
        mode="category" 
        btn-text="查看全部"
        @onMoreClick="onCategoryMoreClick"
        @onBookClick="onCategoryClick"
      ></home-book>
    </div>
  </div>
  <auth v-if="!isAuth" @getUserInfo="init"></auth>
</div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import HomeCard from '../../components/home/HomeCard'
import HomeBanner from '../../components/home/HomeBanner'
import HomeBook from '../../components/home/HomeBook'
import Auth from '../../components/base/auth'
import { getHomeData, recommend, freeRead, hotBook, register } from '../../api/index'
import { getSetting, getUserInfo, setStorageSync, getStorageSync, getUserOpenId, showLoading, hideLoading } from '../../api/weChat'
export default {
  components: {
    SearchBar,
    HomeCard,
    HomeBanner,
    HomeBook,
    Auth
  },
  methods: {
    init() {
      this.getSetting()
    },
    getUserInfo() {
      const onOpenIdComplete = (openId, userInfo) => {
        this.getHomeData(openId, userInfo)
        register(openId, userInfo)
      }
      getUserInfo(
        userInfo => {
          setStorageSync('userInfo', userInfo)
          const openId = getStorageSync('openId')
          if (!openId || openId.length === 0) {
            getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
          } else {
            onOpenIdComplete(openId, userInfo)
          }
        },
        () => {
          console.log('failed...')
        }
      )
    },
    getSetting() {
      getSetting(
        'userInfo',
        () => {
          this.isAuth = true
          showLoading('正在加载')
          this.getUserInfo()
        },
        () => {
          this.isAuth = false
        }
      )
    },
    recommendChange(key) {
      switch (key) {
        case 'recommend':
          recommend().then(res => {
            this.recommend = res.data.data
          })
          break;
        case 'freeRead':
          freeRead().then(res => {
            this.freeRead = res.data.data
          })
          break;
        case 'hotBook':
          hotBook().then(res => {
            this.hotBook = res.data.data
          })
          break;
      }
    },
    getHomeData(openId, userInfo) {
      getHomeData({ openId }).then(res => {
        const {
          data: {
            hotSearch: {
              keyword
            },
            shelf,
            banner,
            recommend,
            freeRead,
            hotBook,
            category,
            shelfCount
          }
        } = res.data
        this.hotSearch = keyword
        this.banner = banner
        this.recommend = recommend
        this.freeRead = freeRead
        this.hotBook = hotBook
        this.category = category
        this.homeCard = {
          bookList: shelf,
          num: shelfCount,
          userInfo
        }
        hideLoading()
      }).catch(err => {
        hideLoading()
      })
    },
    onSearchBarClick() {
      this.$router.push({
        path: '/pages/search/main',
        query: {
          hotSearch: this.hotSearch
        }
      })
    },
    onBannerClick() {
      console.log('banner click')
    },
    onCategoryMoreClick() {
      this.$router.push({
        path: '/pages/categoryList/main'
      })
    },
    onHomeBookClick(book) {
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
    },
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
    this.init()
  },
  data() {
    return {
      hotSearch: '',
      homeCard: {},
      banner: {},
      recommend: [],
      freeRead: [],
      hotBook: [],
      category: [],
      isAuth: true
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .home-book {
    margin-top: 23px;
  }
}
</style>