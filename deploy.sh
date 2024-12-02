#!/bin/bash

# Set variables
DB_CONTAINER_NAME="oracle-db"
DB_USERNAME="system"
DB_PASSWORD="duc140603"
LISTENER_FILE_PATH="/opt/oracle/product/23ai/dbhomeFree/network/admin/listener.ora"
SERVICE_NAME="FREE"

echo "Stopping and removing existing containers..."
docker-compose down

echo "Building and starting containers..."
docker-compose up --build -d

echo "Waiting for database container to initialize..."
sleep 60  # Adjust time as needed to wait for the DB to be ready

echo "Entering the database container..."
docker exec -i $DB_CONTAINER_NAME bash <<EOF

echo "Modifying listener.ora file..."
cat > $LISTENER_FILE_PATH <<EOL
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
EOL

echo "Restarting the listener service..."
lsnrctl stop
lsnrctl start

echo "Checking listener status..."
lsnrctl status

EOF

echo "Testing database connection..."
docker exec -i $DB_CONTAINER_NAME bash -c "
sqlplus $DB_USERNAME/$DB_PASSWORD@'(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1523))(CONNECT_DATA=(SERVICE_NAME=$SERVICE_NAME)))'
"

echo "Deployment completed!"
