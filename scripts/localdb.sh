#! /bin/bash

set -euo pipefail
echo "--- :database: Start database in Docker. "
docker-compose -f docker-compose.testrunner.yml up -d db
sleep 5
