const app = require('express').Router();
const db = require("../../../database/models/servers/server.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[publicbots.eu/servers]: Join router loaded.");

app.get("/:guildID/join", async (req,res) => {
	let data = await db.findOne({ id: req.params.guildID });
	if(!data) return res.redirect('/servers');
	if(!client.guilds.cache.get(data.id)) return res.redirect('/servers');
	let guild = client.guilds.cache.get(data.id);
    await db.updateOne({
                id: req.params.guildID
            }, {
                $inc: {
                    analytics_joins: 1
                }
    }
    )
	let urlInvite = data.link;
        res.redirect(urlInvite)


})


module.exports = app;
