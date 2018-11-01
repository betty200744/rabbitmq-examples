/**
 * Created by betty on 10/30/18.
 */
"use strict";
const amqp = require('amqplib');
const env = require('../env');

const connect = async (config = env.rabbitmq) => {
  const {username, password, host, port} = config;
  const url = `amqp://${username}:${password}@${host}:${port}`;

  try {
    let conn = await amqp.connect(url);
    conn.on('error', (err) => {
      console.log(`rabbitmq connect failed on error , ${err}`);
      setTimeout(connect, 10000);
    });

    return conn;
  } catch (err) {
    console.log(`rabbitmq connect failed , ${err}`);
    setTimeout(connect, 10000);
  }
};

const sendQueue = async (queueName, data) => {
  let conn = await connect();
  if (conn) {
    const ch = await conn.createChannel();
    await ch.assertQueue(queueName, {durable: true, arguments: {expires: 5000}});
    await ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {persistent: true});
    await ch.close();
    await conn.close().catch(() => console.log('rabbitmq conn is close'))
  }
};

module.exports = {
  connect,
  sendQueue,
};
