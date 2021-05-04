const Discord = require('discord.js');
const { prefix } = require("../ayarlar.json");
const db = require("quick.db");

exports.run = async (client, message, args) => {

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanmak için yeterli yetkiye sahip değilsin.")
      .then(x => x.delete({ timeout: 5000 }))

       if(args[0] == "aç") {
            if(db.has(`rklm_${message.guild.id}`))
                return message.channel.send(new Discord.MessageEmbed()
                 .setDescription(`**Reklam Engel Zaten Açık.**`)
                 .setColor("0x800d0d")
                 .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
                 .setTimestamp())
                  .then(x => x.delete({ timeout: 5000 }));

                  db.set(`rklm_${message.guild.id}`, "acik");
                   message.channel.send(new Discord.MessageEmbed()
                   .setDescription(`**Başarıyla Reklam Engeli** \`Açtın!\``)
                   .setColor("0x348f36")
                   .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
                   .setTimestamp())
                    .then(x => x.delete({ timeout: 5000 }))
         } 

          else if(args[0] == "kapat") {

            if(!db.has(`rklm_${message.guild.id}`))
            return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Reklam Engel Zaten Kapalı.**`)
            .setColor("0x800d0d")
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setTimestamp())
             .then(x => x.delete({ timeout: 5000 }));

            db.delete(`rklm_${message.guild.id}`);
             message.channel.send(new Discord.MessageEmbed()
              .setDescription(`**Başarıyla Reklam Engeli** \`Kapattın!\``)
              .setColor("0x348f36")
              .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
              .setTimestamp())
               .then(x => x.delete({ timeout: 5000 }))
         }              
   }
     
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reklam", "reklam-engel", "reklamengel"],
  permLevel: 0
};

exports.help = {
  name: "reklam-engel",
  usage: "reklam-engel"
};  
