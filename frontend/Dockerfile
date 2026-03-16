# 1. 使用 Node.js 20 版
FROM node:20-slim

# 2. 設定工作目錄
WORKDIR /app

# 3. 複製 package.json 先安裝依賴
COPY package*.json ./
RUN npm install

# 4. 複製所有前端程式碼
COPY . .

# 5. 啟動開發者模式
CMD ["npm", "run", "dev"]