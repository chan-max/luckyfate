import { useEventBus } from "@vueuse/core";




// 搜索类型改变时触发
export const searchTypeEventBus = useEventBus('searchType')

// 点击搜索按钮时触发
export const searchClickEventBus = useEventBus('searchClick')


