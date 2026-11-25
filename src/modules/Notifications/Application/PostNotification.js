class PostNotification{
    constructor(notificationSender){
        this.notificationSender = notificationSender;
    }

    async execute(message){

        const notification = {
            message,
            sentAt: new Date().toISOString()
        };

        await this.notificationSender.send(notification);

        return notification;
    }
}

module.exports = PostNotification;
