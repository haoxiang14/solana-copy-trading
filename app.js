import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Add more detailed logging
console.log('Starting application...');
console.log('Port:', port);
console.log('Bot token exists:', !!process.env.TELEGRAM_BOT_TOKEN);

// Simple route to keep Azure happy
app.get('/', (req, res) => {
    res.send('Bot is alive');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

try {
    // Start bot
    console.log('Initializing bot...');
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});
    
    bot.on('error', (error) => {
        console.error('Bot error:', error);
    });

    bot.on('polling_error', (error) => {
        console.error('Polling error:', error);
    });

    bot.onText(/\/start/, (msg) => {
        console.log('Received start command from:', msg.chat.id);
        bot.sendMessage(msg.chat.id, 'Welcome to Solana Copy Trading Bot')
            .then(() => console.log('Welcome message sent'))
            .catch(err => console.error('Error sending welcome message:', err));
    });

    console.log('Bot setup completed');
} catch (error) {
    console.error('Error setting up bot:', error);
}