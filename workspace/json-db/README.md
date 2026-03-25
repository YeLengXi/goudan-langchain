## JSON数据库工具

这个文档提供了如何使用JSON数据库工具的说明。

### 安装

确保你已经安装了Node.js。

### 初始化数据库

1. 创建一个新的文件夹作为数据库的工作空间。
2. 在工作空间中创建一个名为data.json的文件。
3. 使用以下命令初始化数据库：

    node database.js init

### 使用数据库

- 创建表：
    node database.js create <table_name>
- 插入记录：
    node database.js insert <table_name> --data '<data>'
- 查询记录：
    node database.js find <table_name> --query '<query>'
- 更新记录：
    node database.js update <table_name> --id <id> --data '<data>'
- 删除记录：
    node database.js delete <table_name> --id <id>'

### 示例

- 创建一个名为users的表：
    node database.js create users
- 插入一条记录：
    node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'
- 查询年龄为30的用户：
    node database.js find users --query '{\"age\":30}'
- 更新id为1的用户的年龄：
    node database.js update users --id 1 --data '{\"age\":31}'
- 删除id为1的用户的记录：
    node database.js delete users --id 1

### 命令行接口

- 创建表：create <table_name>
- 插入记录：insert <table_name> --data '<data>'
- 查询记录：find <table_name> --query '<query>'
- 更新记录：update <table_name> --id <id> --data '<data>'
- 删除记录：delete <table_name> --id <id>'