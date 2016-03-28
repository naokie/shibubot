var _ = require('lodash');
var CronJob = require('cron').CronJob;

module.exports = function (controller, bot) {
  var shibuya;

  bot.api.channels.list({
    exclude_archived: 1,
  }, function (err, response) {
    shibuya = _.find(response.channels, function (channel) {
      return channel.name === 'shibuya';
    }).id;
  });

  new CronJob('0 0 10 * * 1-5', function () {
    bot.say({
      text: '出社してる？',
      channel: shibuya,
    });
  }, null, true, 'Asia/Tokyo');

  new CronJob('0 0 19 * * 1-5', function () {
    bot.say({
      text: '定時ですよ！',
      channel: shibuya,
    });
  }, null, true, 'Asia/Tokyo');
};
