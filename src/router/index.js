import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);
export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/statisticanalysis'
    },
    {
      path:'/',
      component:() => import('../components/common/Home.vue'),
      meta:{title:'自述文件'},
      children:[
        {
          path:'/statisticanalysis',
          component:() => import('../components/page/statisticanalysis.vue'),
          meta:{title:'统计分析'}
        },{
          path:'/usercontrol',
          component:() => import('../components/page/Usercontrol.vue'),
          meta:{title:'用户管理'}
        },{
          path:'/authoritycontrol',
          component:() => import('../components/page/Authoritycontrol.vue'),
          meta:{title:'权限管理'}
        },{
          path:'/equipment',
          component:() => import('../components/page/Equipment.vue'),
          meta:{title:'设备'}
        },{
          path:'/ecallthepolice',
          component:() => import('../components/page/Ecallthepolice.vue'),
          meta:{title:'设备告警'}
        }
        ,{
          path:'/pinformationinput',
          component:() => import('../components/page/Pinformationinput.vue'),
          meta:{title:'人员信息'}
        }
       ,{
          path:'/Accessto',
          component:() => import('../components/page/Accessto.vue'),
          meta:{title:'人员出入信息'}
        }


        ,{
          path:'/carpinformationinput',
          component:() => import('../components/page/Carinformationinput.vue'),
          meta:{title:'车辆信息'}
        },{
          path:'/Carout',
          component:() => import('../components/page/Carout.vue'),
          meta:{title:'车辆出入信息'}
        }
        ,{
          path:'/houseinformation',
          component:() => import('../components/page/Houseinformation.vue'),
          meta:{title:'房屋信息'}
        }
        ,{
          path:'/notification',
          component:() => import('../components/page/Notification.vue'),
          meta:{title:'通知配置'}
        }
        ,{
          path:'/propertypaycost',
          component:() => import('../components/page/Propertypaycost.vue'),
          meta:{title:'物业缴费'}
        }
        ,{
          path:'/propertywarranty',
          component:() => import('../components/page/Propertywarranty.vue'),
          meta:{title:'物业保修'}
        }
      ]
    },
    {
      path:'/login',
      component:()=>import(/*登录页面*/ '../components/page/Login.vue'),
      meta:{title:'登录'}
    }
  ]
});

// const routes = [
//   {
//     path: '/',
//     name: 'login',
//     component: login
//   },
//   {
//     path: '/login',
//     name: 'aa',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../components/page/Login.vue')
//   }
// ]


// const router = new VueRouter({
//   routes
// })

// export default router
