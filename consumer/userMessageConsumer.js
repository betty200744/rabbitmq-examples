/**
 * Created by betty on 11/1/18.
 */
"use strict";

const userMessageConsumer = (data) => {
  const {from, to, message} = data;
  console.log(`from: ${from}, to: ${to}, concent: ${message}`);
};

module.exports = {name: 'userMessage', fn: userMessageConsumer, noAck: true};