# 任务13: 颜色转换工具

## 目标

创建一个颜色转换工具，支持多种颜色格式的相互转换。

## 必须创建的文件

1. `workspace/color-converter/converter.js` - 转换器
2. `workspace/color-converter/README.md` - 使用文档
3. `workspace/color-converter/test.html` - 可视化界面（可选）

## 工作流程

立即执行以下操作：
1. 实现颜色格式解析：
   - HEX (#RRGGBB)
   - RGB (rgb(r, g, b))
   - HSL (hsl(h, s, l))
   - HSV/HSB
   - CMYK
   - 颜色名称（red, blue等）
2. 实现格式转换函数
3. 实现颜色操作：
   - 变亮/变暗
   - 饱和度调整
   - 反色
   - 混合颜色
4. 实现CLI接口
5. 添加使用示例

## 功能要求

- 支持多种颜色格式
- 双向转换
- 颜色操作
- 验证输入
- 错误处理

## CLI接口

```bash
node converter.js "#ff0000" --to rgb
node converter.js "rgb(255, 0, 0)" --to hex
node converter.js "#ff0000" --lighten 20
node converter.js "red" --to hsl
```

## 输出示例

```bash
$ node converter.js "#ff0000" --to rgb
Input: #ff0000
Output: rgb(255, 0, 0)

$ node converter.js "#ff0000" --lighten 20
Input: #ff0000
Output: #ff6666 (20% lighter)
```

## 重要

- 纯算法实现（不依赖库）
- 包含颜色验证
- 添加详细注释
- 提供完整示例
