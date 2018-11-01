/**
 * Created by betty on 10/31/18.
 */
"use strict";
const deepAssign = require('deep-assign');

const commonConfigs = require('./common.json');
const envConfig = Object.assign({}, commonConfigs);

let envName = process.env.NODE_ENV;

const selectEnv  = () => {
  console.log(`current env is ${envName}`);
  deepAssign(envConfig, require(`./${envName}.json`));
};

selectEnv();

module.exports = envConfig;