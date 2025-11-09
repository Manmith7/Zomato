import express from 'express'
import dotenv from 'dotenv'
import { runConsumer } from './kafka/consumer.js';
import { log } from 'console';
dotenv.config()

const app = express()


const PORT = process.env.PORT || 3006

try {
    (async () => {
        try {
            console.log('📦 Starting Kafka consumer...');
            await runConsumer();
        } catch (err) {
            console.error('❌ Error starting consumer:', err);
            process.exit(1);
        }
    })();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Notification Service listening on ${PORT}`);
    })
} catch (error) {
    console.log("Some thing went wrong unable to connect something");
    
}
