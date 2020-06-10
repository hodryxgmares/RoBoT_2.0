var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('You can\'t use that!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('Tu doit mentionner un utilisateur !');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }


    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('Tu n\'a pas dit la raison !');

    try {
      await user.send(embed);
  } catch(err) {
      console.warn(err);
  }


    var embed = new Discord.MessageEmbed()
    .setTitle('message')
    .setColor("#d54e12")
    .setDescription(reason);



     // This should not be user.id like I said in my video. I made a mistake. Sorry! :)


    msg.channel.send(`**${msg.author}** à envoyer un message à : **${user}**!`);
}
