module.exports = function(RED) {
    'use strict';

    const aesCmac = require('node-aes-cmac');
    const axiosBase = require('axios');

    const cmac = (secretkey) => {
        const key = Buffer.from(secretkey, 'hex')
        const date = Math.floor(Date.now() / 1000);
        const dateDate = Buffer.allocUnsafe(4)
        dateDate.writeUInt32LE(date);
        const message = Buffer.from(dateDate.slice(1, 4));

        return (aesCmac.aesCmac(key, message));
    }

    const main = function(config){
        const node = this;
        RED.nodes.createNode(node, config);
        const API_KEY = RED.nodes.getNode(config.apikey).credentials.apikey;
        const UUID = RED.nodes.getNode(config.sesame).uuid;
        const SECRET_KEY = RED.nodes.getNode(config.sesame).credentials.secretkey;

        const axios = axiosBase.create({
            baseURL: `https://app.candyhouse.co`,
            headers: {
                'x-api-key': API_KEY,
                'user-agent': 'python-requests/2.25.1',
                "accept-encoding": "gzip, deflate",
                "accept": "*/*"
            },
            json:true
        });

        node.on('input', async (msg) => {
            let cmd
            if (msg.payload.cmd === 'lock'){
                cmd = 82;
            } else if (msg.payload.cmd === 'unlock'){
                cmd = 83;
            } else if (msg.payload.cmd === 'toggle'){
                cmd = 88;
            } else {
                node.error('cmd Not Support');
            }

            let user
            if (typeof msg.payload.user == "undefined" ){
                user = 'node-red';
            } else {
                user = msg.payload.user;
            }

            try {
                const res = await axios.post(`/api/sesame2/${UUID}/cmd`,{
                    'cmd':cmd,
                    'history':Buffer.from(user).toString('base64'),
                    'sign': cmac(SECRET_KEY)
                });
                msg.payload = res.data;
                node.send(msg);
            } catch (error) {
                console.log(error);
                node.error(error);
            }
        });
    }

    RED.nodes.registerType("Control", main);
}
