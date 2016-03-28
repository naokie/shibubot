if (!process.env.token) {
  console.log('Error: Specify token in environment.');
  process.exit(1);
}

if (!process.env.rediscloud) {
  console.log('Error: Specify rediscloud in environment.');
  process.exit(1);
}

var Botkit = require('botkit');
var redis = require('botkit/lib/storage/redis_storage');
var cfenv = require('cfenv');
var path = require('path');
var fs = require('fs');

var credentials = cfenv.getAppEnv().getServiceCreds(process.env.rediscloud);

var redisStorage = redis({
  host: credentials ? credentials.hostname : 'localhost',
  port: credentials ? credentials.port : 6379,
  auth_pass: credentials ? credentials.password : null,
});

var controller = Botkit.slackbot({
  storage: redisStorage,
  debug: true,
});

var bot = controller.spawn({
  token: process.env.token,
}).startRTM(function (err, bot, payload) {
  if (err) {
    controller.logger.error(err);
  }
});

var pluginsPath = path.resolve(__dirname, 'plugins');
fs.readdir(pluginsPath, function (err, list) {
  for (var file of list) {
    var pluginPath = path.resolve(pluginsPath, file);
    require(pluginPath)(controller, bot);
  }
});
