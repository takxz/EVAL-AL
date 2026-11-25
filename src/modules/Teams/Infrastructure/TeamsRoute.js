const express = require('express');
const amqp = require('amqplib');

const queue = 'notification.queue';

async function sendNotification(message){
    const connection = await amqp.connect('amqp://localhost:5673');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({ message })));
    console.log(`[Notification]: Message envoyé dans ${queue} : ${message}`)

}

function getTeamsRoute(getTeams){
    const router = express.Router();

    router.get('/', async (req, res, next) => {
        try {
            sendNotification('Teams Recu');
            const teams = await getTeams.execute();
            if(!teams){
                return res.status(404).json({ message: "No teams found" });
            }
            res.json(teams)
        } catch (error) {
            next(error)
        }
    });

    return router;
}

module.exports = getTeamsRoute;