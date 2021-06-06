const Discord = require('discord.js');
const { prefix } = require("../ayarlar.json");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu yetkiyi kullanmak için **Sunucuyu Yönet** yetkisine sahip olmalısın.")
  .then(x => x.delete({ timeout: 5000 }))

   if(args[0] === "aç") {

      if(db.has(`evr_${message.guild.id}`))
        return message.channel.send(new Discord.MessageEmbed()
         .setDescription(`**Ever Sistemi Zaten Açık.**`)  
         .setColor("0x800d0d")
         .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
         .setTimestamp())
          .then(x => x.delete({ timeout: 5000 }));
              
       db.set(`evr_${message.guild.id}`, "acik");
       message.channel.send(new Discord.MessageEmbed()
       .setDescription(`**Başarıyla Ever Engeli** \`Açtın!\``)
       .setColor("0x348f36")
       .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
       .setTimestamp())
        .then(x => x.delete({ timeout: 5000 })); // undefined
   }

   else if (args[0] === "kapat") {

     if(!db.has(`evr_${message.guild.id}`))
      return message.channel.send(new Discord.MessageEmbed()
       .setDescription(`**Ever Sistemi Zaten Kapalı.**`)  
       .setColor("0x800d0d")
       .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
       .setTimestamp())
        .then(x => x.delete({ timeout: 5000 }));

      db.delete(`evr_${message.guild.id}`);
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`**Başarıyla Ever Engel** \`Kapatıldı!\``)
      .setColor("0x348f36")
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setTimestamp())
       .then(x => x.delete({ timeout: 5000 })); // undefined
    }            
  }

 exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["ever-engel", "ever", "ever-here-engel"], 
  permLevel: 0 
};

exports.help = {
  name: 'ever-engel',
  usage: 'ever-engel'
};