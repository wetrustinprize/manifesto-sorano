/* eslint-disable @typescript-eslint/no-var-requires */

import * as path from "path";
import * as fs from "fs";

import { Command } from "types/command";

const Commands = new Map<string, Command>();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  const commandName = filePath.replace(/^.*[\\\/]/, "").replace(".ts", "");

  console.log({ commandName });

  if (command.default as Command) {
    Commands.set(commandName, command.default as Command);
  }
}

console.log("Commands loaded: " + Commands.size + " commands.");

export default Commands;
