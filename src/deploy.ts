import * as prompts from "prompts";
import * as dotenv from "dotenv";
import Commands from "./commands";
import { REST, Routes, SlashCommandBuilder } from "discord.js";
dotenv.config();

(async () => {
  const response = await prompts({
    type: "select",
    name: "server",
    message: "Select a server to deploy to",
    choices: [
      { title: "Development server", value: "dev" },
      { title: "Global", value: "global" },
    ],
  });

  const token: string = process.env.DISCORD_TOKEN;
  const appId: string = process.env.DISCORD_APP_ID;
  const guildId: string | undefined =
    response.server === "dev" ? process.env.DEV_GUILD_ID : undefined;

  const rest = new REST({ version: "10" }).setToken(token);

  console.log("Deploying to " + response.server + "...");

  // Commands deploy
  const commandsJson = [];
  Commands.forEach((v, k) => {
    const data = new SlashCommandBuilder()
      .setName(k)
      .setDescription(v.description)
      .toJSON();

    commandsJson.push(data);
  });

  try {
    console.log(
      `Started refreshing ${commandsJson.length} application (/) commands.`
    );

    await rest.put(
      guildId
        ? Routes.applicationGuildCommands(appId, guildId)
        : Routes.applicationCommands(appId),
      {
        body: commandsJson,
      }
    );

    console.log(
      `Successfully reloaded ${commandsJson.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
