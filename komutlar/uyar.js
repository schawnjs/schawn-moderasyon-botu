const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {

     //-----------------------KOD-BAŞLANGIÇ-----------------------\\

  if(!message.member.hasPermission("KİCK_MEMBERS")) return message.channel.send("Bu yetkiyi kullanabilmek için **Üyeleri At** yetkisine sahip olmalısın.")
  
     let sunucu = message.guild;
     let scháwn = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
     let sebep = args.slice(1).join(' ') || "Sebep Belirtilmemiş";
     let uyarıkanal = ayarlar.uyarılog;

      if(!scháwn) return message.channel.send("**Uyarcağın Kullanıcıyı Belirtirmisin?**")

      if(!sebep) return message.channel.send("**Uyarma Sebebini Belirtirmisin?**")

       else {
         scháwn.send(new Discord.MessageEmbed()
           .setAuthor("Uyarıldın",message.guild.iconURL())
           .setDescription(`**${sunucu}** Sunucusunda **${sebep}** sebebiyle uyarıldın. Bi daha tekrarlamaman dileğiyle..`)  // Kullanıcı uyarıldı
           .setColor(`RED`)
         )
       }

      const uyar = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setColor("0x348f36")
       .setDescription(`
           
              Uyaran Yetkili » ${message.author} (\`${message.author.id}\`)
              Uyarılan Kullanıcı » ${scháwn} (\`${scháwn.id}\`)
              Sebep » \`${sebep}\`
              Tarih » \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`

       `)
       .setFooter("scháwn ❤️ Pulsé")
       .setTimestamp()
       
       client.channels.cache
       .get(uyarıkanal)
       .send(uyar)
  }  // scháwn

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uyarı", "uyarıver",],
  permlevel: 0
};

exports.help = {
  name: "uyar",
  description: "Belirtilen kullanıcıyı özel mesajlarında gözükecek şekilde uyarır.",
  usage: "uyarı"
};
