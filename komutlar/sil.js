const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu komutu kullanmak için **Mesajları Yönet** yetkisine sahip olmalısın.") // scháwn
     .then(x => x.delete({ timeout: 5000 }))

  const sil = args[0];

   if(isNaN(sil)) return message.channel.send("Sadece Sayı Gir.")

   if(sil < 2) return message.reply("\`2\` Adetten Az Mesaj Silemezsin!")
   .then(x => x.delete({ timeout: 5000 }))
   if(sil > 100) return message.reply("\`100\` Adetten Fazla Mesaj Silemezsin!")
   .then(x => x.delete({ timeout: 5000 }))

    message.channel.bulkDelete(sil)

      return message.channel.send(`Başarıyla \`${sil}\` Adet Mesajı Sildin!`)
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