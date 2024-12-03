docker-compose down
docker-compose up --build

Sau khi chạy docker compose, phải đăng ký Service "FREE" thủ công trong container của docker
B1: docker exec -it oracle-db bash
B2: vi /opt/oracle/product/23ai/dbhomeFree/network/admin/listener.ora
  + cat /opt/oracle/product/23ai/dbhomeFree/network/admin/tnsnames.ora (Kiểm tra  tnsnames.ora)
B3: 
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC_FOR_FREE))
      (ADDRESS = (PROTOCOL = TCP)(HOST = 127.0.0.1)(PORT = 1523))
    )
  )

SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (SID_NAME = FREE)
      (SERVICE_NAME = freepdb1)
      (ORACLE_HOME = /opt/oracle/product/23ai/dbhomeFree)
    )
  )
B4: Esc sau đó :wq để lưu và thoát.
B5: lsnrctl stop và lsnrctl start để khởi động lại images
B6: Check lsnrctl status để xem đã có Service Free chưa
B7: Check kết nối bằng cú pháp:
sqlplus system/duc140603@'(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1523))(CONNECT_DATA=(SERVICE_NAME=FREE)))'

netstat -an | find "1521" (Tìm cổng)


