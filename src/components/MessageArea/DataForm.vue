<template>
  <form id="data-form-container" @submit.prevent="handleSubmit" class='dataform-container' ref="container">
    <div class="form-item">
      <div class="input-area">
        <input type="text" maxlength="10" placeholder="用户昵称" v-model="formData.nickname">
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea placeholder="输入内容" maxlength=300 v-model="formData.content"></textarea>
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmiting">{{ isSubmiting ? '提交中' : '提交' }}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: '',
        content: ''
      },
      error: {
        nickname: '',
        content: ''
      },
      isSubmiting: false
    }
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? '' : '请填写昵称';
      this.error.content = this.formData.content ? '' : '请填写评论内容';
      if (this.error.nickname || this.error.content) { return };
      this.isSubmiting = true; // 正在提交防止重复点击
      // 深拷贝 formData
      const formDataCopy = { ...this.formData };
      this.$emit('submit', formDataCopy, (successMsg) => {
        this.isSubmiting = false;
        this.formData.nickname = '';
        this.formData.content = '';
        this.$showMessage({
          content: successMsg,
          type: 'success',
          duration: 1500,
          container: this.$refs.container
        })
      }); // 让父组件来处理事件
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.dataform-container {
  position: relative;
  margin-top: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: @primary;
  color: #fff;
  width: 100px;
  height: 34px;
  border-radius: 4px;
  &:hover {
    background: darken(@primary,10%);
    cursor: pointer;
  }
  &:disabled {
    background: darken(@primary,20%);
    cursor: not-allowed;
  }
}
</style>