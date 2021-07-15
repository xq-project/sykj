<template>
    <div>
         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                  新建信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

                <div class>
   
    <el-form ref="form" :model="form" class="notform"  label-width="120px" >
      <el-form-item label="消息栏目：" prop="column">
        <el-input v-model="form.column" placeholder="请填写消息栏目"  size="middle"></el-input>
      </el-form-item>
      <el-form-item label="消息标题：" prop="headline">
        <el-input v-model="form.headline" placeholder="请填写消息标题" size="middle"></el-input>
      </el-form-item>
      <el-form-item label="消息对象：" prop="object">
        <el-input v-model="form.object" placeholder="请填写消息对象" size="middle"></el-input>
      </el-form-item>
      <el-form-item label="消息内容：" prop="content">
        <quill-editor
          ref="myQuillEditor"
          class="editor"
          v-model="form.content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        />
      </el-form-item>
      <el-form-item label="提醒方式：" class="radiodiv" prop="radio">
        <el-radio v-model="form.radio" label="1">站内信</el-radio>
        <el-radio v-model="form.radio" label="2">邮件</el-radio>
        <el-radio v-model="form.radio" label="3">短信</el-radio>
        <span>(短信可用数：1000条)</span>
        <el-button type="primary" class="baocunbutton" >保存</el-button>
        <el-button type="primary"  @click="dialogpreview = true">预览</el-button>
        <el-button type="primary"  >发布</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<script>


export default{
    name:'usercontrol',
    data(){
         return {
             
      form: {
        column: '',
        headline: '',
        object: '',
        content: '',
        radio:'1',
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], //列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
 
 
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
 
 
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
 
 
            ['clean'], //清除字体样式
            // ['image', 'video'], //上传图片、上传视频
          ],
        },
        theme: 'snow',
      },
    }
  },
  
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
       //重置
        resetForm(form){
            if(this.$refs[form] !== undefined){
                this.$refs[form].resetFields();
            }
        },
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    submit() {
      if (!this.form.title) {
        this.$message('请输入标题')
      }
      if (!this.form.description) {
        this.$message('请输入描述')
      }
      if (!this.form.content) {
        this.$message('请输入正文')
      }
 
 
      let formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('description', this.form.description)
      formData.append('content', this.form.content)
      // 发送 POST 请求
      axios({
        method: 'post',
        url: 'http://139.159.147.237:8080/yxyz/article/addarticle',
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(function(response) {
          if (res.code === 0) {
            this.$message('提交成功')
          }
          // this.form = {
          //   title: '',
          //   description: '',
          //   content: '',
          // }
          this.$router.goBack()
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },

}


</script>
<style>
 .notform .el-input__inner{
     width: 500px;
 }
 
 .notform .el-form-item__label{
     font-size: 18px;
 }
.editor{
    width: 80%;
    height: 400px;
}
  .radiodiv{
      font-size: 18px;
      margin-top: 80px;
  }
  .radiodiv .el-radio__label{
      font-size: 18px;
  }
  .baocunbutton{
      margin-left: 200px;
  }
  .notform .el-button{
      font-size: 18px;
      width: 100px;
  }


</style>
