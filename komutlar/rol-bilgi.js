const Discord = require("discord.js");

exports.run = async (client, message, args) => {

 if(!message.member.hasPermission("ADMINISTRATOR")) return;

 let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

 if(!rol) return message.reply("Rol Etiketle.")

 const embed = new Discord.MessageEmbed()
 .setDescription(`
 
 **Rol Bilgileri:**

 ═════════════════════════════════

 \`•\` Rol Adı: ${rol}
 \`•\` Rol ID: (\`${rol.id}\`)
 \`•\` Rol Rengi: ${rol.color}

 
 `)
 
 return message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rol", "rol-bilgi", "rolbilgi"],
  permLevel: 0
};

exports.help = {
  name: "rol-bilgi",
  usage: "rol-bilgi"
};  


