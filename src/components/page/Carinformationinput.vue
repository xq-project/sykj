<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          车辆信息
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
          <el-row type="flex" class="row-bg carrow" justify="center">
            <el-col :span="8">
              <el-form-item
                label="车主姓名:"
                prop="personnelname"
                class="fromitem"
                style="font-size:18px large"
                :span="6"
              >
                <el-input
                  v-model="query.personnelname"
                  size="medium"
                  placeholder="请输入姓名"
                  class="handle-input "
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="住址:"
                prop="address"
                class="fromitem"
                :span="6"
              >
                <el-input
                  v-model="query.address"
                  size="medium"
                  placeholder="请输入地址"
                  class="handle-input "
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
              <el-form-item
                label="车牌号码:"
                prop="platenumber"
                class="fromitem"
                :span="6"
              >
                <el-input
                  v-model="query.platenumber"
                  size="medium"
                  placeholder="没有可填无"
                  class="handle-input"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item class="" :span="6">
                <el-button type="primary" @click="getData">查询</el-button>
                <el-button @click="resetForm('query')">重置</el-button>
                <el-button size="small" class="plxxdr" type="primary"
                  >批量信息导入</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24" class="tablecol">
          <el-table
            :data="tableData"
            class="table"
            border
            header-cell-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              prop="personnelname"
              label="车主姓名"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="住址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="plateNumber"
              label="车牌"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shootaddress"
              label="拍摄地点"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="platecolor"
              label="车牌颜色"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="vehiclecolor"
              label="车身颜色"
              align="center"
            ></el-table-column>

            <el-table-column
              prop="createtime"
              label="抓拍时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="vehiclemodel"
              label="车型"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="autologos"
              label="车标"
              align="center"
            ></el-table-column>

            <el-table-column label="操作" align="center">
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
  </div>
</template>
<script>
import Axios from "axios";
export default {
  name: "usercontrol",
  data() {
    return {
      query: {
        personnelname: "",
        address: "",
        platenumber: "",
        pageIndex: 1,
        pageSize: 5
      },
      pageTotal: 0,
      tableData: []
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
      Axios.get("/szlbackgroundprogram/vehicle/vehicleList", {
        params: {
          //   page: page,
          //   pageSize: size,
          personnelname: that.query.personnelname,
          address: this.query.address,
          platenumber: this.query.platenumber
        }
      }).then(response => {
        //   if (response.code == "1" && response.msg == "SUCCSSS") {
        that.tableData = response.data.list;
        that.total = response.data.total;
        that.page = response.data.pages;

        //   }
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
  margin-left: 20px;
  margin-top: 20px;
}
.table {
  font-size: 16px;
}
.carrow .el-input {
  width: 280px;
  height: 45px;
}
.button_css .el-button {
  font-size: 16px;
  width: 95px;
}
.button_css .plxxdr {
  width: 150px;
}
.el-upload--text {
  display: none;
}
.buttonblak {
  display: block;
}
</style>
