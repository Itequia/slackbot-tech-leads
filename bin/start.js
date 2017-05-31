// Adding global config vars
require('dotenv').config()

const Server = require("../server")

let server = new Server()
server.start(parseInt(process.env.PORT, 10))