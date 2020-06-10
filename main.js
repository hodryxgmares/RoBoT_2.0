/*
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
    ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/

var config = require('./config.json');
var Discord = require('discord.js');
var client = new Discord.Client();

client.on('ready', async() => {
    console.log('Hello!');
});

client.on('message', async(msg) => {
    if(msg.author.bot) return;
    if(!msg.guild) return;

    var prefix = config.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;

    var args = msg.content.split(' ');
    var cmd = args.shift().slice(prefix.length).toLowerCase();

    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);
    } catch(err) {
        console.warn(err);
    }
});

////////////random dice//////////////

client.on('message', message => {
  if (message.content === 'choosedice') {
    var choosedice_embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("choisi ton D#(plus le numéro que tu a choisi entre 1 à 6) et mentionnne toi")
  .setImage('https://tse1.mm.bing.net/th?id=OIP.ZLMVUBYFb-m1Omubrd_AIgHaFj&pid=Api&P=0&w=281&h=211')

  message.channel.send(choosedice_embed);


  }
});

const randomDice = () => Math.floor(Math.random() * 6) + 1;

client.on('message', message => {
 
  if (message.content === 'dice') {
    var dice_embed = new Discord.MessageEmbed()
  .setColor("#d54e12")
  .setTitle("Random Dice")
  .setThumbnail('https://tse1.mm.bing.net/th?id=OIP.ZLMVUBYFb-m1Omubrd_AIgHaFj&pid=Api&P=0&w=281&h=211')
  .addFields(
    { name: "D#1", value: randomDice(), inline: true },
    { name: "D#2", value: randomDice(), inline: true },
    { name: "D#3", value: randomDice(), inline: true }
  )
  .addFields(
    { name: "D#4", value: randomDice(), inline: true },
    { name: "D#5", value: randomDice(), inline: true },
    { name: "D#6", value: randomDice(), inline: true }
  );

message.channel.send(dice_embed);

    }

});


//////ping////////
client.on('message', message => {
  if (message.author.client) return;
  if (message.channel.type === "dm" ) return;

const cmd = message.content.split(' ')[0].slice(prefix.length);
const args = message.content.split(' ').slice(1);


if (cmd === "ping") {
  message.channel.send(`${client.ws.ping}ms`);
  
}

});


client.on('message', msg => {

  if (msg.content === 'msg') {

}
});

client.login(config.token);
