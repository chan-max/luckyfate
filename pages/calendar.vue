<template>
  <div class="calendar-page">
    <!-- 标题 -->
    <div class="header">
      <h1>日历管理</h1>
      <p>选择日期查看待办事项或重要事件</p>
    </div>

    <!-- 日历部分 -->
    <div class="calendar-container">
      <a-card>
        <a-calendar
          v-model:value="value"
        />
      </a-card>
    </div>

    <!-- 详情部分 -->
    <div class="details-container">
      <h2>待办事项</h2>
      <div v-if="todos.length">
        <ul>
          <li v-for="(todo, index) in todos" :key="index">
            <span class="todo-date">{{ todo.date }}</span>
            <span class="todo-text">{{ todo.text }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>暂无待办事项</p>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { Dayjs } from "dayjs";

// 日历选中的值
const value = ref<Dayjs>();

// 模拟的待办事项
const todos = ref([
  { date: "2024-11-18", text: "完成项目文档" },
  { date: "2024-11-19", text: "团队会议" },
]);

// 监听面板切换
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};

// 自定义日期单元格内容
const dateCellRender = (current: Dayjs) => {
  const currentDate = current.format("YYYY-MM-DD");
  const matchedTodo = todos.value.find((todo) => todo.date === currentDate);
  return matchedTodo ? (
    <div class="custom-date-cell">
      <span class="dot"></span>
      {matchedTodo.text}
    </div>
  ) : null;
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

/* 页面标题 */
.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  color: #333;
}

.header p {
  font-size: 16px;
  color: #888;
}

/* 日历部分 */
.calendar-container {
  width: 100%;
  max-width: 900px;
  margin-bottom: 20px;
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
  color: #fff;
  background-color: #1677ff;
  border-radius: 4px;
  padding: 2px 4px;
}

.custom-date-cell .dot {
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  margin-right: 4px;
}

/* 待办事项部分 */
.details-container {
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.details-container h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.details-container ul {
  list-style: none;
  padding: 0;
}

.details-container li {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.details-container li:last-child {
  border-bottom: none;
}

.todo-date {
  font-weight: bold;
  margin-right: 10px;
  color: #1677ff;
}

.todo-text {
  color: #555;
}
</style>
