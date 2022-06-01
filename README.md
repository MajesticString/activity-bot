# Activity Discord Bot

This is a bot that lets users start activities in voice channels, even if the server doesn't have activities enabled yet.

This bot exists purely to show how to start an activity in a voice channel; if you want to use this bot, you will have to self-host it.

Both a Typescript and Javascript versions are provided.

## Inspiration

This bot was heavily inspired by the [Activities bot](https://github.com/advaith1/activities).
The major difference is this bot is built with NodeJS/discord.js, instead of Cloudflare Workers/vanilla JS

## Self Hosting

Clone this repo, and cd into it:

```sh
git clone https://github.com/MajesticString/activity-bot.git
cd ./activity-bot
```

Install dependencies

```sh
npm i
# or
yarn
# or
pnpm i
```

Fill in the config.js (an example is provided)

Run the bot:

```sh
npm run start
```
