// kafka/consumer.js
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import { handleOnboardingEmail } from '../utils/onboard-email.js';

dotenv.config();

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [process.env.KAFKA_BROKERS]
});

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

export const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: false });

  console.log(`📥 Subscribed to topic: ${process.env.KAFKA_TOPIC}`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const rawValue = message.value.toString();
      const user = JSON.parse(rawValue); // the user data sent from auth-service

      console.log(`📧 Received message on topic ${topic}:`, user);

      // Call your email handler
      await handleOnboardingEmail(user);
    }
  });
};
