
# Sử dụng Node.js LTS làm base image
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /src/server

# Sao chép package.json và package-lock.json
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Thiết lập cổng mặc định
EXPOSE 8070

# Chạy ứng dụng
CMD ["node", "src/server.js"]
