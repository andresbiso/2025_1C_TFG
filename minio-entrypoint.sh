#!/bin/bash

# Wait for MinIO to start
sleep 5

# Configure MinIO client
mc alias set local http://localhost:9000 admin password

# Create the bucket if it doesn't exist
mc mb local/bucket_one || echo "Bucket already exists"

# Keep the MinIO server running
exec minio server /data --console-address ":9001"
