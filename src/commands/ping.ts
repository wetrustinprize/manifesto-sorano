import { Command } from "types/command";

const command: Command = {
  description: 'Replies with "Pong!"',
  execute: async (interaction) => {
    await interaction.reply("Pong!");
  },
};

export default command;
