import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

let bot;

function initBot() {
    try {
        bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});
        bot.setMyCommands([
            {command: '/start', description: 'Start the Bot'},
        ]);
        return setupBotHandlers();
    }
    catch (error) {
        console.error('Error initializing bot:', error);
    }
}

function setupBotHandlers() {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Welcome to Solana Copy Trading Bot');
    });
}

// Add health check endpoint for Azure
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// Start Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Bot is running');
    initBot();
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
    if (bot) {
        bot.stopPolling();
    }
    process.exit(0);
});

process.on('SIGTERM', () => {
    if (bot) {
        bot.stopPolling();
    }
    process.exit(0);
});