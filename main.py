import logging
import os

import discord
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()
token: str = str(os.getenv("DISCORD_TOKEN"))

handler = logging.FileHandler(filename="discord.log", encoding="utf-8", mode="w")
intents = discord.Intents.default()
intents.message_content = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)


@bot.event
async def on_ready() -> None:
    print(f"=== {bot.user} logged in. ===")


@bot.event
async def on_message(message: discord.Message) -> None:
    if message.author == bot.user:
        return

    await process_message(message)


def main() -> None:
    bot.run(token, log_handler=handler, log_level=logging.INFO)


if __name__ == "__main__":
    main()
