
import l, { Lunar } from 'lunar-javascript';


// // 自定义 "吻语言" 包
// const customLang = {
//     months: [
//         "吻一月", "吻二月", "吻三月", "吻四月", "吻五月", "吻六月",
//         "吻七月", "吻八月", "吻九月", "吻十月", "吻十一月", "吻十二月"
//     ],
//     days: [
//         "吻初一", "吻初二", "吻初三", "吻初四", "吻初五", "吻初六", "吻初七",
//         "吻初八", "吻初九", "吻初十", "吻十一", "吻十二", "吻十三", "吻十四",
//         "吻十五", "吻十六", "吻十七", "吻十八", "吻十九", "吻二十", "吻廿一",
//         "吻廿二", "吻廿三", "吻廿四", "吻廿五", "吻廿六", "吻廿七", "吻廿八",
//         "吻廿九", "吻三十"
//     ],
//     // 自定义宜忌内容
//     good: "吻适宜", // 原本是 "宜"
//     bad: "吻不宜", // 原本是 "忌"
//     zodiacs: [
//         "吻鼠", "吻牛", "吻虎", "吻兔", "吻龙", "吻蛇",
//         "吻马", "吻羊", "吻猴", "吻鸡", "吻狗", "吻猪"
//     ]
// };


// l.I18n.setLanguage('en')


/**
 * 获取阳历中文
 * @param date 输入的日期（Date 类型）
 * @returns 阳历中文字符串
 */
export function getSolarChinese(val: any = new Date()): string {
    var date = new Date(val)
    const solar = Lunar.fromDate(date).getSolar();
    return `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日`;
}


/**
 * 获取阴历中文
 * @param date 输入的日期（Date 类型）
 * @returns 阴历中文字符串
 */
export function getLunarChinese(val: any = new Date()): string {
    const date = new Date(val)
    const lunar = Lunar.fromDate(date);
    return `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
}


import { Lunar } from "lunar-javascript";

/**
 * 获取今日宜和今日忌
 * @param date 输入的日期（Date 类型）
 * @returns 包含今日宜和今日忌的对象
 */
export function getDailyGoodThings(date: Date = new Date()) {
    // 将日期转换为 Lunar 实例
    const lunar = Lunar.fromDate(date);

    // 今日宜
    const goodThings = lunar.getDayYi(); // Array of "宜" activities


    return goodThings
}


export function getDailyBadThings(date: Date = new Date()) {
    // 将日期转换为 Lunar 实例
    const lunar = Lunar.fromDate(date);

    // 今日宜
    const badThings = lunar.getDayJi(); // Array of "忌" activities

    return badThings
}


// 今日忌



export default Lunar