<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          房屋信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-row type="flex" class="row-bg topdiv" justify="center">
          <el-col :span="6">
            <div class="divone">
              <span class="spanone">
                <p><i class="i_one">2780</i>/<i class="i_two">2901</i></p>
                <p><i class="i_three"></i><i class="i_four">在使用房屋量</i></p>
              </span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="divone">
              <span class="spanone">
                <p><i class="i_one">2780</i>/<i class="i_two">2666</i></p>
                <p><i class="i_three"></i><i class="i_four">出租房数量</i></p>
              </span>
            </div>
          </el-col>
          <el-col :span="7">
            <el-form
              :model="query"
              ref="query"
              label-position="left"
              label-width="auto"
              class="demo-ruleForm form_css"
            >
              <div>
                <el-form-item
                  label="居主人姓名:"
                  size="medium"
                  prop="name"
                  class="fromitem"
                  style="font-size:18px large"
                >
                  <el-input
                    v-model="personnelname"
                    placeholder="请输入姓名"
                    class="handle-input "
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="房屋编号:"
                  size="medium"
                  prop="usernuber"
                  class="fromitem"
                >
                  <el-input
                    v-model="housenumber"
                    placeholder="请输入编号"
                    class="handle-input "
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
              <div>
                <el-button
                  type="primary"
                  style="margin:0px 0 10px 0"
                  icon="el-icon-search"
                  @click="getData()"
                  >查询</el-button
                >
                <el-button style="margin-left:0px" @click="resetForm('query')"
                  >重置</el-button
                >
              </div>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" class="tablecol">
          <el-table
            :data="tableData"
            class="table"
            border
            header-cell-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              prop="personnelname"
              label="居住姓名"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="住址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="housenumber"
              label="房屋编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="housetype"
              label="房屋类型"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="register"
              label="居住人户籍"
              align="center"
            ></el-table-column>
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
        address: "",
        census: "",
        platenumber: "",
        pageIndex: 1,
        pageSize: 5
      },
      personnelname: "",
      housenumber: "",

      pageTotal: 0,
      tableData: []
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
      Axios.get("/szlbackgroundprogram/vehicle/housingList", {
        params: {
          //   page: page,
          //   pageSize: size,
          personnelname: this.personnelname,
          housenumber: this.housenumber
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
  margin-left: 20px;
  margin-top: 20px;
}
.table {
  font-size: 16px;
}
.topdiv .el-input {
  width: 150px;
}
.button_css .el-button {
  font-size: 16px;
  width: 85px;
}
.topdiv {
  height: 100px;
  margin-bottom: 20px;
}
.divone {
  height: 100%;
  width: 80%;
  text-align: center;
  border: 1px solid #eee;
}
.spanone {
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 22px;
}
.i_one {
  font-size: 29px;
}
.i_three {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: blue;
  border-radius: 50%;
  margin: 4px 5px 2px 10px;
}
.i_four {
  font-size: 20px;
}
.form_css {
  display: flex;
  justify-content: center;
}
.form_css .el-button {
  width: 100px;
  height: 42px;
}
</style>
