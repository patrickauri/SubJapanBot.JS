const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

const token = process.env.TOKEN;
let msg = null;
const botChannel = '696849439133794384';
const demoChannel = '696792174867513495';
const debug = true;

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

const GetRoleID = (roleName) => {
	let found = false;
	let result;
	for (let i = 0; i < roles.length && found === false; i++) {
		if (roles[i][0] === roleName) {
			result = roles[i][1];
			found = true;
		}
	}
	return found === true ? result : null;
};

const GetRoleName = (msg, role) => {
	return msg.guild.roles.cache.find((r) => r.id === GetRoleID(role)).name;
};

const AddRole = (msg, role, mute) => {
	if (msg.member.roles.cache.some((r) => r.id === GetRoleID(role))) {
		RemoveRole(msg, role, mute);
	} else {
		msg.member.roles.add(GetRoleID(role));
		const roleName = msg.guild.roles.cache.find((r) => r.id === GetRoleID(role)).name;
		if (!mute) {
			const reply = `Du har fått rollen ( ${roleName} )というロールを付けました。`;
			msg.channel.send(reply);
		}
		console.log(`Added Role ${roleName} to user: ${msg.member.user.username}`);
	}
};

const RemoveRole = (msg, role, mute) => {
	msg.member.roles.remove(GetRoleID(role));
	const roleName = msg.guild.roles.cache.find((r) => r.id === GetRoleID(role)).name;
	if (!mute) {
		const reply = `Fjernet rollen: ( ${roleName} )というロールを消しました。`;
		msg.channel.send(reply);
	}
	console.log(`Removed Role ${roleName} from user: ${msg.member.user.username}`);
};

const Tasukete = (msg) => {
	const top = '**Skriv . etterfulgt av en rolle for å få rollen. 欲しいロールを．の後に付けたらロールを貰えます**\n';
	const roleDict = [
		[ 'Norsk ノルウェー語', [ 'n1', 'n2', 'n3', 'n4' ] ],
		[ 'Japansk 日本語', [ 'j1', 'j2', 'j3', 'j4' ] ],
		[ 'Engelsk 英語', [ 'e1', 'e2', 'e3', 'e4' ] ],
		[ 'Språkjelp 語学助手', [ 'nh', 'eh', 'jh' ] ]
	];
	let roleList = '';
	roleDict.forEach((e, i) => {
		roleList += `*${e[0]}*\n`;
		roleList += '```';
		e[1].forEach((e2) => {
			roleList += `.${e2} -> ${GetRoleName(msg, e2)}\n`;
		});
		roleList += '```';
	});
	const s = top + roleList;
	msg.channel.send(s);
};

const AddAndRemoveRoles = (msg, addRole, removeRoles) => {
	removeRoles.forEach((r) => {
		RemoveRole(msg, r, true);
	});
	AddRole(msg, addRole);
};

const PurgeMessages = (msg, cmd) => {
	const f = 'Syntax: .purge + antall meldinger å slette';
	if (msg.member.roles.cache.has('696727197968236634')) {
		if (cmd.content === undefined) {
			msg.reply(f);
		} else {
			msg.channel.bulkDelete(cmd.content).then().catch(() => msg.reply(f));
		}
	} else {
		console.log(`${msg.member.name} tried to purge.`);
	}
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
	if (isCommand(msg.content)) {
		const cmd = parseCommand(msg.content);
		// Show TASUKETE regardless of channel
		if (cmd.command === 'tasukete') {
			Tasukete(msg);
		}
		if (cmd.command === 'purge') {
			PurgeMessages(msg, cmd);
		}
		// Only perform role changes in the bot channel
		if (msg.channel.id === botChannel) {
			switch (cmd.command) {
				case 'n1':
					AddAndRemoveRoles(msg, 'n1', [ 'n2', 'n3', 'n4' ]);
					break;
				case 'n2':
					AddAndRemoveRoles(msg, 'n2', [ 'n1', 'n3', 'n4' ]);
					break;
				case 'n3':
					AddAndRemoveRoles(msg, 'n3', [ 'n2', 'n1', 'n4' ]);
					break;
				case 'n4':
					AddAndRemoveRoles(msg, 'n4', [ 'n2', 'n3', 'n1' ]);
					break;
				case 'j1':
					AddAndRemoveRoles(msg, 'j1', [ 'j2', 'j3', 'j4' ]);
					break;
				case 'j2':
					AddAndRemoveRoles(msg, 'j2', [ 'j1', 'j3', 'j4' ]);
					break;
				case 'j3':
					AddAndRemoveRoles(msg, 'j3', [ 'j2', 'j1', 'j4' ]);
					break;
				case 'j4':
					AddAndRemoveRoles(msg, 'j4', [ 'j2', 'j3', 'j1' ]);
					break;
				case 'e1':
					AddAndRemoveRoles(msg, 'e1', [ 'e2', 'e3', 'e4' ]);
					break;
				case 'e2':
					AddAndRemoveRoles(msg, 'e2', [ 'e1', 'e3', 'e4' ]);
					break;
				case 'e3':
					AddAndRemoveRoles(msg, 'e3', [ 'e2', 'e1', 'e4' ]);
					break;
				case 'e4':
					AddAndRemoveRoles(msg, 'e4', [ 'e2', 'e3', 'e1' ]);
					break;
				case 'nh':
					AddRole(msg, 'nh');
					break;
				case 'jh':
					AddRole(msg, 'jh');
					break;
				case 'eh':
					AddRole(msg, 'eh');
					break;
			}
		}
	}
});

client.login(token);
