import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';   

dotenv.config();

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
        console.log('Error initializing bot');
    }
}

function setupBotHandlers() {
    
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, 'Welcome to Solana Copy Trading Bot');
    });
}


console.log('Bot is running');

initBot();