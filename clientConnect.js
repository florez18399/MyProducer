let amqp = require('amqplib/callback_api');

module.exports = {
    sendMessage: (url, message) => {
        amqp.connect(url, (err, connection) => {
            if (err) {
                throw err
            }
            connection.createChannel((err1, channel) => {
                if (err1) {
                    throw err1
                }
                let queue = 'WorkQueue'
                let msg = message;

                channel.assertQueue(queue, {
                    durable: true
                })
                
                channel.sendToQueue(queue, Buffer.from(msg))
                console.log('Mensaje enviado');

                setTimeout(() => {
                    connection.close()
                }, 100)
            })
        })

    }
}