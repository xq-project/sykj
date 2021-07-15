<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          物业保修
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="20" class="tablecol">
          <div class="pheaddiv">
            <span class="pjlspancss">物业保修记录</span>
            <span class="pdatespandiv">
              <el-date-picker
                v-model="search"
                @clear="getData()"
                :clear="getData()"
                @keydown.enter.native="getData()"
                clearable
                type="date"
                @blur="onInputBlur"
                placeholder="选择日期"
              >
              </el-date-picker>
            </span>
          </div>
          <el-table
            :data="
              tableData.filter(
                data =>
                  !aa ||
                  data.repairstime
                    .toLowerCase()
                    .includes(aa.toString().toLowerCase())
              )
            "
            class="table"
            border
            header-cell-class-name="table-header"
            style="width: 100%"
          >
            <el-table-column
              prop="repairsperison"
              label="报修人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="住址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="phonenumber"
              label="联系电话"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="content"
              label="报修内容"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="img"
              label="图片"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="repairstime"
              label="保修时间"
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
      search: "",
      aa: "-",
      pageTotal: 0,
      tableData: []
    };
  },
  created() {
    console.log(this.search);
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      //   page = page ? page : this.pageNow;
      //   size = size ? size : this.size;
      Axios.get("/szlbackgroundprogram/repairs/repairsList", {
        // params: {
        //   page: page,
        //   pageSize: size,
        //   username: this.usernames,
        //   usernuber: this.usernubers
        // }
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
    },
    onInputBlur() {
      if (this.search) {
        var month = this.search.getMonth() + 1;
        var dates = this.search.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (dates < 10) {
          dates = "0" + dates;
        }
        this.aa = this.search.getFullYear() + "-" + month + "-" + dates;
        console.log(this.aa);
      }
      if (
        this.search == "" ||
        this.search == null ||
        this.search == undefined
      ) {
        this.aa = "";
      }
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
.propertyrow .el-input {
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
.pheaddiv {
  background: #eee;

  padding: 10px 30px 15px 20px;
}
.pjlspancss {
  font-size: 22px;
  padding-top: 5px;
  margin-top: 5px;
}
.pdatespandiv {
  float: right;
}
</style>
