const NotificationSender = require('../Application/Port/NotificationSender');

class ConsoleNotificationSender extends NotificationSender {
    async send(notification) {
        console.log(`[Notification]: ${notification.sentAt} - ${notification.message}`);
    }
}

module.exports = ConsoleNotificationSender;
