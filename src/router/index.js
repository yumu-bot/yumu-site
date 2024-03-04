import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { message } from "ant-design-vue";
import i18n from "../language";
let userInfo;

const routes = [
  {
    path: "/",
    redirect: "/home", //重定向
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Yumu Site | 主页",
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../components/HomeContent.vue"),
        meta: {
          title: "Yumu Site | 主页",
        },
      },
      {
        path: "/function",
        name: "function",
        component: () => import("../views/Function/Function.vue"),
        meta: {
          title: "Yumu Site | 功能",
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue"),
        meta: {
          title: "Yumu Site | 关于",
        },
      },
      {
        path: "/info",
        name: "info",
        component: () => import("../views/Info.vue"),
        meta: {
          title: "Yumu Site | 个人信息",
        },
        beforeEnter: (to, from) => {
          getUserInfo();
          // 未经登录不能进入个人主页
          if (!userInfo.isLogin) {
            router.push(from);
            message.warning(i18n.global.t("notification.notLogin"));
            return false;
          }
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 更新用户状态
function getUserInfo() {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
};
// 路由守卫
router.beforeEach((to, from, next) => {
  // 动态切换每个页面的标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 个人主页权限验证
  if (to.name === "login" || from.name === "login") {
    getUserInfo();
    if (!userInfo.isLogin) {
      router.push("home");
    };
  };
  next();
});
// 后置钩子
// router.afterEach((to,from)=>{
//   console.log("afterRouter");
// })

export default router;
