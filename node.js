module.exports = function(RED) {
    function SesameNode(config) {
        RED.nodes.createNode(this,config);

        var apikey = this.credentials.apikey;
        var node = this;
        node.on('input', function(msg) {

            let key_secret_hex = msg.payload.sk

            let base64_history = Buffer.from(msg.user).toString('base64');
            let key = Buffer.from(key_secret_hex, 'hex')

            const date = Math.floor(Date.now() / 1000);
            const dateDate = Buffer.allocUnsafe(4);
            dateDate.writeUInt32LE(date);
            const message = Buffer.from(dateDate.slice(1, 4));

            let sign = context.global.aesCmac.aesCmac(key, message)

            let data = {
                'cmd':msg.cmd,
                'history':base64_history,
                'sign':sign,
                'apikey':apikey
            }

            msg.uuid = msg.payload.uuid;
            msg.payload = data;

            node.send(msg);
        });
    }
    RED.nodes.registerType("sesame",SesameNode,{
        credentials: {
            apikey: {type:"password"}
        }
    });
}