// 引入
import lunisolar from 'lunisolar'
import en from 'lunisolar/locale/en'

import theGods from 'lunisolar/plugins/theGods'
import theGodsZh from 'lunisolar/plugins/theGods/locale/zh'



// 加载插件
lunisolar.extend(theGods)

lunisolar.locale(en)

export function useLunisolar() {
    // 使用
    const d = lunisolar()

    // --- format ---

    d.format('lY年 lM(lL)lD lH時')  // 可取得阴历日期 '二〇二二年 六月(大)二十 未時'
    d.format('cY cM cD cH')  // 可取得八字：'壬寅 丁未 壬申 丁未'
    d.format('YYYY-MM-DD HH:mm:ss') // 2022-07-18 14:40:00

    // --- 阴历--- 

    console.log(d.lunar.toString())  // 二〇二二年六月二十未時
    console.log(`${d.lunar}`) // 二〇二二年六月二十未時
    d.lunar.year // 2022
    d.lunar.getYearName() // 二〇二二
    d.lunar.month // 6 （如果是闰六月会返回106）
    d.lunar.getMonthName() // 六月
    d.lunar.day // 20
    d.lunar.getDayName() // 二十
    d.lunar.hour // 7 （返回从0开始算的时辰下标）
    d.lunar.getHourName() // 未
    console.log(d.lunar.isLeapMonth) // false (是否闰月)

    // --- 八字 ----

    console.log(`${d.char8}`) // 壬寅 丁未 壬申 丁未
    d.char8.year.toString() // 壬寅  （取得年柱）
    d.char8.month.toString() // 丁未  （取得月柱）
    d.char8.day.toString() // 壬申 （取得日柱）
    d.char8.hour.toString() // 丁未  （取得时柱）
    d.char8.year.stem.toString() // 壬 (年柱天干)
    d.char8.year.branch.toString() // 寅  (年柱地支)
    d.char8.year.branch.hiddenStems // [甲, 丙, 戊]  （地支藏干的天干对象列表，顺序为本气、中气、余气）
    // ...其它柱类似

    // 节气
    lunisolar('2022-07-23').solarTerm?.toString() // 大暑 （返回当天的节气，如果不是节气则solarTerm().solarTerm返回null）

    // 阴历反查 （阴历转公历）
    lunisolar.fromLunar({
        year: 2022,
        month: 10,
        day: 25
    }).format('YYYY-MM-DD') // 2022-11-18


    return {
        lunisolar: d
    }
}
