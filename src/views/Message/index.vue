<template>
  <div class='message-container' ref="container">
    <MessageArea title="留言板" 
    :subTitle="`(${data?.total})`" 
    :isListLoading="isLoading"
    :list="data?.rows"
    @submit="handleSubmit"/>
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea'
import fetchData from '@/mixins/fetchData';
import * as msgApi from '@/api/message'
  export default {
    mixins: [fetchData({total: 0,rows: []})],
    components: {
      MessageArea
    },
    created() {
      this.$bus.$on('setMainScroll',this.handleSetMainScroll);
      this.$bus.$on('mainScroll',this.handleMainScroll)
    },
    mounted() {
      this.$refs.container.addEventListener('scroll',this.handleScroll);
    },
    beforeDestroy() {
      this.$bus.$emit('mainScroll',undefined);
      this.$bus.$off('setMainScroll',this.handleSetMainScroll)
      this.$bus.$off('mainScroll',this.$refs.container);
      this.$refs.container.removeEventListener('scroll',this.handleScroll);
    },
    computed: {
      hasMore() {
        return this.data.rows.length < this.data.total;
      }
    },
    data() {
      return {
        page: 1,
        limit: 10
      }
    },
    methods: {
      async fetchData() {
        return await msgApi.getMessage(this.page,this.limit);
      },
      async handleSubmit(formData,callback) {
        const resp = await msgApi.postMessage(formData);
        callback('感谢您的留言')
        this.data.rows.unshift(resp);
        this.data.total += 1;
      },
      handleScroll() {
        this.$bus.$emit('mainScroll',this.$refs.container);
      },
      handleMainScroll(dom) {
        if(!dom || this.isLoading) {
          return
        }
        const range = 100;
        const desc = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
        if(desc < range) {
          this.fentchMore();
        }
      },
      handleSetMainScroll(scrollTop) {
        this.$refs.container.scrollTop = scrollTop;
      },
      async fentchMore() {
        if(!this.hasMore) return;
        this.isLoading = true;
        this.page++;
        const resp = await this.fetchData();
        this.total = resp.total;
        this.data.rows = this.data.rows.concat(resp.rows);
        this.isLoading = false;
      },
    }
  }
</script>

<style lang="less" scoped>
.message-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>