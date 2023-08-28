import TelegramBot from 'node-telegram-bot-api';

export default class TelegramService {
	private bot: TelegramBot;

	constructor(token: string) {
		this.bot = new TelegramBot(token, { polling: true });
	}

	public sendPhoto(chatId: string, photo: Buffer) {
		this.bot.sendPhoto(chatId, photo);
	}
}
