const aoijs = require("aoi.js");
const bot = new aoijs.AoiClient({
  token:process.env.Token,
  prefix: "!",
  intents: ["GUILDS", "GUILD_MESSAGES"],
  mobilePlatform: true,
});

//status
//bot.status({
  //text: "Watch it",
  //type: "STREAMING",
  //url: "https://www.youtube.com/@AndikaNuriswara/channels",
//});
//Events
//bot.onMessage();

//Command Example (ping)
const loader = new aoijs.LoadCommands(bot);
loader.load(bot.cmd, "./commands/");

//Chat bot main command
bot.command({
  name: "$alwaysExecute",
  category: "Command Support",
  code: `
  $reply[$messageID;yes]
  $httpRequest[https://api.udit.tk/api/chatbot?message=$message&name=Disco&gender=Male&user=$authorId;GET;;message]
  $botTyping
  $cooldown[2s;{newEmbed:{description:\:_\:Stop Spam typing i need time to answering you!!!}{color:RED}}]

  $onlyIf[$checkContains[$message;@everyone;@here]==false;{newEmbed:{description:\:_\: Why you call anyone ?}{color:#ff0000}}]

  $onlyForChannels[$getServerVar[chatbotChannel];]

  $onlyIf[$getServerVar[chatbotChannel]!=;]
  $suppressErrors
  `,
});
bot.variables({
  money: 0,
  chatbotChannel: "",
});

const keepAlive = require("./server");



keepAlive();