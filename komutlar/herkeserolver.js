const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return;

  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args[0]);
  
  if(!rol) return message.reply("Herkese Ne Rolü Verilsin?")

  message.react("<a:schawntik:834484844876398622>")

  const vrdi = new Discord.MessageEmbed()
  .setColor(rol.hexColor)
  .setDescription(`Sunucudaki Herkese Başarıyla ${rol} Rolü Verildi.`)

   message.guild.members.cache.forEach(brke => {
    brke.roles.add(rol) // herkese rolü verior
  });
  return message.channel.send(vrdi)
  .then(x => x.delete({ timeout: 5000 }))
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["herkeserolver", "herkese-rol-ver", "herkeserol-ver", "herkese-rolver"],
    permLevel: 0
}

exports.help = {
    name: 'herkeserolver',
    description: 'Herkese etiketlenen rolü verir.',
    usage: 'herkeserolver'
}