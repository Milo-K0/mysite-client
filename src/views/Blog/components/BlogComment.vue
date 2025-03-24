<template>
    <MessageArea title="评论列表" :subTitle="`(${data.total})`" :list="data.rows" :isListLoading="isLoading" @submit="handleSubmit" />
</template>

<script>
import MessageArea from '@/components/MessageArea'
import fetchData from '@/mixins/fetchData';
import { getCommits,postCommit } from '@/api/blog';

  export default {
    mixins: [fetchData({total: 0,rows: []})],
    components: {
      MessageArea
    },
    data() {
      return {
        page: 1,
        limit: 10
      }
    },
    created() {
      this.$bus.$on('mainScroll',this.handleScroll)
    },
    destroyed() {
      this.$bus.$off('mainScroll',this.handleScroll)
    },
    computed: {
      hasMore() {
        return this.data.rows.length < this.data.total;
      }
    },
    methods: {
      handleScroll(dom) {
        if(!dom || this.isLoading) {
          return
        }
        const range = 100;
        const desc = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
        if(desc < range) {
          this.fentchMore();
        }
      },
      async fetchData() {
        const res = await getCommits(this.$route.params.id,this.page,this.limit);
        return res.data.data;
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
      async handleSubmit(formData,callback) {
        const res = await postCommit({
          blogId: this.$route.params.id,
          ...formData,
        });
        this.data.rows.unshift(res)
        this.data.total += 1;
        callback('评论成功');
      }
    }
  }
</script>

<style lang="less" scoped>

</style>