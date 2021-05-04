const Discord = require("discord.js");

module.exports = {
    name: ["vip", "vip-ver", "vipver"],

    async run (client, message, args) {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    let kullanici = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let rol = "832269323996758016";

    if(!kullanici) return;
 
    kullanici.roles.add(rol)
    return message.channel.send(new Discord.MessageEmbed()
     .setColor("GREEN")
     .setDescription(`${kullanici} Kişisine başarıyla ${rol} verdin.`)
    )
    }
}