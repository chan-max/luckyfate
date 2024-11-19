
import { useLoginStatusStore } from "@/common/store/login"
import { ElMessage } from 'element-plus'
import { message } from 'ant-design-vue'
import { doLogout } from "@/common/store/login"
import { useRouter } from "vue-router";



/*
   保存token
*/
export const tokenResponseInterceptor = (response) => {
    let loginStore = useLoginStatusStore();
    if (response.headers.authorization) {
        loginStore.token = response.headers.authorization
    }
    return response;
}

export const tokenRequestInterceptor = (request) => {
    let loginStore = useLoginStatusStore();
    if (loginStore.token) {
        request.headers.authorization = `Bearer ${loginStore.token}`;
    }
    return request
}


export const defaultResponseInterceptors = (response) => {

    if (response?.data?.code === 400) {
        message.error(response.data.message)
        return Promise.reject()
    }

    // 无权限
    if (response?.data?.code === 401) {
        let loginStore = useLoginStatusStore()
        loginStore.logout()
        message.error('please login')
        return Promise.reject()
    }

    if (response.data.code == 0) {
        return response
    }

    message.error(response?.data?.message)
    throw new Error(response)
}

