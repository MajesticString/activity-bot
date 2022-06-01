import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { ChannelType, Routes } from 'discord-api-types/v10';
import { Client } from 'discord.js';
import { InviteTargetType } from 'discord.js/typings/enums';
import { token } from './config';

const client = new Client({
  intents: ['GUILDS'],
});

client.on('ready', async () => {
  const rest = new REST({ version: '10' }).setToken(token);

  rest.put(Routes.applicationCommands(client.user?.id ?? ''), {
    body: [
      new SlashCommandBuilder()
        .setName('activity')
        .setDescription('Creates a Discord activity in a voice channel')
        .addChannelOption((i) =>
          i
            .setName('channel')
            .setDescription('The voice channel to create the activity in')
            .addChannelTypes(ChannelType.GuildVoice)
            .setRequired(true)
        )
        .addStringOption((i) =>
          i
            .setName('activity')
            .setDescription('The activity to start')
            .setRequired(true)
            .setChoices(
              {
                name: 'Watch Together',
                value: '880218394199220334',
              },
              {
                name: 'Sketch Heads (new Doodle Crew)',
                value: '902271654783242291',
              },
              {
                name: 'Word Snacks',
                value: '879863976006127627',
              },
              {
                name: 'Putt Party (New! Requires Boost Level 1)',
                value: '945737671223947305',
              },
              {
                name: 'Land-io (New! Requires Boost Level 1)',
                value: '903769130790969345',
              },
              {
                name: 'Poker Night (Requires Boost Level 1)',
                value: '755827207812677713',
              },
              {
                name: 'Chess In The Park (Requires Boost Level 1)',
                value: '832012774040141894',
              },
              {
                name: 'Checkers In The Park (Requires Boost Level 1)',
                value: '832013003968348200',
              },
              {
                name: 'Blazing 8s (New!, formerly Ocho) (Requires Boost Level 1)',
                value: '832025144389533716',
              },
              {
                name: 'Letter League (formerly Letter Tile) (Requires Boost Level 1)',
                value: '879863686565621790',
              },
              {
                name: 'SpellCast (Requires Boost Level 1)',
                value: '852509694341283871',
              }
            )
        )
        .addBooleanOption((i) =>
          i
            .setName('public')
            .setRequired(false)
            .setDescription(
              'Whether the invite should be public. Defaults to true.'
            )
        )
        .toJSON(),
    ],
  });
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    switch (interaction.commandName) {
      case 'activity':
        const channel = interaction.options.getChannel('channel', true);
        if (channel.type !== 'GUILD_VOICE')
          return interaction.reply('That is not a voice channel.');
        const invite = await channel.createInvite({
          targetType: InviteTargetType.EMBEDDED_APPLICATION,
          maxAge: 0,
          targetApplication: interaction.options.getString('activity', true),
        });
        interaction.reply({
          content: `https://discord.gg/${invite.code}`,
          ephemeral: interaction.options.getBoolean('public', false) ?? false,
        });
        break;
    }
  }
});

client.login(token);
