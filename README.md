RocketMQ Client

从某大佬的 SDK [RocketMQ](https://www.npmjs.com/package/rocketmq) 封装而来

## Install

```sh
npm install rocketmq --save
```

## Usage

consumer

```javascript
const { Consumer } = require('wm-rocketmq');
const httpclient = require('urllib');

const consumer = new Consumer({
    namesrvAddr: '127.0.0.1:9876',
    consumerGroup: 'your-consumer-group',
    httpclient,
    // logger, 
    isBroadcast: false, // default is false, that mean messages will be pushed to consumer cluster only once.
});

consumer.on('mq_message', function(msg) {
    // msg
});

consumer.on('error', function(err) {
    // error
});

consumer.subscribe(config.topic, config.tags);
```

producer

```javascript
const { Message, Producer } = require('wm-rocketmq');
const httpclient = require('urllib');

const producer = new Producer({
    namesrvAddr: '127.0.0.1:9876', // for rocket mq
    httpclient,
    // logger, 
    producerGroup: 'your-producer-group'
});

const msg = new Message(config.topic, // topic
    config.tags, // tag
    'Hello ONS !!! ' // body
);

setTimeout(async () => {
    const result = await producer.send(msg);
}, 0);
```