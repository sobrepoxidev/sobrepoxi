#!/usr/bin/env bash
# Deploys the committed HEAD to the VPS (ssh alias `server`, 31.97.210.100).
#   /opt/sobrepoxi/releases/<sha>   one folder per build
#   /opt/sobrepoxi/current          symlink to the live release
#   /opt/sobrepoxi/shared/.env      production env (never committed)
# PM2 app `sobrepoxi` runs `next start` on 127.0.0.1:3150; nginx (aisolutions-nginx)
# proxies sobrepoxi.com to it. Usage: bash scripts/deploy/vps.sh [--env]
#   --env  also uploads .env.local as shared/.env (values never printed)
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
SHA=$(git rev-parse --short HEAD)
[ -z "$(git status --porcelain -- src package.json pnpm-lock.yaml next.config.ts)" ] \
  || { echo "hay cambios sin commitear en src/config: el deploy sale de HEAD ($SHA)"; }
HOST=${HOST:-server}
BASE=/opt/sobrepoxi
REL=$BASE/releases/$SHA

if [ "${1:-}" = "--env" ]; then
  ssh "$HOST" "mkdir -p $BASE/shared && touch $BASE/shared/.env && cp $BASE/shared/.env $BASE/shared/.env.bak.\$(date +%Y%m%d-%H%M%S)"
  grep -v '^\s*#' .env.local | grep '=' | ssh "$HOST" "cat > $BASE/shared/.env && chmod 600 $BASE/shared/.env && echo env: \$(wc -l < $BASE/shared/.env) vars"
fi

echo "release $SHA -> $HOST:$REL"
git archive --format=tar HEAD | ssh "$HOST" "mkdir -p $REL && tar -x -C $REL"
ssh "$HOST" bash -s <<EOF
set -euo pipefail
cd $REL
ln -sf $BASE/shared/.env .env.production
npx -y pnpm@11.1.2 install --frozen-lockfile --prod=false > install.log 2>&1 || { tail -20 install.log; exit 1; }
NODE_OPTIONS=--max-old-space-size=3072 npx -y pnpm@11.1.2 run build > build.log 2>&1 || { tail -30 build.log; exit 1; }
grep -E "Generating static pages \(|Compiled" build.log | tail -2
ln -sfn $REL $BASE/current
if pm2 describe sobrepoxi > /dev/null 2>&1; then
  pm2 reload sobrepoxi --update-env
else
  cd $BASE/current && PORT=3150 HOSTNAME=127.0.0.1 pm2 start node_modules/next/dist/bin/next --name sobrepoxi --cwd $BASE/current -- start -p 3150 -H 127.0.0.1
  pm2 save
fi
sleep 4
curl -s -o /dev/null -w "local /es -> HTTP %{http_code}\n" http://127.0.0.1:3150/es
# keep the last 3 releases
ls -1dt $BASE/releases/* | tail -n +4 | xargs -r rm -rf
EOF
