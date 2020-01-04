<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar/>
    <back-top @click.native="backClick" v-show="isBackTopShow"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from 'components/content/goods/GoodsList';

  import {getRecommends, getDetail, Goods, GoodsParam, Shop} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        detailItemImageLoad: null,
        themeTopYs: [],
        currentIndex: 0
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid;

      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.data.result;
        //获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;

        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 获取商品详细信息
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo)

        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 获取评论信息
        if(data.rate.list){
          this.commentInfo = data.rate.list[0];
        }

        // console.log(this.commentInfo)

      });

      // 请求推荐数据
      getRecommends().then(res => {
        this.recommends = res.data.data.list;
        console.log(this.recommends)
      });

    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.detailItemImageLoad)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        const detailNavHeight = this.$refs.detailNav.$el.offsetHeight;

        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - detailNavHeight);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - detailNavHeight);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - detailNavHeight);
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      contentScroll(position) {
        const positionY = -position.y;
        const length = this.themeTopYs.length;
        for(let i=0;i<length-1;i++){
          if(this.currentIndex!==i && ( positionY < this.themeTopYs[i+1] && positionY >= this.themeTopYs[i])){
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex;
          }
        }
        this.listenerShowBackTop(position)
      },
      addToCart() {
        console.log('cart')
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
