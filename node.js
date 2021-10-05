module.exports = function(RED) {
    var aesCmac = require('node-aes-cmac');
    var request = require('request');
    var hostname = 'https://app.candyhouse.co';

    // function SesameApiKeyNode(n) {
    //     RED.nodes.createNode(this, n);
    // }
    
    // RED.nodes.registerType('sesame-api-key', SesameApiKeyNode, {credentials: {apikey: {type: 'password'}}});
    

    const cmac = (secretkey) => {
        const key = Buffer.from(secretkey, 'hex')
        const date = Math.floor(Date.now() / 1000);
        const dateDate = Buffer.allocUnsafe(4)
        dateDate.writeUInt32LE(date);
        const message = Buffer.from(dateDate.slice(1, 4));

        return (aesCmac.aesCmac(key, message));
    }

    const rqt = (options) => {
        return new Promise((resolve, reject)=> {
            request(options, (error, response, body)=> {
                resolve(body);
            });
        });
    }

    function SesameNode(config) {
        RED.nodes.createNode(this,config);

        var node = this;
	    const uuid = node.credentials.uuid;
        const header = {
            "x-api-key": node.credentials.apikey,
            "user-agent": "python-requests/2.25.1",
            "accept-encoding": "gzip, deflate",
            "accept": "*/*"     
        }
        const sign = cmac(node.credentials.secretkey);

        node.on('input', function(msg) {    
            var gethistory = {
                url: hostname + '/api/sesame2/' + uuid,
                headers: header,
                method: 'GET',
                json: true
            };

            (async () => { 
                const body = await rqt(gethistory)
                console.log(body);
                
                var cmd;
                if (body.CHSesame2Status == 'unlocked'){
                    cmd = 82    //lock
                } else if (body.CHSesame2Status == 'locked') {
                    cmd = 83    //unlock
                }
                var Control = {
                    url: hostname + '/api/sesame2/' + uuid + '/cmd',
                    headers: header,
                    method: 'POST',
                    json: {
                        'cmd':cmd,
                        'history':Buffer.from(msg.user).toString('base64'),
                        'sign':sign
                    }
                };
                console.log(Control);
                (async () => { 
                    const body = await rqt(Control)
                    console.log(body);
                    node.send(body);
                })();
            })();

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
