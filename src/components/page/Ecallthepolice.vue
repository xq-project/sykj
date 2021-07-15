<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          设备告警
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
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="4">
              <el-form-item
                label="设备ID:"
                prop="name"
                class="fromitem"
                style="font-size:18px large"
              >
                <el-input
                  v-model="devicenumnameid"
                  placeholder="请输入设备ID"
                  size="medium"
                  class="handle-input "
                  clearable="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="产品:" prop="usernuber" class="fromitem">
                <el-input
                  v-model="devicenumname"
                  placeholder="产品"
                  size="medium"
                  class="handle-input"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="设备告警:" prop="value2" class="fromitem">
                <el-date-picker
                  v-model="query.value2"
                  type="datetimerange"
                  size="medium"
                  :picker-options="registrationtime"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="datebf"
                  align="right"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item class="fromitem">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="getData"
                  style="margin-right:10px;"
                  >查询</el-button
                >
                <el-button
                  @click="resetForm('query')"
                  style="width:73px;margin:0px;"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
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
              prop="devicenumnameid"
              label="设备ID"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="devicesite"
              label="设备地址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="policemessage"
              label="告警信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="policetime"
              label="告警时间"
              align="center"
            ></el-table-column>
            <el-table-column label="处理状态" align="center">
              <template slot-scope="scope">
                <el-tag v-if="tableData[scope.$index].disposestate == '1'"
                  >已处理</el-tag
                >
                <el-tag
                  type="danger"
                  v-if="tableData[scope.$index].disposestate == '0'"
                  >未处理</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >详情</el-button
                >
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >处理</el-button
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
  </div>
</template>
<script>
import Axios from "axios";
export default {
  name: "usercontrol",
  data() {
    return {
      query: {
        name: "",
        username: "",
        pageIndex: 1,
        pageSize: 10,
        value2: "",
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        }
      },
      pageTotal: 0,
      tableData: [],
      devicenumnameid: "",
      devicenumname: "",
      registrationtime: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      //   page = page ? page : this.pageNow;
      //   size = size ? size : this.size;
      Axios.get("/szlbackgroundprogram/device/CallpoliceList", {
        params: {
          //   page: page,
          //   pageSize: size,
          devicenumnameid: that.devicenumnameid,
          devicenumname: that.devicenumname,
          registrationtime: that.registrationtime
        }
      }).then(response => {
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
  margin-left: -75px;
  margin-top: 30px;
}
.table {
  font-size: 16px;
}
</style>
