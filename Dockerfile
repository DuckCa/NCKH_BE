# Sử dụng image Node.js phiên bản 20
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /src/server

# Cài đặt các thư viện hệ thống cần thiết cho sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    python3 \
    make \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies với --platform
RUN npm install --platform=linux --arch=x64 sharp

# Cài đặt các dependencies khác
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Mở cổng 8050
EXPOSE 8050

# Khởi chạy ứng dụng
CMD ["node", "src/server.js"]