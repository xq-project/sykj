<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 头部 -->
      <div class="handle-box">
        <el-form
          :model="query"
          ref="query"
          label-position="left"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
              <el-form-item
                label="姓名:"
                prop="username"
                class="fromitemyh"
                style="font-size:18px large"
                :span="6"
              >
                <el-input
                  v-model="usernames"
                  placeholder="姓名"
                  class="handle-input "
                  :clear="getData"
                  @clear="getData"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="用户名:"
                prop="usernuber"
                class="fromitemyh"
                :span="6"
              >
                <el-input
                  v-model="usernubers"
                  placeholder="用户名"
                  class="handle-input "
                  :clear="getData"
                  @clear="getData"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="fromitemyh" :span="6">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="getData()"
                  >查询</el-button
                >
                <el-button @click="resetForm('query')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="18">
            <el-button
              class="xjbutton"
              type="primary"
              icon="el-icon-plus"
              @click="opendialogForm"
              >新建</el-button
            >
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18" class="tablecol">
          <el-table
            :data="tableData"
            class="table"
            border
            header-cell-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              prop="username"
              label="姓名"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="usernuber"
              label="用户名"
              align="center"
            ></el-table-column>

            <el-table-column label="状态" align="center" prop="tovoidno">
              <template slot-scope="scope">
                <el-tag v-if="tableData[scope.$index].tovoidno == '0'"
                  >正常</el-tag
                >
                <el-tag
                  type="danger"
                  v-if="tableData[scope.$index].tovoidno == '1'"
                  >禁用</el-tag
                >
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  @click="handleEditimpower(scope.$index, scope.row)"
                  >授权</el-button
                >
                <el-button size="mini" @click="handleDelete(scope.row)"
                  >禁用</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page.sync="pageNow"
              :page-sizes="[8, 16, 24, 32]"
              :page-size="size"
              :total="total"
              @size-change="findSizeChange"
              @current-change="findPage"
              :pager-count="5"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 新增模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      class="newlyincreased"
      @close="addDialogClosed"
    >
      <el-form :model="query" :rules="addFormRules" ref="addFormRef">
        <el-form-item
          label="姓名："
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input v-model="query.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名："
          prop="usernuber"
          :label-width="formLabelWidth"
        >
          <el-input v-model="query.usernuber" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
          v-show="addupdate"
        >
          <el-input v-model="query.password"></el-input>
        </el-form-item>

        <el-form-item
          label="手机"
          prop="phonenumber"
          :label-width="formLabelWidth"
        >
          <el-input v-model="query.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="query.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  name: "usercontrol",
  inject: ["reload"],
  data() {
    // 验证邮箱的规则(验证规则 验证的值 回调函数)
    var checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    // 验证手机的规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        // 合法的手机
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    return {
      query: {
        userid: "",
        username: "",
        usernuber: "",
        usertable: "",
        tovoidno: "",
        password: "",
        email: "",
        phonenumber: ""
      },

      usernames: "",
      usernubers: "",
      pageTotal: 0,
      tableData: [], //表格数据
      dialogFormVisible: false, //新增/修改模态框
      title: "", //新增修改模态框
      addupdate: false, //标识新增修改
      total: 0,
      page: 1, //页数
      size: 8, //显示的条数
      pageNow: 1,
      formLabelWidth: "120px",
      addFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phonenumber: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };

    // 添加用户表单的验证规则对象
  },
  created() {
    this.getData();
  },
  methods: {
    //用来处理每页显示记录发生变化的方法
    findSizeChange(size) {
      // console.log("当每页条数改变的时候" + size);
      //将val赋值给size
      this.size = size;
      //重新去后台查询数据
      this.getData();
    },
    //当前页码改变的时候
    findPage() {
      this.getData(this.pageNow, this.size);
    },

    getData(page, size) {
      let that = this;
      page = page ? page : this.pageNow;
      size = size ? size : this.size;
      Axios.get("/szlbackgroundprogram/user/userList", {
        params: {
          page: page,
          pageSize: size,
          username: this.usernames,
          usernuber: this.usernubers
        }
      })
        .then(response => {
          //   if (response.code == "1" && response.msg == "SUCCSSS") {
          that.tableData = response.data.list;
          that.total = response.data.total;
          that.page = response.data.pages;

          //   }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // // 分页导航
    // handlePageChange(val) {
    //   this.$set(this.query, "pageIndex", val);
    //   this.getData();
    // },

    //查询按钮
    // handleSearch() {
    //   this.$set(this.query, "pageIndex", 1);
    // },

    //打开新增
    opendialogForm() {
      this.title = "新增用户";
      this.addupdate = true;
      this.dialogFormVisible = true;
      (this.query.username = ""),
        (this.query.usernuber = ""),
        (this.query.password = ""),
        (this.query.email = ""),
        (this.query.phonenumber = "");
      this.addFormRules.password[0].required = true;
    },

    // 点击按钮 添加新用户
    addUser() { cdf
      this.$refs.addFormRef.validate(valid => {
        if (valid) {
          if (this.addupdate == true) {
            Axios.post(
              "/szlbackgroundprogram/user/useradd",
              {
                username: this.query.username,
                usernuber: this.query.usernuber,
                password: this.query.password,
                email: this.query.email,
                phonenumber: this.query.phonenumber
              },
              {
                emulateJSON: true
              }
            )
              .then(res => {
                debugger;
                if (res.data == "Success" && res.status == "200") {
                  this.$message.success("新增成功");
                  //表格重载
                  this.reload();
                  //同时关闭遮罩层
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning("新增失败!");
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            Axios.post(
              "/szlbackgroundprogram/user/userupdate",
              {
                userid: this.query.userid,
                username: this.query.username,
                usernuber: this.query.usernuber,
                password: this.query.password,
                email: this.query.email,
                phonenumber: this.query.phonenumber
              },
              {
                emulateJSON: true
              }
            )
              .then(res => {
                debugger;
                if (res.data == "Success" && res.status == "200") {
                  this.$message.success("修改成功");
                  //表格重载
                  this.reload();
                  //同时关闭遮罩层
                  this.dialogFormVisible = false;
                } else {
                  this.$message.warning("修改失败!");
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          this.$message.error("请输填写完整");
          return false;
        }
      });
    },

    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      // 表单内容重置为空
      this.$refs.addFormRef.resetFields();
    },

    //编辑
    handleEdit(row) {
      debugger;
      console.log(row);
      this.query.userid = row.userid;
      this.query.username = row.username;
      this.query.usernuber = row.usernuber;
      this.query.email = row.email;
      this.query.phonenumber = row.phonenumber;

      this.title = "修改用户";
      this.dialogFormVisible = true;
      this.addupdate = false;
      this.addFormRules.password[0].required = false;
    },

    //授权
    handleEditimpower(index, row) {
      console.log(index, row);
    },

    //禁用
    handleDelete(row) {
      debugger;
      this.userid = row.userid;

      this.$confirm("您确定禁用该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Axios.post("/szlbackgroundprogram/user/Userdelete", {
            userid: this.userid
          })
            .then(res => {
              if (res.data == "Success" && res.status == "200") {
                this.$message({
                  type: "success",
                  message: "禁用成功"
                });
              }
              //表格重载
              this.reload();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消禁用"
          });
        });
    },

    //重置
    resetForm(query) {
      if (this.$refs[query] !== undefined) {
        this.$refs[query].resetFields();
      }
    }
  }
};
</script>
<style>
.fromitemyh .el-form-item__label {
  font-size: 20px;
}
.fromitemyh {
  font-size: 20px;

  display: inline-block;
  margin-right: 40px;
}
.xjbutton {
  margin-left: 20px;
  margin-bottom: 20px;
}
.tablecol {
  margin-left: 20px;
}
.table {
  font-size: 16px;
}
.newlyincreased .el-dialog {
  width: 35%;
  font-size: 18px;
}
</style>
