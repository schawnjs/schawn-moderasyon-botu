const Discord = require("discord.js");
const { prefix } = require("../ayarlar.json");

exports.run = async (client, message, args) => {

     const schawn = new Discord.MessageEmbed()
      .setColor("#00ffeb")
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setDescription(` 
      
    **__Yetkili Komutları:__**

     \`${prefix}ban\`  **Kullanıcıyı Sunucudan Banlarsınız.**
     \`${prefix}unban\`  **Kullanıcının Sunucudaki Banını Açarsınız.**
     \`${prefix}kick\`  **Kullanıcıyı Sunucudan Kicklersiniz.**
     \`${prefix}uyar\`  **Kullanıcıyı Özelden Uyarırsınız.**,
     \`${prefix}sil\`  **Belirttiğiniz Adet Mesajı Silersiniz.**
     \`${prefix}isim-değiştir\`  **Kullanıcının İsmini Değiştirirsiniz.**

  **__Ayarlamalı Komutlar:__**

   \`${prefix}küfür-engel\`  **${prefix}küfür-engel aç/kapat**
   \`${prefix}reklam-engel\`  **${prefix}reklam-engel aç/kapat**
   \`${prefix}ever-here-engel\`  **${prefix}ever-here-engel aç/kapat**
   \`${prefix}capslock-engel\`  **${prefix}capslock-engel aç/kapat**
 
      `)
      .setFooter("scháwn ❤️ Pulsé")
        return message.channel.send(schawn);
  }

exports.conf = {
  enabled: true,
  aliases: ['yardım', "help"],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  usage: 'yardım'
};
  