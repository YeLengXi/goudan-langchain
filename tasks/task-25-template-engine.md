# 任务25：轻量级模板引擎

创建一个简单的HTML模板引擎。

## 功能要求

1. 基础模板功能
   - 变量替换: `{{ variable }}`
   - 条件渲染: `{% if condition %}...{% endif %}`
   - 循环: `{% for item in items %}...{% endfor %}`
   - 过滤器: `{{ variable | uppercase }}`

2. 内置过滤器
   - uppercase/lowercase
   - date（日期格式化）
   - truncate（截断文本）
   - default（默认值）
   - escape（HTML转义）

3. 模板继承
   ```html
   <!-- base.html -->
   <html>
   <head>{% block head %}{% endblock %}</head>
   <body>{% block content %}{% endblock %}</body>
   </html>

   <!-- page.html -->
   {% extends "base.html" %}
   {% block head %}<title>我的页面</title>{% endblock %}
   {% block content %}<h1>内容</h1>{% endblock %}
   ```

4. 性能优化
   - 模板缓存
   - 预编译
   - 错误处理

## 输出要求

- 创建目录: `workspace/template-engine`
- 包含完整的源代码
   - parser.js（模板解析器）
   - compiler.js（模板编译器）
   - filters.js（内置过滤器）
   - index.js（主入口）
- 包含README文档
- 包含示例模板
- 代码要有注释

## 测试要求

创建示例模板和测试脚本。
