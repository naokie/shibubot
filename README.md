## Deploy

[![Greenkeeper badge](https://badges.greenkeeper.io/naokie/shibubot.svg)](https://greenkeeper.io/)

Sign up IBM Bluemix

https://console.ng.bluemix.net/registration/

Install cf cli via Homebrew

```
$ brew tap cloudfoundry/tap
$ brew install cf-cli
```

Connect Bluemix server

```
$ cf api https://api.ng.bluemix.net
```

Get Slack token

https://my.slack.com/services/new/bot

Set environments

```
$ cf set-env YOUR_APP_NAME token SLACK_TOKEN
```

Create rediscloud instance

```
$ cf create-service rediscloud 30mb REDISCLOUD_INSTANCE_NAME
```

Set environments

```
$ cf set-env YOUR_APP_NAME rediscloud REDISCLOUD_INSTANCE_NAME
```

Make manifest.yml

```
applications:
- name: YOUR_APP_NAME
  memory: 64MB
  command: node main.js
  no-route: true
  services:
  - REDISCLOUD_INSTANCE_NAME
```
