const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanmak için **Mesajları Yönet** yetkisine sahip olmalısın.") // scháwn
     .then(x => x.delete({ timeout: 5000 }))

   if(isNaN(args)) return message.channel.send("**Sadece Sayı Girermisin?**")

   if(args[0] < 2) return message.reply("\`2\` **Adetten Az Mesaj Silemezsin!**")
   if(args[0] > 100) return message.reply("\`100\` **Adetten Fazla Mesaj Silemezsin!**")
   message.channel.bulkDelete(Number(args[0]))

      return message.channel.send(`**Başarıyla \`${args[0]}\` Adet Mesajı Sildin!**`)
       .then(x => x.delete({ timeout: 5000 }))  
     }

exports.conf = {
  aliases: ["sil", "temizle", "clear"],
  usage: ".sil 1-100",
  description: "Belirtilen mesaj sayısı kadar mesaj temizler."
};

exports.help = {
  name: "sil"
};


