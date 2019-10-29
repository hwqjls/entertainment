<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <category-icons></category-icons> 
      <div v-if="!errorShow">
        <home-title :title="homeTitle.viewTitle"></home-title>
        <view-list :viewDatas="homeDatas.viewDatas"></view-list>
        <home-title :title="homeTitle.foodTitle"></home-title>
        <home-title :title="homeTitle.hotelTitle"></home-title>
        <home-title :title="homeTitle.messageTitle"></home-title>
        <home-title :title="homeTitle.ktvTitle"></home-title>
      </div>
    </div>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll';
  import CategoryIcons from './CategoryIcons';
  import HomeTitle from './Sub/HomeTitle'
  import ViewList from './ViewList';

  import { mapState } from 'vuex';
  import { IndexModel } from 'models/index'

  import tools from 'utils/tools';

  export default {
    name: 'HomeScrollWrapper',
    components: {
      CategoryIcons,
      HomeTitle,
      ViewList
    },
    data () {
      return {
        currentCityId: 0, //当前城市id
        errorShow: false, //错误判断
        homeTitle: {  //标题
          foodTitle: '推荐美食',
          hotelTitle: '推荐酒店',
          ktvTitle: '推荐KTV',
          messageTitle: '推荐按摩',
          viewTitle: '推荐景点'
        },
        homeDatas: {  //接口数据缓存(缓存池技术)
          foodDatas: [],
          hotelDatas: [],
          ktvDatas: [],
          messageDatas: [],
          viewDatas: []
        }
      }
    },
    computed: {
      ...mapState(['cityId'])
    },
    mounted () {
      this.scroll = new BetterScroll(this.$refs.wrapper);
      this.currentCityId = this.cityId;
      this.getHomeDatas(this.cityId);
    },

    activated () {
      if (this.currentCityId !== this.cityId) {
        this.currentCityId =  this.cityId;
        this.getHomeDatas(this.currentCityId);
      }
    },

    methods: {
      getHomeDatas (cityId) {
        const indexModel = new IndexModel();

        indexModel.getHomeDatas(cityId).then((res) => {
          if (res && res.status === 0) {
            const data = res.data;
            console.log(data);
            this.errorShow = false;
            this.homeDatas.viewDatas = data.viewDatas;
            this.homeDatas.foodDatas = tools.formatJSON(data.foodDatas, 'keyword');
            this.homeDatas.hotelDatas = data.hotelDatas;
            this.homeDatas.messageDatas = data.massageDatas;
            this.homeDatas.ktvDatas = data.viewDatas;
          } else {
            this.errorShow = true;
            console.log({
              statusCode: res.status,
              errorMsg: res.error
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>