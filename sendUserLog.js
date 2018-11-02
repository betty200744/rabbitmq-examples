/**
 * Created by betty on 11/2/18.
 */
"use strict";

const {connect} = require('./util/rabbitmq');

const sendUserLog =  async () => {
  const exName = 'userLog';
  const conn = await connect().catch(console.warn);
  const ch = await conn.createChannel();
  const exchange = await ch.assertExchange(exName, 'fanout', {durable: false});
  if (exchange) {
    await ch.publish(exName, 'userLog', Buffer.from('click'));
    await ch.close();
  }
  await conn.close().catch(() => console.log('rabbitmq conn is close'));
};

sendUserLog();