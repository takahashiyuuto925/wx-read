<template>
  <div>
      <detail-book :book="book"></detail-book>
      <detail-stat
        :readers="book.readers"
        :readerNum="book.readerNum"
        :rankNum="book.rankNum"
        :rankAvg="book.rankAvg"
      ></detail-stat>
      <detail-rate
        :rateValue="book.rateValue"
        @onRateChange="onRateChange"
      ></detail-rate>
      <detail-contents :contents="contents" @readBook="readBook"></detail-contents>
      <detail-bottom
        :isInShelf="isInShelf"
        @handleShelf="handleShelf"
        @readBook="readBook"
      ></detail-bottom>
  </div>
</template>

<script>
import DetailBook from '../../components/detail/DetailBook'
import DetailStat from '../../components/detail/DetailStat'
import DetailRate from '../../components/detail/DetailRate'
import DetailContents from '../../components/detail/DetailContents'
import DetailBottom from '../../components/detail/DetailBottom'
import { bookDetail, bookRankSave, bookContents, bookShelf, bookShelfSave, bookShelfRemove } from '../../api/index'
import { getStorageSync } from '../../api/weChat'
export default {
    components: {
        DetailBook,
        DetailStat,
        DetailRate,
        DetailContents,
        DetailBottom
    },
    data() {
        return {
            book: {},
            contents: [],
            isInShelf: false
        }
    },
    methods: {
        handleShelf() {
            const openId = getStorageSync('openId')
            const {fileName} = this.$route.query
            if (!this.isInShelf) {
                bookShelfSave({openId, fileName}).then(() => {
                    this.getBookIsInShelf()
                })
            } else {
                const _this = this
                mpvue.showModal({
                    title: '提示',
                    content: `是否确认将《${this.book.title}》移出书架`,
                    success (res) {
                        if (res.confirm) {
                            bookShelfRemove({openId, fileName}).then(() => {
                                _this.getBookIsInShelf()
                            })
                        }
                    }
                })
            }
        },
        readBook(href) {
            const query = {
                    fileName: this.book.fileName,
                    opf: this.book.opf
                }
            if (href) {
                const index = href.indexOf('/')
                if (index >= 0) {
                    query.navigation = href.slice(index + 1)
                } else {
                    query.navigation = href
                }
            }
            if (this.book && this.book.fileName) {
                this.$router.push({
                    path: '/pages/read/main',
                    query
                })   
            }
        },
        onRateChange(value) {
            const openId = getStorageSync('openId')
            const {fileName} = this.$route.query
            bookRankSave({
                openId,
                fileName,
                rank: value
            }).then(() => {
                this.getBookDetail()
            })
        },
        getBookDetail() {
            const openId = getStorageSync('openId')
            const {fileName} = this.$route.query
            if (openId && fileName) {
                bookDetail({openId, fileName}).then(res => {
                    this.book = res.data.data
                })
            }
        },
        getBookContents() {
            const {fileName} = this.$route.query
            if (fileName) {
                bookContents({ fileName }).then(res => {
                    this.contents = res.data.data
                })
            }
        },
        getBookIsInShelf() {
            const openId = getStorageSync('openId')
            const {fileName} = this.$route.query
            if (openId && fileName) {
                bookShelf({openId, fileName}).then(res => {
                    const { data } = res.data
                    data.length === 0 ? this.isInShelf = false : this.isInShelf = true
                })
            }
        }
    },
    mounted() {
        this.getBookDetail()
        this.getBookContents()
        this.getBookIsInShelf()
    }
}
</script>

<style lang="scss" scoped>

</style>