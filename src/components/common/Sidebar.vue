<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-data-analysis",
          index: "statisticanalysis",
          title: "统计分析"
        },
        {
          icon: "el-icon-setting",
          index: "table",
          title: "系统设置",
          subs: [
            {
              index: "usercontrol",
              title: "用户管理"
            },
            {
              index: "authoritycontrol",
              title: "权限管理"
            }
          ]
        },
        {
          icon: "el-icon-s-platform",
          index: "2",
          title: "设备管理",
          subs: [
            {
              index: "equipment",
              title: "设备"
            },
            {
              index: "ecallthepolice",
              title: "设备告警"
            }
          ]
        },
        {
          icon: "el-icon-postcard",
          index: "3",
          title: "电子档案",
          subs: [
            {
              index: "Pinformationinput",
              title: "人员信息",
              subs: [
                {
                  index: "Pinformationinput",
                  title: "人员信息"
                },
                {
                  index: "Accessto",
                  title: "人员出入信息"
                }
              ]
            },
            {
              index: "carpinformationinput",
              title: "车辆信息",
              subs: [
                {
                  index: "carpinformationinput",
                  title: "车辆信息"
                },
                {
                  index: "Carout",
                  title: "车辆出入信息"
                }
              ]
            },
            {
              index: "houseinformation",
              title: "房屋信息"
            }
          ]
        },
        {
          icon: "el-icon-chat-line-square",
          index: "notification",
          title: "通知管理",
          subs: [
            {
              index: "notification",
              title: "通知配置"
            }
          ]
        },
        {
          icon: "el-icon-s-shop",
          index: "propertypaycost",
          title: "便民管理",
          subs: [
            {
              index: "propertypaycost",
              title: "物业缴费"
            },
            {
              index: "propertywarranty",
              title: "物业保修"
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
