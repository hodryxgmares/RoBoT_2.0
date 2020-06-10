var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('You can\'t use that!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('tu doit mentionner un utilisateur !  ');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply('They aren\'t in the server!');
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Je ne peut pas kick cette utilisateur  !');

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('tu n\'a pas dit la raison !');

    var channel = msg.guild.channels.cache.find(c => c.name === 'logs');

    var log = new Discord.MessageEmbed()
    .setTitle('l\'utilisateur kick ')
    .addField('utilisateur :', user, true)
    .addField('par:', msg.author, true)
    .addField('la raison:', reason)
    .setColor("#ff0000")
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('tu a été kick pour la raison suivant  :')
    .setDescription(reason);

    try {
        await user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    member.kick(reason);

    msg.channel.send(`**${user}** has been kicked by **${msg.author}**!`);
}