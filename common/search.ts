


// 搜索的字段种类
export enum SearchTypes {
    Title = 'title',
    Category = 'category',
    Tags = 'tags',
}

export const searchType = ref(SearchTypes.Title)


// 搜索内容
export const searchContent = ref('')

