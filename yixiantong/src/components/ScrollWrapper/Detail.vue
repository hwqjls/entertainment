//详情页内容组件
<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <div v-if="!errorShow">
        <detail-swiper
          :picDatas="detailData.pics"
        ></detail-swiper>
      </div>

      <error
       :errorShow="errorShow"
      ></error>
    </div>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll';
  import DetailSwiper from './Sub/Swiper';
  import Error from './Sub/Error';

  import { DetailModel } from 'models/detail';

  import tools from 'utils/tools';

  export default {
    name: 'DetailScrollWrapper',
    components: {
      DetailSwiper,
      Error
    },
    data () {
      return {
        field: '',
        id: 0,
        errorShow: false,
        detailData: {}
      }
    },

    mounted () {
      this.scroll = new BetterScroll(this.$refs.wrapper);
      this.field = this.$route.query.field;
      this.id = this.$route.query.id;
      this.getDetail(this.field, this.id);
    },

    activated () {
      this.currentField = this.$route.query.field;
      this.currentId = this.$route.query.id;

      if (this.currentField !== this.field || this.currentId !== this.id) {
      	this.field = this.currentField;
      	this.id = this.currentId;

      	this.getDetail(this.field, this.id);
      }
    },

    methods: {
      getDetail (field, id) {
      	const detailModel = new DetailModel();

      	detailModel.getDetail(field, id).then((res) => {
      		if (res && res.status === 0) {
      			const data = res.data;
            
            this.errorShow = false;
      			data.pics && (data.pics = tools.jsonToArr(data.pics));
      			data.comment_keyword && (data.comment_keyword = tools.strToArr(data.comment_keyword));
      			data.recom && (data.recom = tools.replaceToSpace(data.recom));
      			data.service && (data.service = tools.jsonToArr(data.service));

      			this.detailData = data;
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