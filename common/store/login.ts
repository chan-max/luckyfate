import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import Api from '@/common/api/axios'
import { to } from 'await-to-js'

export const doLoginAction = (data: any, once = false) => {
    // 保存登录时间
    const now = new Date().getTime();
    const { token } = data

    // 同步用户信息
    const loginStatusStore = useLoginStatusStore();
    loginStatusStore.isLogin = true;
    loginStatusStore.loginTime = now;
    loginStatusStore.once = once;
    loginStatusStore.token = token;
    loginStatusStore.getUserInfo()
};



export const doLogout = async () => {
    await Api.logout();
    const loginStatusStore = useLoginStatusStore();
    loginStatusStore.isLogin = false;
    loginStatusStore.userInfo = null;
    loginStatusStore.loginTime = null;
};

export const useLoginStatusStore = defineStore("login_status", () => {

    const isLogin = ref(false);
    const loginTime = ref();
    const userInfo = ref();
    const token = useLocalStorage('token', '');
    const once = ref();
    const isAdmin = ref(false);


    if (token.value) {
        isLogin.value = true
    }

    async function getUserInfo() {
        const loginStore = useLoginStatusStore()
        const res = await Api.getUserInfo() as any
        const _userInfo = res.data
        if (_userInfo) {
            userInfo.value = _userInfo
            loginStore.isAdmin = _userInfo.isAdmin
            isLogin.value = true
        } else {
            isLogin.value = false
        }
    }


    // getUserInfo()改为在启动程序时调用

    function logout() {
        isLogin.value = false
        userInfo.value = null
        token.value = null
    }

    return {
        isLogin, //
        userInfo,
        loginTime,
        token,
        once,
        isAdmin,
        logout,
        getUserInfo
    };
});


export async function initLoginStoreUserInfo() {
    const loginStore = useLoginStatusStore()

    if (loginStore.isLogin) {
        let [err, res] = await to(loginStore.getUserInfo())
    }
}