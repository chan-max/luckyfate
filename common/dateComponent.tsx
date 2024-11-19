import Lunar from "@/common/core/lunar"; // 引入农历库

// 阳历和阴历切换
export const isLunar = ref(false);

// 自定义日期单元格内容
export const dateCellRender = (current) => {
    if (!isLunar.value) {
        // 显示阳历日期
        return <div class="custom-date-cell">{current.current.date()}</div>;
    }

    // 显示阴历日期
    const lunar = Lunar.fromDate(current.current.toDate());
    const lunarDay = lunar.getDayInChinese(); // 农历日
    const lunarMonth = lunar.getMonthInChinese(); // 农历月
    return (
        <div class="custom-date-cell">
            {lunarMonth}月{lunarDay}
        </div>
    );
};