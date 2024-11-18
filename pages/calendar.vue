<template>
  <div class="calendar-page">
    <!-- 控制区 -->
    <div class="controls">
      <a-switch
        v-model:checked="isLunar"
        checked-children="阴历"
        un-checked-children="阳历"
      />
    </div>

    <!-- 今日宜忌 -->
    <div class="today-info" v-if="selectedDateInfo">
      <h2>今日宜忌</h2>
      <div class="info-container">
        <p><strong>公历：</strong>{{ selectedDateInfo.gregorian }}</p>
        <p><strong>农历：</strong>{{ selectedDateInfo.lunar }}</p>
        <p><strong>Good：</strong>{{ selectedDateInfo.yi }}</p>
        <p><strong>Bad：</strong>{{ selectedDateInfo.ji }}</p>
      </div>
    </div>

    <!-- 日历部分 -->
    <div class="calendar-container">
      <a-card>
        <a-calendar
          v-model:value="value"
          :date-cell-render="dateCellRender"
          @panelChange="onPanelChange"
        />
      </a-card>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, watch } from "vue";
import { Dayjs } from "dayjs";
import Lunar from "@/common/core/lunar"; // 引入农历库

// 日历选中的值
const value = ref<Dayjs>();

// 阳历和阴历切换
const isLunar = ref(false);

// 今日宜忌数据
const selectedDateInfo = ref<{
  gregorian: string;
  lunar: string;
  yi: string;
  ji: string;
} | null>(null);

// 获取宜忌数据
const getYiJi = (date: Dayjs) => {
  const lunar = Lunar.fromDate(date.toDate());
  const yi = lunar.getDayYi(); // 宜
  const ji = lunar.getDayJi(); // 忌
  return {
    gregorian: date.format("YYYY-MM-DD"),
    lunar: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    yi: yi.join(", "),
    ji: ji.join(", "),
  };
};

// 监听选中的日期变化
watch(value, (newValue) => {
  if (newValue) {
    selectedDateInfo.value = getYiJi(newValue);
  }
});

// 自定义日期单元格内容
const dateCellRender = (current: Dayjs) => {
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

// 面板切换事件
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};
</script>

<style scoped>
/* 页面整体布局 */
.calendar-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f9fc;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
}

/* 控制区样式 */
.controls {
  display: flex;
  justify-content: flex-end; /* Switch 居右对齐 */
  width: 100%;
  max-width: 900px;
  margin-bottom: 10px;
}

/* 今日宜忌样式 */
.today-info {
  width: 100%;
  max-width: 900px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.today-info h2 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.info-container p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

.info-container strong {
  color: #1677ff;
}

/* 日历部分 */
.calendar-container {
  width: 100%;
  max-width: 900px;
}

.a-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* 自定义日期单元格 */
.custom-date-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1.2;
}
</style>
