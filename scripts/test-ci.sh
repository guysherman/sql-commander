#! /bin/bash

set -euo pipefail
echo "--- :database: Start database in Docker. "
docker-compose -f docker-compose.testrunner.yml up -d db
trap "docker-compose -f docker-compose.testrunner.yml down" EXIT
echo "--- :docker: Build Test runner image"
docker-compose -f docker-compose.testrunner.yml build test-runner
echo "+++ :docker: Testing for code smells"
docker-compose -f docker-compose.testrunner.yml run --rm test-runner yarn lint
docker-compose -f docker-compose.testrunner.yml run --rm test-runner yarn typecheck
echo "+++ :docker: Running unit tests"
docker-compose -f docker-compose.testrunner.yml run --rm test-runner yarn jest --testPathIgnorePatterns=dist/
