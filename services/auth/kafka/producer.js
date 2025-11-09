import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
};

export default producer;