<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          设备
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
            <el-col :span="5">
              <el-form-item
                prop="devicenameid"
                class="fromitem"
                style="font-size:18px large"
                :span="6"
              >
                <el-select
                  style="width:300px;"
                  :popper-append-to-body="false"
                  size="medium"
                  v-model="query.devicenameid"
                  class="select_box"
                  placeholder="请选择设备"
                  clearable
                >
                  <el-option
                    prop="devicenameid"
                    v-for="item in typeList"
                    :key="item.devicenameid"
                    :label="item.cname"
                    :value="item.devicenameid"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <div class="shuju">
                <span>
                  <p>全部设备</p>
                  <p>6851</p>
                </span>
                <span>
                  <p>在线</p>
                  <p>6751</p>
                </span>
                <span>
                  <p>离线</p>
                  <p>100</p>
                </span>
                <span>
                  <p>未启用</p>
                  <p>0</p>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <el-form-item class="fromitem" :span="6">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="handleSearch"
                  >刷新</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-row type="flex" class="row-bg chaxun" justify="center">
          <el-col :span="5">
            <div>
              <el-input
                placeholder="请输入"
                v-model="query.devicenumname"
                class="input-with-select"
                style="width:300px"
                clearable
              >
                <el-select
                  size="medium"
                  v-model="query.deviceid"
                  clearable
                  slot="prepend"
                  placeholder="设备ID"
                  class="bangding"
                >
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="00001" value="1"></el-option>
                  <el-option label="00002" value="2"></el-option>
                  <el-option label="00003" value="3"></el-option>
                </el-select>
              </el-input>
            </div>
          </el-col>
          <el-col :span="13">
            <el-button
              class="xjbutton"
              type="primary"
              icon="el-icon-search"
              @click="getData"
              >查询</el-button
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
            <el-table-column type="selection"></el-table-column>
            <el-table-column
              prop="devicenumname"
              label="ID"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="devicesite"
              label="设备地址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="theircommunity"
              label="所属小区"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="registrationtime"
              label="注册时间"
              align="center"
            ></el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <p v-if="tableData[scope.$index].status == '0'">在线</p>
                <p type="danger" v-if="tableData[scope.$index].status == '1'">
                  离线
                </p>
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
  name: "authoritycontrol",
  data() {
    return {
      query: {
        devicenameid: "",
        deviceid: "",
        devicenumname: "",
        pageIndex: 1,
        pageSize: 10
      },
      pageTotal: 0,
      typeList: [
        { devicenameid: 0, cname: "全部" },
        { devicenameid: 1, cname: "入口摄像头" },
        { devicenameid: 2, cname: "车辆识别设备" },
        { devicenameid: 3, cname: "头盔识别设备" }
      ],
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
      Axios.get("/szlbackgroundprogram/device/deviceList", {
        params: {
          //   page: page,
          //   pageSize: size,
          devicenameid: that.devicenameid,
          deviceid: that.query.deviceid,
          devicenumname: that.query.devicenumname
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

.table {
  font-size: 16px;
}
.select_box input {
  height: 50px;
  height: 20px;
  line-height: 20px;
}
.shuju {
  display: flex;
  justify-content: space-around;
  margin: 0 0 10px 0;
}
.shuju p {
  font-size: 18px;
  margin: 0 0 10px 0;
  text-align: center;
}
.bangding .el-input {
  width: 100px;
}
.chaxun {
  margin-top: 20px 0 40px 0;
}
</style>
