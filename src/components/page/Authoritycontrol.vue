<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          权限管理
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
            <el-col :span="6">
              <el-form-item
                label="ID:"
                prop="name"
                class="fromitem"
                style="font-size:18px large"
                :span="6"
              >
                <el-input
                  v-model="query.name"
                  placeholder="请输入ID"
                  class="handle-input "
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="名称:"
                prop="usernuber"
                class="fromitem"
                :span="6"
              >
                <el-input
                  v-model="query.usernuber"
                  placeholder="名称"
                  class="handle-input "
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="fromitem" :span="6">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="handleSearch"
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
              @click="handleSearch"
              >新建</el-button
            >
          </el-col>
        </el-row>
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
              prop="name"
              label="ID"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="modulename"
              label="名称"
              align="center"
            ></el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="
                    scope.row.state === '成功'
                      ? 'success'
                      : scope.row.state === '失败'
                      ? 'danger'
                      : ''
                  "
                  >{{ scope.row.state }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >授权</el-button
                >
                <el-button
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)"
                  >禁用</el-button
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
export default {
  name: "authoritycontrol",
  data() {
    return {
      query: {
        name: "",
        username: "",
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      tableData: [
        {
          name: "admin",
          modulename: "权限分配",
          state: "启用",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          modulename: "大屏管理",
          state: "启用",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          name: "王小虎",
          modulename: "设备告警",
          state: "启用",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          name: "王小虎",
          modulename: "设备数据API",
          state: "启用",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          name: "王小虎",
          modulename: "访问日志",
          state: "启用",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          name: "王小虎",
          modulename: "用户管理",
          state: "启用",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //console.log(res);
      // this.tableData = res.list;
      // this.pageTotal = res.pageTotal || 50;
      this.pageTotal = this.tableData.length;
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
}
.table {
  font-size: 16px;
}
</style>
