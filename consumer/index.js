/**
 * Created by betty on 10/30/18.
 */
"use strict";
const Promise = require('bluebird');

const {connect} = require('../util/rabbitmq');

const workers = [
  require('./userMessageConsumer'),
];

const consumers = async () => {
  const conn = await connect().catch(console.warn);
  const ch = await conn.createChannel();
  ch.prefetch(1);
  await Promise.map(workers, async ({name, fn, noAck = false}) => {
    const doWork = async (msg) => {
      let body;
      try {
        body = JSON.parse(msg.content.toString());
        await fn(body);
      } catch (err) {
        console.error(`doWork: ${err}`);
        console.error(`work data:  ${body}`)
      }
    };

    await ch.assertQueue(name, {durable: true});
    await ch.consume(name, doWork, {noAck});

  });

};

consumers();


