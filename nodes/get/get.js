module.exports = (RED) => {
    'use strict';
    
    const axiosBase = require('axios');

    const main = function(config){
        const node = this;
        RED.nodes.createNode(node, config);
        const API_KEY = RED.nodes.getNode(config.apikey).credentials.apikey;     
        const UUID = node.credentials.uuid;
        const axios = axiosBase.create({
            baseURL: `https://app.candyhouse.co`,
            headers: {
                'x-api-key': API_KEY,
                'user-agent': 'python-requests/2.25.1',
            }
        });

        node.on('input', async (msg) => {
            const mes = msg.payload;
            try {
                const res = await axios.get(`/api/sesame2/${UUID}`);
                msg.payload = res.data;
                node.send(msg);                
            } catch (error) {
                console.log(error);
            }
        });
    }

    RED.nodes.registerType("GetStatus", main, {
        credentials: {
            apikey:{type:"password"},
            uuid: {type:"text"}
        }
    });
}