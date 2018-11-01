
## init project
- mkdir rabbitmq-examples
- cd rabbitmq-examples
- npm init
- npm install

## require
- brew update
- brew install rabbitmq
- brew services start rabbitmq
- rabbitmq web plugin : http://localhost:15672/  , guest/guest


## run 
1. git clone 
2. yarn install
3. yarn send
4. yarn consumer


## start 



## rabbitmq-server
- 默认exchanges， AMQP default , 即amq.direct
- 默认routing_key, 即queue的name
- 默认ack required， yes
- 默认durale=true， 会持久化
- 默认prefetch， 1, 即一次处理一个消息
- 默认consumer实例， 



