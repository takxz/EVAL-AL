const amqp = require('amqplib')

async function consumeNotificationRequest(service){
    const connection = await amqp.connect('amqp://localhost:5673');

    const channel = await connection.createChannel();

    const queue = 'notification.queue';

    await channel.assertQueue(queue, {durable: false});

    await channel.prefetch(1);

    console.log(`[Notification]: En attente de notifications dans ${queue}`)

    await channel.consume(queue, (message) => {
        if(!message){
            return;
        }
        try {
            const notif = JSON.parse(message.content.toString());

            console.log(`[Notifications]: Nofification reçue ${JSON.stringify(notif)}`)

            const notificationsToSend = service.execute(
                notif.message
            )

            console.log(`[Notification]: Notification envoyée ${JSON.stringify(notificationsToSend)}`)

            channel.ack(message);

        } catch(error){
            console.error(`[Notification]: Echec notification : ${error.message}`)
            channel.nack(message, false, false)
        }
    })

}

module.exports = {consumeNotificationRequest};