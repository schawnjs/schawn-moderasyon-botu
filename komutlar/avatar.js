const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = function (client, message, args) {

    let phto = ayarlar.photochat;

    if(message.channel.id !== phto) return message.channel.send("**Bu Komutu Sadece \`Photo Chat\` Kanalında Kullanabilirsin!**")

    let schawn = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    const avatar = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
     .setTitle("» Avatarın!")
     .setImage(schawn.avatarURL({ dynamic: true, format: "png", size: 1024 })) // eğer kullanıcının nitrosu varsa hareketli göstermesini sağlar  
       return message.channel.send(avatar);
  }

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["av","avatar"], 
  permLevel: 0 
};

exports.help = {
  name: 'avatar',
  description: 'Avatarınızı gösterir.',
  usage: 'avatar'
};