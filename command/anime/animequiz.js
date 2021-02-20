'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');
const h = new (require('html-entities').AllHtmlEntities)();
const fetch = require('node-superfetch');

module.exports = {
    run: async (client, msg) => {
        fetch.get("https://opentdb.com/api.php?amount=15&category=31&type=boolean").end(async (err, response) => {
            if (err) console.error(err);
            const res = response.body;
            const data = res.results;
            let length = data.length;
            let randomNumber = Math.floor(Math.random() * length);
            let randomQuestion = data[randomNumber];
            let question = randomQuestion.question;
            let cat = randomQuestion.category;
            let difficulty = randomQuestion.difficulty;
            let correctAnswer = randomQuestion.correct_answer;
            const embed = new MessageEmbed();
            embed.setDescription(h.decode(question) + '\n\nResponse with true or false');
            embed.setFooter(`Anime Quiz started by ${msg.author.id} | ${cat} | Difficulty: ${difficulty}`);
            embed.setTimestamp(Date.now());
            msg.channel.send(embed).then(async (ms) => {
                const filter = m => m.author.id === msg.author.id;
                const answer = msg.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ["max", "time"]});
                const ans = (await answer).first();
                if (!ans) return msg.channel.send('Time out, you doesnt said true or false');

                if (ans.content.toLowerCase() === correctAnswer.toLowerCase()) {
                    await ms.edit(embed.setDescription(h.decode(question) + '\nYour Answer was right'));
                } else {
                    await ms.edit(embed.setDescription(h.decode(question) + '\nYour Answer was wrong'));
                }
            });
        })
    },
    info: {
        description: "Play a quiz round about anime and manga"
    }
};