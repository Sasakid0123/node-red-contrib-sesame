module.exports = function(RED) {
    var aesCmac = require('node-aes-cmac');
    var request = require('request');
    var hostname = 'https://app.candyhouse.co';

    // function SesameApiKeyNode(n) {
    //     RED.nodes.createNode(this, n);
    // }
    
    // RED.nodes.registerType('sesame-api-key', SesameApiKeyNode, {credentials: {apikey: {type: 'password'}}});
    

    function SesameNode(config) {
        RED.nodes.createNode(this,config);


        var node = this;
	    var apikey = this.credentials.apikey;
	    var uuid = this.credentials.uuid;
	    var secretkey = this.credentials.secretkey;
        node.on('input', function(msg) {

            let key_secret_hex = secretkey

            let base64_history = Buffer.from(msg.user).toString('base64');
            let key = Buffer.from(key_secret_hex, 'hex')

            const date = Math.floor(Date.now() / 1000);
            const dateDate = Buffer.allocUnsafe(4);
            dateDate.writeUInt32LE(date);
            const message = Buffer.from(dateDate.slice(1, 4));

            let sign = aesCmac.aesCmac(key, message)

            var header = {
                "x-api-key": apikey,
                "user-agent": "python-requests/2.25.1"        
            }
    
            var options = {
                url: hostname + '/api/sesame2/' + uuid,
                headers: header,
                method: 'GET',
                json: true
            };
            request(options, function (error, response, body) {
                if (!error) {
                    node.send(body);
                } else {
                    node.error(error);
                }
            });

        });
    }
    RED.nodes.registerType("sesame",SesameNode, {
        credentials: {
            apikey:{type:"password"},
            uuid: {type:"text"},
            secretkey: {type:"password"}
        }
    });

}
