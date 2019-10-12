const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-508e330f-e972-4fae-90ec-9cc827bcddca',
    subscribeKey: 'sub-c-69bcb59e-e9ce-11e9-964c-ee61bcac10cb',
    secretKey: 'sec-c-YTMyODhlNjktODI5OS00ZWEyLWJkYmMtYmRiMWFkZTAwODVh'
}; // all these keys are from pubnub project cryptochain


const CHANNELS = {
    TEST: 'TEST', 
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
};

class PubSub {
    constructor({blockchain, transactionPool, wallet}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;

        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({channels: Object.values(CHANNELS) });

        this.pubnub.addListener(this.listener());
    }

    
    broadcastChain() {
        this.publish({
          channel: CHANNELS.BLOCKCHAIN,
          message: JSON.stringify(this.blockchain.chain)
        });
      }
    
    broadcastTransaction(transaction) {
        this.publish({
          channel: CHANNELS.TRANSACTION,
          message: JSON.stringify(transaction)
        });
      }

    
    listener() {
        return {
            message: messageObject => {
                const { channel, message } = messageObject;

                console.log(`Message received. Channel: ${channel}. Message: ${message}`);

                const parsedMessage = JSON.parse(message);

                switch(channel) {
                    case CHANNELS.BLOCKCHAIN:
                        this.blockchain.replaceChain(parsedMessage, true, () => {
                            this.transactionPool.clearBlockchainTransactions(
                              { chain: parsedMessage.chain }
                            );
                          });
                          break;
                          
                    case CHANNELS.TRANSACTION:
                        if (!this.transactionPool.existingTransaction({
                            inputAddress: this.wallet.publicKey
                          })) {
                            this.transactionPool.setTransaction(parsedMessage);
                          }
                        break;
                    default:
                        return;
                }
            }
        }
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

    broadcastTransaction(transaction) {
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction)
        });
    }
}

module.exports = PubSub;