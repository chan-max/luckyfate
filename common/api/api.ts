import { useFetch } from "#app";

export enum GameApi {
    GetCategories = '/api/v1/categories', // 获取获取所有的分类列表
    GetDimensions = '/api/v1/dimensions', // 获取游戏纬度尺寸
    GetGames = '/api/v1/games', // 获取所有游戏
    GetGameByID = '/api/v1/games',// 根据id获取游戏
    GetRandomGames = 'api/v1/random', // 获取随机游戏
    SearchGames = '/api/v1/search', // 搜索游戏
    GetTags = '/api/v1/tags', // 获取 标签
    GetTopCategories = '/api/v1/topCategories' // 获取顶部分组
}




/**
  * @api 获取分类列表
  * @param 无
  */
function getCategories() {
    return useApiFetch(GameApi.GetCategories, {

        onResponse({ response }) {
            // 分类有空的情况
            response._data = response._data?.filter(Boolean)
        },
    })
}

/**
  * @api 获取尺寸列表
  * @param 无
  */
function getDimensions() {
    return useApiFetch(GameApi.GetDimensions)
}

interface GetGamesParams {
    category?: string,
    tags?: string,
    page?: number,
    pageSize?: number
}
/**
  * @api 获取游戏列表
  * @param 无
  * @returns 
  */
function getGames(params: GetGamesParams) {

    let _params = {
        category: params.category,
        tags: params.tags,
        page: params.page || 1,
        pageSize: params.pageSize || 12
    }

    return useApiFetch(GameApi.GetGames, { params: _params })
}


/**
  * @api 根据id获取游戏信息
  * @param 无
  * @returns 
  */

interface GetGamesByIDParams {
    id: string
}

function getGamesById(params: GetGamesByIDParams) {
    return useApiFetch(GameApi.GetGameByID + '/' + params.id)
}



/**
  * @api 获取随机游戏
  * @param 无
  * @returns 
  */

interface GetGamesRandomParams {
    count?: number,
    category?: string
}

function getRandomGames(params: GetGamesRandomParams) {
    return useApiFetch(GameApi.GetRandomGames, { params })
}




interface SearchGamesParams {
    title?: string,
    category?: string,
    tags?: string,
    page?: number,
    pageSize?: number
}

/**
  * @api 搜索游戏并获取列表
  * @param 无
  * @returns 
  */
function searchGames(params: SearchGamesParams) {

    let _params = {
        title: params.title,
        category: params.category,
        tags: params.tags,
        page: params.page || 1,
        pageSize: params.pageSize || 12
    }

    return useApiFetch(GameApi.SearchGames, { params: _params })
}



/**
  * @api 获取所有标签
  * @param 无
  * @returns 
  */
function getTags() {
    return useApiFetch(GameApi.GetTags)
}



interface GetTopCategoriesParams {
    count?: number
}
/**
  * @api 获取热门分类
  * @param 无
  * @returns 
  */
function getTopCategories(params?: GetTopCategoriesParams) {
    return useApiFetch(GameApi.GetTopCategories, { params })
}

export default {
    getCategories,
    getDimensions,
    getGames,
    getGamesById,
    getRandomGames,
    searchGames,
    getTags,
    getTopCategories
}


export function useApiFetch<T>(
    url: string,
    options?: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        params?: Record<string, any>;
        body?: Record<string, any>;
        headers?: Record<string, string>;
    }
) {
    const config = useRuntimeConfig();

    // 设置默认的头部字段
    const defaultHeaders = {
        'x-api-key': config.public.apiKey, // 从配置中读取密钥
        ...options?.headers, // 合并用户传入的头部
    };

    return useFetch<T>(url, {
        baseURL: config.public.apiURL, // 动态读取 API 基础地址
        method: options?.method || 'GET', // 默认get
        headers: defaultHeaders,
        params: options?.params,
        body: options?.body,
        onResponse: options?.onResponse,
        onRequestError({ request, options, error }) {
            // 处理请求错误
            console.error('请求错误：', error);
        },
        onResponseError({ response }) {
            // 处理响应错误
            console.error('响应错误：', response);
        },
    });
}
