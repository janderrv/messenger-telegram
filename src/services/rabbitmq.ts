import { Connection, Channel, connect, ConsumeMessage } from 'amqplib';

type IRabbitMQ = {
	connect(url: string): Promise<void>;
};

type Message = {
	image: {
		type: string;
		data: string;
	};
};

export default class RabbitMQService implements IRabbitMQ {
	private connection!: Connection;
	private channel!: Channel;

	public async connect(url: string) {
		this.connection = await connect(url);
		this.channel = await this.connection.createChannel();
	}

	private async createQueue(queue: string) {
		return this.channel.assertQueue(queue);
	}
	public async consume(queue: string, callback: (message: Message) => void) {
		await this.createQueue(queue);

		return this.channel.consume(queue, (msg: ConsumeMessage | null) => {
			if (!msg) return;
			callback(JSON.parse(msg.content.toString()));
			this.channel.ack(msg);
		});
	}
}
