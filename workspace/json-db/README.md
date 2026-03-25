## JSON数据库工具

这是一个基于JSON文件的简单数据库，支持CRUD操作和查询。

## 文件

1. `workspace/json-db/database.js` - 数据库主程序
2. `workspace/json-db/README.md` - 使用文档
3. `workspace/json-db/test.js` - 测试文件

## 安装

确保您已安装Node.js和npm。

```bash
npm install
```

## 使用

```bash
database.js create <table_name>

创建一个新表。

database.js insert <table_name> --data '<data>'

插入记录。

database.js find <table_name> --query '<query>'

查询记录。

database.js update <table_name> --id <id> --data '<data>'

更新记录。

database.js delete <table_name> --id <id>

删除记录。

database.js save

保存数据库到文件。
```

## 示例

```bash
database.js create users

# 创建一个名为users的表
```

```bash
database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'

# 插入一条记录
```

```bash
database.js find users --query '{\"age\":30}'

# 查询年龄为30的用户
```

```bash
database.js update users --id 1 --data '{\"age\":31}'

# 更新ID为1的用户的年龄
```

```bash
database.js delete users --id 1

# 删除ID为1的用户
```

```bash
database.js save

# 保存数据库
```
