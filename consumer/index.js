/**
 * Created by betty on 10/30/18.
 */
"use strict";
const Promise = require('bluebird');

const {connect} = require('../util/rabbitmq');
const {userMessageManager} = require('../manager/userMessageManager');

const directConsumers = async (conn) => {
  const ch = await conn.createChannel();
  ch.prefetch(1);

  const workers = [
    {name: 'userMessage', fn: userMessageManager, noAck: true},
  ];

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

const userLogConsumers = async (conn) => {
  const ch = await conn.createChannel();
  const exchange = await ch.assertExchange('userLog', 'fanout', {durable: false});
  const logMessage = (msg) => {
    console.log(`user has : ${msg.content.toString()}`);
  };

  if (exchange) {
    const queue =  await ch.assertQueue('', {exclusive :true});
    await ch.bindQueue(queue.queue, 'userLog', '');
    await ch.consume(queue.queue, logMessage, {noAck: true});
  }
};

(async () => {
  const conn = await connect().catch(console.warn);
  await directConsumers(conn);
  await userLogConsumers(conn);
})();



