import { defineStore, storeToRefs } from "pinia";

export const useUserInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      isLogin: false,
      lang: "简体中文",
      data: null,
    };
  },
  persist:true,
  actions: {
    changeLogState() {
      this.isLogin = !this.isLogin;
    },
    changeLanguage(lang) {
      this.lang = lang;
    },
    getUserData(data) {
      this.data = data;
    },
  },
});

export default useUserInfoStore;
