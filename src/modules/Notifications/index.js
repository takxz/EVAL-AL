const PostNotification = require('./Application/PostNotification');
const ConsoleNotificationSender = require('./Infrastructure/ConsoleNotificationSender');
const { consumeNotificationRequest } = require('./Infrastructure/Consumer');

const service = new PostNotification(new ConsoleNotificationSender());

consumeNotificationRequest(service);
