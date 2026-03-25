# 任务14: 文本加密解密工具

## 目标
创建一个简单的文本加密解密工具，支持多种加密算法。

## 必须创建的文件
1. `workspace/encrypt-tool/encrypt.js` - 加密工具
2. `workspace/encrypt-tool/decrypt.js` - 解密工具
3. `workspace/encrypt-tool/README.md` - 使用文档

## 工作流程
立即执行以下操作：
1. 实现加密算法：
   - Caesar Cipher（凯撒密码）
   - Base64编码
   - ROT13
   - 简单XOR加密
   - AES加密（使用crypto模块）
2. 实现解密功能
3. 实现文件加密/解密
4. 实现CLI接口
5. 添加使用示例

## 功能要求
- 多种加密算法
- 文件加密/解密
- 密钥管理
- 错误处理
- 安全提示

## CLI接口
```bash
node encrypt.js "hello world" --method caesar --key 3
node encrypt.js "hello" --method base64
node encrypt.js file.txt --method aes --key mykey --output encrypted.bin
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt
```