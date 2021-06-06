const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {

     //-----------------------KOD-BAŞLANGIÇ-----------------------\\

  if(!message.member.hasPermission("KİCK_MEMBERS")) return message.channel.send("Bu yetkiyi kullanabilmek için **Üyeleri At** yetkisine sahip olmalısın.")
  
     let sunucu = message.guild;
     let schawn = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
     let sebep = args.slice(1).join(' ') || "Sebep Belirtilmemiş";
     let uyarıkanal = ayarlar.uyarılog;

      if(!schawn) return message.reply("Uyarcağın Kullanıcıyı Belirtirmisin?")

      if(!sebep) return message.reply("Uyarma Sebebini Belirtirmisin?")

       else {
         schawn.send(new Discord.MessageEmbed()
           .setColor("RED")
           .setAuthor(message.member.displayName, message.author.avatarURL({ timeout: 5000 }))
           .setDescription(`**${sunucu}** Sunucusunda **${sebep}** sebebiyle uyarıldın. Bir daha tekrarlamaman dileğiyle..`) // Kullanıcı uyarıldı
           .setFooter("Bi daha yapma tmm mı.")
         )
       }

       message.react("<a:schawntik:834484844876398622>").then(() => {
       setTimeout(() => {
         
       message.delete() 
       }, 5000)
      })
        
      const uyar = new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.avatarURL())
       .setColor("0x348f36")
       .setDescription(`
           
              Uyaran Yetkili » ${message.author} (\`${message.author.id}\`)
              Uyarılan Kullanıcı » ${schawn} (\`${schawn.id}\`)
              Sebep » \`${sebep}\`
              Tarih » \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`

       `)
       .setFooter("schâwn ❤️ Lawertz")
       .setTimestamp()
       
       client.channels.cache
       .get(uyarıkanal)
       .send(uyar)
  }  // schawn

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