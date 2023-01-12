#!/usr/bin/env sh

PROJECT_DIR=$(cd $(dirname $0);cd ..;pwd)

# TODO 配置cli环境
WECHAT_CLI=/Applications/wechatwebdevtools.app/Contents/MacOS/cli

$WECHAT_CLI preview --project $PROJECT_DIR/dist/dev/mp-weixin --qr-size small
