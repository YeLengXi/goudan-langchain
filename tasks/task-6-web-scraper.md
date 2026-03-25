# 任务6: 网页爬虫工具

## 目标

创建一个简单的网页爬虫工具，可以提取网页的标题、链接和图片。

## 必须创建的文件

1. `workspace/web-scraper/scraper.js` - 主爬虫程序
2. `workspace/web-scraper/package.json` - 项目配置

## 工作流程

立即执行以下操作：
1. 使用fetch API获取网页内容
2. 使用正则表达式提取：
   - 页面标题（<title>标签）
   - 所有链接（<a href="...">）
   - 所有图片（<img src="...">）
3. 将结果保存为JSON文件
4. 创建简单的CLI接口

## 功能要求

- 支持命令行参数：`node scraper.js <URL>`
- 输出JSON格式结果
- 错误处理（无效URL、网络错误）
- 使用ES6语法

## 重要

- 不要描述计划，直接创建文件
- 使用Node.js内置模块（不依赖第三方库）
- 确保代码可以运行
- 包含详细注释
