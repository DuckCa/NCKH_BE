-- Tạo database trước
CREATE DATABASE IF NOT EXISTS GRAPHIC;

-- Xóa user cũ nếu tồn tại
DROP USER IF EXISTS 'mem1'@'%';

-- Tạo user mới
CREATE USER 'mem1'@'%' IDENTIFIED WITH mysql_native_password BY '123';

-- Cấp full quyền cho database GRAPHIC
GRANT ALL PRIVILEGES ON GRAPHIC.* TO 'mem1'@'%';

-- Đảm bảo các thay đổi được áp dụng
FLUSH PRIVILEGES;