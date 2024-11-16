import { ref } from "vue";

export const useGamePagination = (fetchApi: any, preprocessParams?: any) => {
    // 数据状态
    const list = ref([]); // 所有游戏数据
    const page = ref(1); // 当前页码
    const pageSize = ref(12); // 每页大小
    const total = ref(0); // 数据总量

    // 状态管理
    const loading = ref(false); // 是否正在加载
    const isEmpty = ref(false); // 是否为空数据
    const isLastPage = ref(false); // 是否最后一页
    const canLoadMore = ref(false); // 是否可以继续加载

    // 加载列表数据
    const getList = async () => {
        if (loading.value || isLastPage.value) return; // 防止重复加载
        loading.value = true;

        try {
            // 调用参数预处理钩子，动态生成请求参数
            const params = preprocessParams
                ? preprocessParams({ page: page.value, pageSize: pageSize.value })
                : { page: page.value, pageSize: pageSize.value };

            const { data } = await fetchApi(params);
            const response = data.value;

            const { games, total: newTotal } = response;

            // 更新数据状态
            if (games && games.length > 0) {
                list.value = [...list.value, ...games];
                total.value = newTotal;
                page.value += 1;
            }

            // 更新状态管理
            isEmpty.value = total.value === 0;
            isLastPage.value = list.value.length >= total.value; // 检查已加载数据是否达到总数据量
            canLoadMore.value = !isLastPage.value; // 是否可以继续加载
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            loading.value = false;
        }
    };

    // 重置分页（用于重新加载）
    const resetPagination = () => {
        list.value = [];
        page.value = 1;
        total.value = 0;
        isEmpty.value = false;
        isLastPage.value = false;
        canLoadMore.value = false;
    };

    return {
        list, // 数据列表
        total, // 总结果数量
        loading, // 是否正在加载
        isEmpty, // 是否为空数据
        isLastPage, // 是否为最后一页
        canLoadMore, // 是否可以继续加载
        getList, // 加载数据方法
        resetPagination, // 重置分页
    };
};
