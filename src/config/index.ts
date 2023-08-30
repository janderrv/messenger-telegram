import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

type ENV = {
	RABBITMQ_URL: string | undefined;
	TELEGRAM_QUEUE: string | undefined;
	CHAT_ID: string | undefined;
	TELEGRAM_TOKEN: string | undefined;
};

type Config = {
	RABBITMQ_URL: string;
	TELEGRAM_QUEUE: string;
	CHAT_ID: string;
	TELEGRAM_TOKEN: string;
};

const getConfig = (): ENV => {
	return {
		RABBITMQ_URL: process.env.RABBITMQ_URL,
		TELEGRAM_QUEUE: process.env.TELEGRAM_QUEUE,
		CHAT_ID: process.env.CHAT_ID,
		TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
	};
};

const getSanitzedConfig = (config: ENV): Config => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) {
			throw new Error(`Missing key ${key} in config.env`);
		}
	}
	return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
