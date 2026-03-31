export interface Course {
  id: string;
  week: number;
  module: number;
  title: string;
  description: string;
  content: string;
  duration_minutes: number;
}

export const courseData: Course[] = [
  {
    id: "1-1",
    week: 1,
    module: 1,
    title: "見樹又見林 —— Gemini 六大神器總覽",
    description: "帶領主管巡禮左側工具列的所有功能",
    content: "第一週 第一模組課程內容",
    duration_minutes: 120,
  },
  {
    id: "1-2",
    week: 1,
    module: 2,
    title: "Gemini 介面導覽與基礎設定",
    description: "熟悉 Gemini 的工作界面和基本操作",
    content: "第一週 第二模組課程內容",
    duration_minutes: 120,
  },
  {
    id: "1-3",
    week: 1,
    module: 3,
    title: "AI 能力邊界與實踐限制",
    description: "了解 AI 的能力邊界，建立正確期望",
    content: "第一週 第三模組課程內容",
    duration_minutes: 120,
  },
];
