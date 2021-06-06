const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = function (client, message, args) {

    let schawn = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    let phto = ayarlar.photochat;

    if(message.channel.id !== phto) return message.channel.send("Bu Komutu Sadece <#847578739080298506> Kanalında Kullanabilirsin!")
    
    const avatar = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription(`**Avatarın Aşağıda.**`)
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