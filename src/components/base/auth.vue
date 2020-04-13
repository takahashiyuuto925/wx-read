<template>
  <div class="auth-wrapper">
      <div class="auth">
          <div class="auth-info">
                <div class="auth-img">
                    <image-view round src="https://read.lxyamusement.cn:9000/defaultCover/wxlogo.jpg" height="100%" mode="scaleToFill"></image-view>
                </div>
                <div class="sub-title">登录爱尚书城</div>
                <div class="title">全场精品免费读</div>
          </div>    
          <button 
            class="auth-button"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo"
          >授权登录</button>
      </div>
  </div>
</template>

<script>
import ImageView from './imageView'
export default {
    components: {
        ImageView
    },
    methods: {
        getUserInfo() {
            this.$emit('getUserInfo')
        }
    }
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    .auth {
        position: relative;
        width: 270px;
        height: 248px;
        background: #F5F5F5;
        border-radius: 18px;
        .auth-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 22.5px;
            .auth-img {
                width: 74px;
                height: 74px;
            }
            .sub-title {
                font-size: 13px;
                color: #999;
                line-height: 18.5px;
                margin-top: 18px;
            }
            .title {
                font-size: 16.5px;
                color: #333;
                font-weight: 400;
                line-height: 22.5px;
                margin-top: 3.5px;
            }
        }
        .auth-button {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 49px;
            line-height: 49px;
            font-size: 15px;
            color: #fff;
            background-image: linear-gradient(90deg, #1EA3F5 0%, #8F87FC 100%);
            border-radius: 0 0 18px 18px;
        }
    }
}
</style>