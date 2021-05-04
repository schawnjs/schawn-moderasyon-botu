const Discord = require('discord.js');
const { prefix } = require("../ayarlar.json");
const db = require("quick.db");

exports.run = function (client, message, args) {

      if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu komutu kullanmak için **Sunucuyu Yönet** yetkisine sahip olmalısın.")
       .then(x => x.delete({ timeout: 5000 }));     
 
    if(args[0] == "aç") {

        if(db.has(`capscik_${message.guild.id}`))
          
         return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Caps-lock Engel Zaten Açık.**`)
            .setColor("0x800d0d")
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setTimestamp())
             .then(x => x.delete({ timeout: 5000 }));
    
        db.set(`capscik_${message.guild.id}`, "acik");
        
          const scháwn = new Discord.MessageEmbed()
          .setColor("0x800d0d")
          .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
          .setDescription(`**Başarıyla Caps-lock Engeli** \`Açtın!\``)
          .setTimestamp()
           return message.channel.send(scháwn)
            .then(x => x.delete({ timeout: 5000 })); 
    }

    else if(args[0] == "kapat") {

       if(!db.has(`capscik_${message.guild.id}`))
          
         return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Caps-lock Engel Zaten Kapalı.**`)
            .setColor("0x800d0d")
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setTimestamp())
             .then(x => x.delete({ timeout: 5000 }));

        db.delete(`capscik_${message.guild.id}`);
         
         const scháwn = new Discord.MessageEmbed()
         .setColor("0x800d0d")
         .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
         .setDescription(`**Başarıyla Caps-lock Engeli** \`Kapattın!\``)
         .setTimestamp()
          return message.channel.send(scháwn)
           .then(x => x.delete({ timeout: 5000 }));
    }
  }

  exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["caps-engel", "caps"], 
  permLevel: 0 
};

exports.help = {
  name: 'capslock-engel',
  usage: 'capslock-engel'
};