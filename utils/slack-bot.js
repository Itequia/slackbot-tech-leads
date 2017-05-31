const botkit = require("botkit").slackbot()

class SlackBot {

    constructor() {}

    startBot(token = '') {
        this.bot = botkit.spawn({ token })
        this.bot.startRTM((err, bot, payload) => {
            if (err) throw new Error('Could not connect to Slack')
            console.log("- Bot connected successfully.")
        })
        botkit.on('direct_mention', this.onDirectMention.bind(this))
        botkit.on('direct_message', this.onDirectMessage.bind(this))
    }

    onDirectMention (bot, message) {
    }

    onDirectMessage (bot, message) {
    }

	api(path, params = {}) {
		return new Promise ( (resolve, reject) => {
            let pathArray = path.split("."),
			    request = this.bot.api
		    
            for(let p of pathArray) request = request[p]

			request(params, (err, response) => {
				if (err) reject(err)
				else resolve (response)
			})
		})
	}
}

module.exports = SlackBot