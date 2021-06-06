const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu Komutu Kullanabilmek İçin **Mesajları Yönet** Yetkisine Sahip Olmanız Gerekiyor.")

  let tag = ayarlar.tag;
  let tagg = message.guild.members.cache.filter(t => t.user.username.includes(tag)).size;

  let aktif = message.guild.members.cache.filter(a => a.presence.status !== "offline").size;

  let toplam = message.guild.memberCount;

  const seskanallari = message.guild.channels.cache.filter(c => c.type === "voice")
  let count = 0;

  for (const [id,voiceChannel] of seskanallari) 
  count += voiceChannel.members.size;

  let boost = message.guild.premiumSubscriptionCount;

  let schawn = new Discord.MessageEmbed()
   .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
   .setColor("#06001f")
   .setDescription(`

  **\`>\`** Sunucuda toplam **${toplam}** üye var (**${aktif}** tanesi aktif)
  **\`>\`** Sunucuda tag alan toplam **${tagg}** üye var.
  **\`>\`** Sunucudaki sesli sohbetlerde **${count}** üye bulunmakta.
  **\`>\`** Sunucuya toplam **${boost}** adet boost basılmış.`)

    .setFooter("schâwn ❤️ Lawertz")
    return message.channel.send(schawn);
 } // schâwn

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "say"
};