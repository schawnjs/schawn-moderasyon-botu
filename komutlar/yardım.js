const Discord = require("discord.js");
const { prefix } = require("../ayarlar.json");

exports.run = async (client, message, args) => {

     const schawn = new Discord.MessageEmbed()
      .setColor("#00ffeb")
      .setDescription(` 
      
    **Yetkili Komutları:**

     \`${prefix}ban:\` **\`Kullanıcıyı Sunucudan Banlarsınız.\`**
     \`${prefix}unban:\` **\`Kullanıcının Sunucudaki Banını Açarsınız.\`**
     \`${prefix}mute:\` **\`Kullanıcıya Süreli Mute Atarsınız.\`**
     \`${prefix}kick:\` **\`Kullanıcıyı Sunucudan Kicklersiniz.\`**
     \`${prefix}uyar:\` **\`Kullanıcıyı Özelden Uyarırsınız.\`**
     \`${prefix}sil:\` **\`Belirttiğiniz Adet Mesajı Silersiniz.\`**
     \`${prefix}vip:\` **\`Özel Kişiye Verilen Roldür.\`**
     \`${prefix}rol-bilgi:\` **\`Etiketlenen Rol Bilgilerine Bakarsınız.\`**
     \`${prefix}herkeserol-ver:\` **\`Etiketlediğiniz Rolü Sunucudaki Üyelere Dağıtır.\`**
     \`${prefix}snipe:\` **\`Silinen Son Mesaja Bakarsınız.\`**
     \`${prefix}tag-tarama:\` **\`Belirttiğiniz Tagdaki Üyeleri Gösterir.\`**
     \`${prefix}ban-bilgi:\` **\`ID'si Girilen Kullanıcının Ban Geçmişine Bakarsınız.\`**

      `)
      .setFooter("schâwn ❤️ Lawertz")
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