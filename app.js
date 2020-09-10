const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

const token = process.env.TOKEN_BETA;
let msg = null;
const botChannel = '696792174867513495';

const roles = [
	[ 'n1', '696752430968471633' ],
	[ 'n2', '696754699273109505' ],
	[ 'n3', '696754774204350526' ],
	[ 'n4', '696754951954628696' ],
	[ 'e1', '703235731958661293' ],
	[ 'e2', '703235929342738493' ],
	[ 'e3', '703236060330852373' ],
	[ 'e4', '703236259685990410' ],
	[ 'j1', '696755015527956651' ],
	[ 'j2', '696755071932825691' ],
	[ 'j3', '696755101850665000' ],
	[ 'j4', '696755216741171221' ],
	[ 'kissa', '707665336887148617' ],
	[ 'nh', '704578244376264714' ],
	[ 'eh', '704581903017181255' ],
	[ 'jh', '704581688528863295' ]
];

const isCommand = (msg) => {
	return msg[0] === '.';
};

const parseCommand = (msg) => {
	const space = msg.indexOf(' ');
	let command;
	let content;
	let cmd = {};
	if (space === -1) {
		command = msg.substr(1, msg.length);
		cmd = { command, content };
	} else {
		command = msg.substr(1, space - 1);
		content = msg.substr(space + 1, msg.length);
		cmd = { command, content };
	}
	return cmd;
};

const AddRole = (msg, role) => {
	//Add Role
	msg.member.roles.add(role);
	//Get Role Name
	const roleName = msg.guild.roles.cache.find((r) => r.id === role).name;
	//Message User
	msg.reply(`Du har fått rollen: ${roleName}`);
	console.log(`Added Role ${roleName} to user: ${msg.member.user.username}`);
};

const RemoveRole = (msg, role) => {
	msg.member.roles.remove(role);
	const roleName = msg.guild.roles.cache.find((r) => r.id === role).name;
	msg.reply(`Fjernet rollen: ${roleName}`);
	console.log(`Removed Role ${roleName} from user: ${msg.member.user.username}`);
};

const Tasukete = (msg) => {
	msg.channel.send('Hjelp :)');
};

const PerformCommand = (msg) => {
	const cmd = parseCommand(msg.content);
	// Show TASUKETE regardless of channel
	if (cmd.command === 'tasukete') {
		Tasukete(msg);
	}
	// Only perform role changes in the bot channel
	if (msg.channel.id === botChannel) {
		switch (cmd.command) {
			case 'n1':
				AddRole();
				break;
		}
	}
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
	if (isCommand(msg.content)) {
		PerformCommand(msg);
	}
});

client.login(token);
