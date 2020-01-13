<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <scroll id="table-content" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control :titles="['综合','新品','销量']" @itemClick="tabClick"/>
          <tab-content-detail :category-detail="showCategoryDetail"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabControl from './childComps/TabControl';
  import TabContentDetail from "./childComps/TabContentDetail";

  import {getCategory,getSubCategory,getCategoryDetail} from "network/category";

  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      TabMenu,
      TabContentCategory,
      TabControl,
      TabContentDetail
    },
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        currentType: 'pop',
        tabType: ['pop','new','sell']
      }
    },
    created() {
      this.getCategory();
    },
    computed: {
      showSubcategory() {
        if(this.currentIndex === -1) return {};
        return this.categoryData[this.currentIndex].subcategories;
      },
      showCategoryDetail() {
        if(this.currentIndex === -1) return [];
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    },
    methods: {
      getCategory() {
        getCategory().then(res=>{
          // 获取分类数据
          this.categories = res.data.data.category.list;
          // 初始化每个类别的子数据
          console.log(this.categories);
          for(let i=0; i<this.categories.length; ++i){
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail:{
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 获取第一个分类数据
          this.getSubCategory(0)
        })
      },
      getSubCategory(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubCategory(mailKey).then(res=>{
          this.categoryData[index].subcategories = res.data.data;
          this.categoryData = {...this.categoryData};//需要将数据解析，否则为undefined
          // console.log(this.categoryData)
          // console.log(this.categoryData[index].subcategories.list)
          this.getCategoryDetail('pop');
          this.getCategoryDetail('new');
          this.getCategoryDetail('sell');
        })
      },
      getCategoryDetail(type){
        const miniWallkey =this.categories[this.currentIndex].miniWallkey;
        getCategoryDetail(miniWallkey, type).then(res=>{
          this.categoryData[this.currentIndex].categoryDetail[type]=res.data;
          this.categoryData = {...this.categoryData};
          // console.log(this.categoryData[this.currentIndex].categoryDetail[type])
        })
      },
      /*
        事件响应相关方法
       */
      selectItem(index) {
        this.getSubCategory(index);
      },
      tabClick(index) {
        this.currentType = this.tabType[index];
        this.getCategoryDetail(this.currentType);

        console.log(this.currentType)
        // this.currentType =
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }

  #table-content {
    flex:1;
    height: 100%;
    overflow: hidden;
  }
</style>
