## 定时任务调度器

这是一个简单的定时任务调度器，可以根据cron表达式执行任务。

### 安装

1. 克隆仓库

   git clone https://github.com/your-username/cron-scheduler

2. 进入项目目录

   cd cron-scheduler

3. 安装依赖

   npm install

### 使用

1. 创建配置文件

   创建一个名为tasks.json的文件，内容如下：

   ```json
   {
     "tasks": [
       {
         "name": "backup",
         "cron": "0 2 * * *",
         "command": "node backup.js"
       },
       {
         "name": "cleanup",
         "cron": "0 */6 * * *",
         "command": "node cleanup.js"
       }
     ]
   }
   ```

2. 运行调度器

   node scheduler.js --config tasks.json

### 配置文件说明

- tasks: 任务列表
  - name: 任务名称
  - cron: cron表达式
  - command: 要执行的命令

### 示例

- 每天凌晨2点执行备份：
  - cron: "0 2 * * *"
  - command: "node backup.js"

- 每小时执行清理：
  - cron: "0 */6 * * *"
  - command: "node cleanup.js"
