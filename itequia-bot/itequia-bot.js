const SlackBot = require("../utils/slack-bot")

const dialog = require("./dialog")

class ItequiaBot extends SlackBot {

    constructor() {
        super()
        this.init()
    }

    async init() {
        this.startBot (process.env.SLACK_API_TOKEN)
        this.regex = {
            help: /(ajuda|ayuda|help|help me)/i,
            pr: /(review|code review|pr|pull request)/i,
        }
    }

    onDirectMention (bot, message) {
        this.checkDMRegex (bot, message)
    }

    onDirectMessage (bot, message) {
        this.checkDMRegex (bot, message)
    }

    async checkDMRegex (bot, message) {
        try {
            let { user } = await this.api("users.info", { user: message.user }),
                { text } = message,
                { help, pr } = this.regex
            if (help.test(text)) {
                let request = text.replace(help.exec(text)[0], "")
                return this.onAskHelp (bot, message, user, request)
            }
            if (pr.test(text)) {
                let request = text.replace(pr.exec(text)[0], "")
                return this.onAskPr (bot, message, user, request)
            }
            return bot.reply(message, dialog.usage)
        }
        catch(e) {
            console.error(e)
            this.onError (bot, message)
        }
    }

    async onAskHelp (bot, message, user, request) {
        let name = user.profile.first_name,
            username = user.name
        bot.reply(message, dialog.helpOk(name))
        try {
            this.sendMessageToLeads(dialog.helpLeadsOk(username, request))
        }
        catch(e) {
            console.error(e)
        }
    }

    async onAskPr (bot, message, user, request) {
        let name = user.profile.first_name,
            username = user.name
        bot.reply(message, dialog.prOk(name))
        try {
            let req = request.replace("<","")
            req = request.replace(">","") // to remove the formating on the links
            this.sendMessageToLeads(dialog.prLeadsOk(username, req))
        }
        catch(e) {
            console.error(e)
        }
    }

    onError (bot, message) {
        bot.reply(message, dialog.error)
    }

    async sendMessageToLeads(text = "") {
        await this.api("chat.postMessage", { 
            channel: process.env.SLACK_LEAD_GROUP, 
            text, 
            as_user: true,
            parse: "full"
        })
    }
}

module.exports = ItequiaBot