const {
    Producer,
    Message,
    Consumer
} = require('rocketmq');
const co = require('co');

Producer.prototype._send = Producer.prototype.send;
Producer.prototype.send = async function(msg) {
    const self = this;
    const func =  co.wrap(function * (message) {
        return yield self._send(message);
    });

    return await func(msg);
};

Consumer.prototype._subscribe = Consumer.prototype.subscribe;

Consumer.prototype.subscribe = function(topic, subExpression) {
    subExpression = subExpression || '';
    const self = this;
    this._subscribe(topic, subExpression, function*(msg) {
        self.emit('mq_message', msg);
    });
};

module.exports = { Producer, Message, Consumer };