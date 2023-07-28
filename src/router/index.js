import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    redirect:"/home",//重定向
    component: () => import("../views/Home.vue"),
    meta: {
      title: "yumu site | 主页",
    },
    children: [
    {
        path: "/home",
        name:"home",
        component: () => import("../components/HomeContent.vue"),
        meta: {
          title: "yumu site | 主页"
        }
      }, {
        path: "/function",
        name:"function",
        component: () => import("../views/Function/Function.vue"),
        meta: {
          title:"yumu site | 功能"
        }
      },
      {
        path: "/about",
        name:"about",
        component: () => import("../views/About.vue"),
        meta: {
          title: "yumu site | 关于"
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 动态切换每个页面的标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router
