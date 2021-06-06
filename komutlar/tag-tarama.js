const Discord = require("discord.js");

exports.run = (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return;

let tag = args.slice(0).join(" ");
if(!tag) { return message.reply("Tag Etiketle.") }

const kullanicilar = message.guild.members.cache.filter(memberab => memberab.user.username.includes(tag)) 

const schawn = new Discord.MessageEmbed()
.setColor("GREEN")
.addField(`Sunucudaki \`${tag}\` Tagında Olan Kullanıcılar Şunlardır;`, kullanicilar.map(schawn => `${schawn} = \`${schawn.user.username}\``).join("\n") || `Hiç Bir Kullanıcının Adında \`${tag}\` Tagı Bulunamadı.`)
.setTimestamp()
 return message.channel.send(schawn)
}

exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ['tag-tarama', "tagtarama", "tag-taraması", "tagtaraması"],
 permLevel: 0
}
exports.help = {
 name: 'tag-tarama',
 description: 'tag-tarama',
 usage: 'tag-tarama'
}