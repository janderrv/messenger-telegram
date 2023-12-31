import TelegramService from './services/telegram';
import RabbitMQService from './services/rabbitmq';
import config from './config';

const telegramService = new TelegramService(config.TELEGRAM_TOKEN);
const rabbitMQService = new RabbitMQService();

rabbitMQService.connect(config.RABBITMQ_URL).then(() => {
	console.log('RabbitMQ connected');
	rabbitMQService.consume(config.TELEGRAM_QUEUE, (message) => {
		console.log('Message received');
		const image = Buffer.from(message.image.data);
		telegramService.sendPhoto(config.CHAT_ID, image);
	});
});
