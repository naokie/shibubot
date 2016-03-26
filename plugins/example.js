module.exports = function (controller) {
  controller.hears(['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    bot.reply(message, 'Hello');
  });
};
