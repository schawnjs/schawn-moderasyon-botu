const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {

let yetkilicik = ayarlar.banhammer;

if(!message.member.roles.cache.get("847578555247755268") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin <@&${yetkilicik}> Yetkisine Sahip Olmak Zorundasın.`)

if(!args[0]) { return message.channel.send(`Ban geçmişine bakcağın kişinin ID'sini girmelisin.`) }

    message.guild.fetchBan(args.slice(0).join(" ")).then(({ user, reason }) => message.channel.send(new Discord.MessageEmbed()
     .setAuthor(user.username, user.avatarURL({ dynamic: true }))
     .setColor("#ee7600")
     .setDescription(`
      
     Yasaklanan Kullanıcı: ${user} - (\`${user.id}\`)
     Yasaklanma Sebebi: \`${reason}\`
     
     `)
     .setTimestamp()
     .setFooter("schâwn ❤️ Lawertz")
    )); 
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ban-info', 'ban-geçmişi', "bangeçmişi", "baninfo", "banbilgi", "ban-bilgi"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ban-bilgi',
    usage: "ban-bilgi"
  }