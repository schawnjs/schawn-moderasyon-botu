const Discord = require('discord.js');
const { prefix } = require("../ayarlar.json");
const db = require("quick.db");

exports.run = function (client, message, args) {
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu yetkiyi kullanmak için **Sunucuyu Yönet** yetkisine sahip olmalısın.")
   .then(x => x.delete({ timeout: 5000 })); 

   if(args[0] == "aç") {

      if(db.has(`saas_${message.guild.id}`))
        return message.channel.send(new Discord.MessageEmbed()
         .setDescription(`**Sa-as Sistemi Zaten Açık.**`)  
         .setColor("0x800d0d")
         .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
         .setTimestamp())
          .then(x => x.delete({ timeout: 5000 }));

       
       
       db.set(`saas_${message.guild.id}`, "acik")
       message.channel.send(new Discord.MessageEmbed()
       .setDescription(`**Başarıyla Sa-as** \`Açıldı!\``)
       .setColor("0x348f36")
       .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
       .setTimestamp())
        .then(x => x.delete({ timeout: 5000 })); // schâwn



   } 
   else if (args[0] == "kapat") {

     if(!db.has(`saas_${message.guild.id}`))
      return message.channel.send(new Discord.MessageEmbed()
       .setDescription(`**Sa-as Sistemi Zaten Kapalı.**`)      
       .setColor("0x800d0d")
       .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
       .setTimestamp())
        .then(x => x.delete({ timeout: 5000 }));


      db.delete(`saas_${message.guild.id}`, "kapali")
      message.channel.send(new Discord.MessageEmbed()
      .setDescription(`**Başarıyla Sa-as** \`Kapatıldı!\``)
      .setColor("0x348f36")
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setTimestamp())
       .then(x => x.delete({ timeout: 5000 })); // schâwn

      } 
           
 }
   
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["saas", "sa-as", "sa-as-engel", "sa-asengel"],
  permLevel: 0
};

exports.help = {
  name: "sa-as",
  usage: "sa-as"
};  