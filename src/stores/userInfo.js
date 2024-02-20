import { defineStore } from "pinia";

export const useUserInfoStore=defineStore('userInfo',{
    state:()=>({
        username:"Muziyami",
        avatar:"/img/avatar/Head_yuyuko_Qiqi.png",
        isLogin:true,
        lang:"简体中文"
    }),
    actions:{
        changeLogState(){
            this.isLogin=!this.isLogin;
        },
        changeLanguage(lang){
            this.lang=lang;
        }
    }
    
});

export default useUserInfoStore;