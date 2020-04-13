<template>
    <div>
        <shelf-user-info
            :userInfo="userInfo"
            :readDay="readDay"
            :num="shelfList.length-1"
        ></shelf-user-info>
        <shelf-list :shelfList="shelfList"></shelf-list>
    </div>
</template>

<script>
import ShelfUserInfo from '../../components/shelf/ShelfUserInfo'
import ShelfList from '../../components/shelf/ShelfList'
import { getStorageSync } from '../../api/weChat'
import { userDay, bookShelf } from '../../api/index'
export default {
    components: {
      ShelfUserInfo,
      ShelfList
    },
    data() {
        return {
            userInfo: {},
            readDay: 0,
            shelfList: []
        }
    },
    onShow() {
        this.userInfo = getStorageSync('userInfo')
        const openId = getStorageSync('openId')
        userDay({ openId }).then(res => {
            this.readDay = res.data.data
        })
        bookShelf({openId}).then(res => {
            this.shelfList = res.data.data
            this.shelfList.push({})
        })
    }
}
</script>

<style>

</style>