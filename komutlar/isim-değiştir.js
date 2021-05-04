const Discord = require("discord.js");

exports.run = async (client, message, args) => {

if (!message.member.hasPermission("KICK_MEMBERS"))
   return message.reply(`Bu yetkiyi kullanabilmek için **Kullanıcıları At** yetkisine sahip olmak zorundasın.`); // scháwn

    const scháwn = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

     if(!scháwn) return message.channel.send("**Kimin Adını Değiştireceksin?**")
      
      scháwn.setNickname(args.slice(1).join(" ")).then(() => {
          return message.channel.send(`**\`${scháwn.user.username}\` Adlı Kişinin Adını Başarıyla \`${args.slice(1).join(" ")}\` Olarak Değiştirdin!**`)
           .then(x => x.delete({ timeout: 5000 }))
      }) .catch(() => { // Eğer hata olursa alttakini dicek

          return message.channel.send(`**Bu Kişinin Adını Değiştiremezsin!**`)
          .then(x => x.delete({ timeout: 5000 }))
      })

   } // scháwn


exports.conf = {
  aliases: ["isim-değiştir", "isimdeğiştir", "isim"],
  permLevel: 0
};

exports.help = {
  name: "isim"
};

  