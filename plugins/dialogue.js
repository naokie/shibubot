var request = require('request');

module.exports = function (controller) {
  controller.hears(['.+'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    if (!process.env.DOCOMO_DIALOGUE_API_KEY) return;

    var p = parseFloat(process.env.DOCOMO_DIALOGUE_P || '0.1');
    if (Math.random() < p) {
      bot.reply(message, ':space_invader:');
      return;
    }

    var matches = message.text.match(/(.+)/i);
    var payload = {
      utt: matches[0],
      nickname: message.user,
    };

    var id = 'dialogue:' + message.user;

    controller.storage.users.get(id, function (err, dialogue) {
      if (dialogue) {
        payload.context = dialogue.context;
        payload.mode = dialogue.mode;
      }
    });

    request.post({
      url: 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue',
      qs: {
        APIKEY: process.env.DOCOMO_DIALOGUE_API_KEY,
      },
      json: payload,
    }, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        bot.reply(message, body.utt);

        var dialogue = {
          id: id,
          context: body.context,
          mode: body.mode,
        };
        controller.storage.users.save(dialogue, function (err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  });
};
