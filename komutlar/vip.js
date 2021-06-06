const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    let schawnxd = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let rol = message.guild.roles.cache.get("847578577758191656")

    if(!schawnxd) { 
      return message.reply("Kime Vip Vercen.")
      .then(x => x.delete({ timeout: 5000 })) 
    }

    schawnxd.roles.add(rol) // kullanıcıya vip verior 

    message.react("<a:schawntik:834484844876398622>")

    return message.channel.send(new Discord.MessageEmbed()
     .setColor("#f1c40f")
     .setDescription(`${schawnxd} Kişisine başarıyla <@&847578577758191656> rolünü verdin!`))
     .then(x => x.delete({ timeout: 5000 }));
  }

 exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["vip", "vip-ver", "vipver"], 
  permLevel: 0 
};

exports.help = {
  name: 'vip',
  usage: 'vip'
};