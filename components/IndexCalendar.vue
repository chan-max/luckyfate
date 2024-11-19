<script setup lang="ts">
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { computed } from "vue";
import { useLoginStatusStore } from "@/common/store/login";

const loginStore = useLoginStatusStore();

const today = dayjs(); // 当前日期

// 从用户信息中获取生日
const birthday = computed(() => {
  if (!loginStore.userInfo?.birthday) return null;

  return dayjs(new Date(loginStore.userInfo.birthday)); // 假设用户生日是 "YYYY-MM-DD" 格式
});
</script>

<template>
  <div>
    <a-calendar :fullscreen="false">
      <template #dateFullCellRender="scope">
        <div class="relative">
          <!-- 今天的 Popover -->
          <a-popover v-if="scope.current.isSame(today, 'day')" placement="top">
            <template #content>
              <div class="p-2">This is today's special info.</div>
            </template>
            <div class="custom-cell today">
              {{ (scope.current as Dayjs).date() }}
            </div>
          </a-popover>

          <!-- 生日的 Popover -->
          <a-popover
            v-else-if="birthday && scope.current.isSame(birthday, 'day')"
            placement="top"
          >
            <template #content>
              <div class="p-2">🎉 Happy Birthday!</div>
            </template>
            <div class="custom-cell birthday">
              {{ (scope.current as Dayjs).date() }}
            </div>
          </a-popover>

          <a-popover v-else placement="top" trigger="click">
            <template #content>
              <a-menu>
                <a-menu-item key="0">
                  <a> 标记为幸运日 </a>
                </a-menu-item>
                <a-menu-item key="1">
                  <a> 标记为倒霉日 </a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a> 标记为假期 </a>
                </a-menu-item>
                <a-menu-item key="3">
                  <a> 标记梦境 </a>
                </a-menu-item>
              </a-menu>
            </template>
            <div class="custom-cell">
              {{ (scope.current as Dayjs).date() }}
            </div>
          </a-popover>
        </div>
      </template>
    </a-calendar>
  </div>
</template>

<style scoped>
/* 日期单元格基础样式 */
.custom-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* 悬停样式 */
.custom-cell:hover {
  background: #e6f7ff;
  cursor: pointer;
}

/* 今天的日期样式 */
.custom-cell.today {
  background: #ffd700;
  color: white;
  font-weight: bold;
  border: 1px solid #ffa500;
}

/* 生日的日期样式 */
.custom-cell.birthday {
  background: #87d068;
  color: white;
  font-weight: bold;
  border: 1px solid #73c900;
}
</style>

<style>
.ant-menu-vertical {
  border-inline-end: none !important;
}
</style>
