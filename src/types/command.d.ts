import { ChatInputCommandInteraction } from "discord.js";

export type Command = {
  description: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
};
