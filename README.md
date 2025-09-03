# 学生信息管理系统 - 操作文档

## 项目概述

这是一个基于Flask框架开发的学生信息管理系统，包含学生信息的增删改查功能，使用Bootstrap和jQuery DataTables实现前端界面。


StudentManager/

├── static/

│   ├── css/          # 样式文件

│   └── js/           # JavaScript文件

├── templates/

│   ├── login.html    # 登录页面

│   └── students.html # 学生管理主页面

├── app.py            # Flask主程序

├── requirements.txt  # 依赖包列表

└── data/

    ├── students.json # 学生数据

    └── users.json    # 用户数据

  
  

## 功能说明

1. 登录功能

   - 用户名密码验证

   - 错误提示

  

2. 学生管理

   - 学生信息表格展示

   - 搜索筛选功能

   - 添加/编辑/删除学生

  

## 安装与运行

1. 安装依赖

```

pip install -r requirements.

txt

```

2. 启动应用

```

python app.py

```

3. 访问应用

   打开浏览器访问 http://localhost:5000

## 使用说明

1. 使用管理员账号登录

2. 在学生管理页面可以：

   - 通过顶部搜索框筛选学生

   - 点击"新增学生"按钮添加学生

   - 点击每行的"编辑"或"删除"按钮操作学生记录

## 注意事项

1. 确保已安装Python 3.7+

2. 首次运行前请确保data目录存在

3. 默认管理员账号可在users.json中查看

## 截图

1. 登录页面整体布局

<img width="900" height="776" alt="学生管理系统" src="https://github.com/user-attachments/assets/4109aadc-5f3b-4a1c-9449-44201239e68c" />

<img width="907" height="773" alt="学生管理系统-1" src="https://github.com/user-attachments/assets/c72b1992-7547-468f-b75f-e9dbc709cdd3" />


2. 学生表格展示效果

<img width="1850" height="767" alt="学生管理系统-2" src="https://github.com/user-attachments/assets/83d3dc91-aef6-4a61-8610-36ddc648ccf2" />

  
3. 搜索筛选功能演示

<img width="1859" height="782" alt="学生管理系统-3" src="https://github.com/user-attachments/assets/910f3883-c8ae-40a5-80b6-2d536142b637" />

4. 添加/编辑学生模态框

<img width="1375" height="647" alt="学生管理系统-4" src="https://github.com/user-attachments/assets/af54403a-29a0-4d84-aac8-dde1455e3369" />

<img width="1383" height="651" alt="学生管理系统-5" src="https://github.com/user-attachments/assets/0f645e48-ef01-4649-8989-69f8cc5779ec" />

5. 删除确认对话框

<img width="1729" height="877" alt="学生管理系统-6" src="https://github.com/user-attachments/assets/581e1d5c-44ce-4a0d-b4e8-33c04cb43f8b" />
