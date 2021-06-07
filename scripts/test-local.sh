#! /bin/bash

set -euo pipefail
echo "--- :database: Start database in Docker. "
docker-compose -f docker-compose.testrunner.yml up -d db
trap "docker-compose -f docker-compose.testrunner.yml down" EXIT
sleep 5
yarn test
