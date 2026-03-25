## JSON数据库工具

这是一个简单的基于JSON文件的数据库工具，支持CRUD操作和查询。

### 安装

1. 下载源代码
2. 在终端中运行以下命令：

   npm install

### 使用

- 创建数据库：`node database.js create <table_name>`
- 插入数据：`node database.js insert <table_name> --data '<data>'`
- 查询数据：`node database.js find <table_name> --query '<query>'`
- 更新数据：`node database.js update <table_name> --id <id> --data '<data>'`
- 删除数据：`node database.js delete <table_name> --id <id>`

### 示例

- 创建用户表：`node database.js create users`
- 插入用户：`node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'`
- 查询年龄为30的用户：`node database.js find users --query '{\"age\":30}'`
- 更新用户年龄：`node database.js update users --id 1 --data '{\"age\":31}'`
- 删除用户：`node database.js delete users --id 1'