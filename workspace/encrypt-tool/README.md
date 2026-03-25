## 使用文档

### 加密工具 (encrypt.js)

加密文本或文件。

#### 用法

```bash
node encrypt.js "text" --method method_name [options...]

node encrypt.js file_path --method method_name [options...]

```

#### 参数

- text: 要加密的文本。
- method_name: 加密方法，可以是 caesar、base64、rot13、xor 或 aes。
- options:
  - --key: 加密密钥（对于 aes 加密方法）。
  - --output: 输出文件路径（对于文件加密）。

### 解密工具 (decrypt.js)

解密文本或文件。

#### 用法

```bash
node decrypt.js encrypted_text --method method_name

node decrypt.js file_path --method method_name

```

#### 参数

- encrypted_text: 要解密的文本。
- method_name: 解密方法，可以是 caesar、base64、rot13、xor 或 aes。

