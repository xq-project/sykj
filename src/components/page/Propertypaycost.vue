<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          物业缴费
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
          <el-row type="flex" class="row-bg porperrow" justify="center">
            <el-col :span="8">
              <el-form-item
                label="姓名:"
                prop="personnelname"
                class="fromitem"
                style="font-size:18px large"
                :span="6"
              >
                <el-input
                  v-model="personnelname"
                  placeholder="请输入姓名"
                  class="handle-input "
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="住址:"
                prop="address"
                style="font-size:18px large"
                :span="6"
              >
                <el-input
                  placeholder="请输入地址"
                  v-model="query.address"
                  class="input-with-select"
                  style="width:280px"
                >
                  <el-select
                    size="medium"
                    v-model="query.selectsa"
                    clearable
                    style="width:80px"
                    slot="append"
                    placeholder="全部"
                    class="bangding"
                  >
                    <el-option label="一区" value="1"></el-option>
                    <el-option label="二区" value="2"></el-option>
                    <el-option label="三区" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="18">
              <el-form-item prop="platenumber" class="fromitem" :span="6">
                <el-button
                  type="primary"
                  @click="handleSearch"
                  style="width:100px;font-size:18px"
                  >查询</el-button
                >
                <el-button
                  @click="resetForm('query')"
                  style="width:100px;font-size:18px"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" class="tablecol">
          <div class="headdiv">
            <span class="jlspancss">缴费记录</span>
            <span class="datespandiv">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </span>
          </div>
          <el-table
            :data="tableData"
            class="table"
            border
            header-cell-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              prop="personnelname"
              label="业主姓名"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="住址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="personnelphone"
              label="联系电话"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="buildingarea"
              label="建筑面积"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="rates"
              label="收费标准"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="totalamount"
              label="收费总计"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="chargingsituation"
              label="收费情况"
              align="center"
            ></el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  >处理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 5, 8, 10]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
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
        personnelphone: "",
        buildingarea: "",
        rates: "",
        totalamount: "",
        chargingsituation: "",
        pageIndex: 1,
        pageSize: 5,
        selectsa: 1,
        url: null // 下拉框的值
      },
      personnelname: "",
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableDataEnd: [],
      value1: "",
      list: [
        { label: "测试1", value: 1 },
        { label: "测试2", value: 2 },
        { label: "测试3", value: 3 },
        { label: "测试4", value: 4 }
      ],
      pageTotal: 0,
      tableData: []
    };
  },
  created() {
    this.total = this.tableData.length;
    if (this.total > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableData[index]);
      }
    } else {
      this.tableDataEnd = this.tableData;
    }
    this.getData();
  },

  methods: {
    getData() {
      let that = this;
      //   page = page ? page : this.pageNow;
      //   size = size ? size : this.size;
      Axios.get("/szlbackgroundprogram/repairs/paycostList", {
        // params: {
        //   page: page,
        //   pageSize: size,
        //   username: this.usernames,
        //   usernuber: this.usernubers
        // }
      }).then(response => {
        debugger;
        that.tableData = response.data.list;
        that.total = response.data.total;
        that.page = response.data.pages;
      });
    },
    handleSizeChange: function(pageSize) {
      // 每页条数切换
      this.pageSize = pageSize;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function(currentPage) {
      //页码切换
      this.currentPage = currentPage;
      this.currentChangePage(this.tableData, currentPage);
    },
    //分页方法（重点）
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    },
    //查询按钮
    handleSearch() {
      var name = this.query.name;
      var address = this.query.address;
      var selectsa = this.query.selectsa;
      // if (name||address||selectsa) {
      return this.tableData.filter(data => {
        return Object.keys(data).some(key => {
          return (
            String(data[key])
              .toLowerCase()
              .indexOf(name || address || selectsa) > -1
          );
        });
      });
      //}
      this.$set(this.query, "pageIndex", 1);
      console.log("联合");
      return this.tableData;
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
    // 失焦后清空下拉框的值
    getValue() {
      this.url = null;
    },
    changInput(value) {
      this.$forceUpdate(); // 用于层级深的时候input输入没有反应刷新
      this.dataDetail.url = value; // 刷新后赋值
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
.fromitem .el-input {
  width: 280px;
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
  /* position: absolute; */
}
.headdiv {
  background: #eee;

  padding: 10px 30px 15px 20px;
}
.jlspancss {
  font-size: 22px;
  padding-top: 5px;
  margin-top: 5px;
}
.datespandiv {
  float: right;
}
</style>
