/**
 * Created by betty on 10/30/18.
 */
"use strict";
const {sendQueue} = require('./util/rabbitmq');

const sendMessage = async () => {
  await sendQueue('userMessage', {from: 'betty', to: 'cc', message: 'nice to meet you'});
};

setInterval(sendMessage, 3000);

