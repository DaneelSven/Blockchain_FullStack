const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-508e330f-e972-4fae-90ec-9cc827bcddca',
    subscribeKey: 'sub-c-69bcb59e-e9ce-11e9-964c-ee61bcac10cb',
    secretKey: 'sec-c-YTMyODhlNjktODI5OS00ZWEyLWJkYmMtYmRiMWFkZTAwODVh'
}; // all these keys are from pubnub project cryptochain


const CHANNELS = {
    TEST: 'TEST', 
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor({blockchain}){
        this.blockchain = blockchain;

        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({channels: Object.values(CHANNELS) });

        this.pubnub.addListener(this.listener());
    }

    listener() {
        return {
            message: messageObject => {
                const { channel, message } = messageObject;

                console.log(`Message received. Channel: ${channel}. Message: ${message}`);

                const parsedMessage = JSON.parse(message);

                if (channel === CHANNELS.BLOCKCHAIN) {
                    this.blockchain.replaceChain(parsedMessage);
                }
            }
        };
    }

    publish({channel, message}) {
            this.pubnub.publish( {channel, message});
        
    }

    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
}

module.exports = PubSub;