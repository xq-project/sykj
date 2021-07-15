<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          人员信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form
          :model="query"
          ref="query"
          label-position="left"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-row type="flex" class="row-bg pinforrow" justify="center">
            <el-col :span="6">
              <el-form-item
                label="姓名:"
                prop="personnelname"
                class="fromitem"
                style="font-size:18px large"
                :span="6"
              >
                <el-input
                  v-model="query.personnelname"
                  size="medium"
                  placeholder="请输入姓名"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="房屋:"
                prop="buildingid"
                class="fromitem"
                :span="6"
              >
                <el-select
                  v-model="query.buildingid"
                  size="medium"
                  placeholder="请选择房屋"
                  class="handle-input"
                ></el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="籍贯:"
                prop="nativeplaceid"
                class="fromitem"
                :span="6"
              >
                <el-select
                  v-model="query.nativeplaceid"
                  size="medium"
                  placeholder="请选择籍贯"
                  class="handle-input"
                ></el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
              <el-button
                size="small"
                type="primary"
                @click="getData"
                class="button_wd"
                >查询</el-button
              >
              <el-button @click="resetForm('query')" class="button_wd"
                >重置</el-button
              >
            </el-col>
            <el-col :span="12">
              <el-form-item class="" :span="6">
                <el-button
                  @click="openaddpersonnel"
                  class="button_wd"
                  type="success"
                  >信息录入</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24" class="tablecol">
          <el-table
            :data="tableData"
            class="table"
            border
            header-cell-class-name="table-header"
            style="width: 150%"
          >
            <el-table-column
              prop="personnelname"
              label="姓名"
              align="center"
            ></el-table-column>
            <el-table-column prop="sex" label="性别" align="center" width="80">
              <template slot-scope="scope">{{
                scope.row.sex === "1" ? "男" : "女"
              }}</template>
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="住址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="registeraddress"
              label="户籍地址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="personnelphone"
              label="手机号码"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="personnelnumber"
              label="身份证号码"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="platenumber"
              label="所属车辆"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createtime"
              label="录入时间"
              align="center"
            ></el-table-column>

            <el-table-column label="操作" align="center" width="165px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleEdit(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next"
              :current-page="query.pageIndex"
              :page-size="query.pageSize"
              :total="pageTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 新增、修改 -->
    <Dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      class="color_bg"
    >
      <Form
        :model="ryxxlr"
        class="demo-form-inline"
        :inline="true"
        size="small"
        :label-position="labelPosition"
        label-width="110px"
        ref="addFormry"
        :rules="addFormryxx"
      >
        <Row type="flex" justify="center">
          <Col :span="10">
            <FormItem label="姓名" prop="ryname">
              <Row>
                <Col :span="24" size="small">
                  <Input
                    width="150px"
                    v-model="ryxxlr.ryname"
                    autocomplete="off"
                    size="small"
                    placeholder="请输入姓名"
                     clearable
                  ></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem label="性别" prop="sex">
              <Col :span="24" size="small">
                <Select v-model="ryxxlr.sex" placeholder="请选择性别">
                  <Option label="男" value="1"></Option>
                  <Option label="女" value="0"></Option>
                </Select>
              </Col>
            </FormItem>
            <FormItem label="年龄" prop="age">
              <Col :md="24" size="small">
                <Input
                  v-model="ryxxlr.age"
                  autocomplete="off"
                  size="small"
                  placeholder="请输入年龄"
                ></Input>
              </Col>
            </FormItem>
            <FormItem label="住址" prop="address">
              <Col :span="24" size="small">
                <Input
                  v-model="ryxxlr.address"
                  autocomplete="off"
                  size="small"
                  placeholder="请输入住址"
                ></Input>
              </Col>
            </FormItem>
          </Col>

          <Col :span="10">
            <FormItem label="手机号码" prop="ryphonone"> 
              <Col :span="24" size="small">
                <Input
                  v-model="ryxxlr.ryphonone"
                  autocomplete="off"
                  size="small"
                  placeholder="请输入手机号"
                ></Input>
              </Col>
            </FormItem>
            <FormItem label="身份证号码" prop="ryid">
              <Col :span="24" size="small">
                <Input
                  v-model="ryxxlr.ryid"
                  autocomplete="off"
                  size="small"
                  placeholder="请输入身份证号"
                ></Input>
              </Col>
            </FormItem>
            <FormItem label="户籍地址" prop="hjaddress">
              <Input
                v-model="ryxxlr.hjaddress"
                autocomplete="off"
                size="small"
                placeholder="请输入户籍地址"
              ></Input>
            </FormItem>

            <FormItem label="车牌号码" prop="carnumber">
              <Col :span="24" size="small">
                <Input
                  v-model="ryxxlr.carnumber"
                  autocomplete="off"
                  size="small"
                  placeholder="没有可填无"
                ></Input>
              </Col>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="dialogFormVisible = false">取 消</Button>
        <Button type="primary" @click="addpersonnel">确 定</Button>
      </div>
    </Dialog>
  </div>
</template>
<script>
import {
  Row,
  Col,
  Pagination,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  DatePicker,
  Autocomplete
} from "element-ui";
import Axios from "axios";
export default {
  name: "usercontrol",
  inject: ["reload"],
  components: {
    Row,
    Col,
    Pagination,
    Dialog,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    DatePicker,
    Autocomplete
  },
  data() {

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
        personnelname: "",
        buildingid: "",
        nativeplaceid: ""
      },
      pageTotal: 0,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      ryxxlr:{
          ryname:"",
          sex:"",
          age:"",
          address:"",
          ryphonone:"",
          ryid:"",
          hjaddress:"",
          carnumber:"",
      },
      formLabelWidth: "120px",
      labelPosition: "right",
      addFormryxx:{
        ryname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        sex:[
           { required: true, message: "性别请填写完整", trigger: "blur" },
        ],
        age:[
          { required: true, message: "请输入年龄", trigger: "blur" },
        ],
        address:[
          { required: true, message: "请输入地址", trigger: "blur" },
        ],
         ryphonone:[
            { required: true, message: "请输入用户手机", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
         ryid:[
          { required: true, message: "请输入身份证号码", trigger: "blur" },
        ],
         hjaddress:[
          { required: true, message: "请输入户籍地址", trigger: "blur" },
        ]
        
      },
       title: "", //新增修改模态框
      addperson: false, //标识新增修改
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      debugger;
      let that = this;
      //   page = page ? page : this.pageNow;
      //   size = size ? size : this.size;
      Axios.get("/szlbackgroundprogram/people/peopleList", {
        params: {
          page: page,
          pageSize: size,
          personnelname: that.query.personnelname,
          nativeplaceid: that.query.nativeplaceid,
          buildingid: that.query.buildingid
        }
      }).then(response => {
        debugger;
        that.tableData = response.data.list;
        that.total = response.data.total;
        that.page = response.data.pages;
      });
    },
    //查询按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
    },

    //重置
    resetForm(query) {
      if (this.$refs[query] !== undefined) {
        this.$refs[query].resetFields();
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    //人员新增模态框打开
    openaddpersonnel(){
      this.title = "新增人员";
      this.addperson = true;
      this.dialogFormVisible = true;
      this.ryxxlr.ryname="";
      this.ryxxlr.sex="";
      this.ryxxlr.age="";
      this.ryxxlr.address="";
      this.ryxxlr.ryphonone="";
      this.ryxxlr.ryid="";
      this.ryxxlr.hjaddress="";
      this.ryxxlr.carnumber="";
    },
    //人员新增
    addpersonnel(){
         this.$refs.addFormry.validate(valid =>{
           if(valid){
             Axios.post(
              "/szlbackgroundprogram/people/peopleadd",
              {
                personnelname:this.ryxxlr.ryname,
                sex: this.ryxxlr.sex,
                age: this.ryxxlr.age,
                personnelnumber: this.ryxxlr.ryid,
                personnelphone: this.ryxxlr.ryphonone,
                presentaddress:this.ryxxlr.address,
                registeraddress:this.ryxxlr.hjaddress,
              },
              {
                emulateJSON: true
              }
            )
            .then(res =>{
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
           }
         })
    }
  }
};
</script>
<style>
.fromitem .el-form-item__label {
  font-size: 20px;
}
.fromitem {
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
  margin-top: 20px;
}
.table {
  font-size: 16px;
}
.pinforrow .el-input {
  width: 260px;
  height: 45px;
}
.button_css .el-button {
  font-size: 16px;
  width: 125px;
}
.button_wd {
  font-size: 16px;
  width: 125px;
}

.color_bg {
  color: #66b1ff;
}
/* .el-dialog__header {
  text-align: center;
  background: #66b1ff;
} */
/* .el-input__inner {
  width: 300px;
} */
</style>
