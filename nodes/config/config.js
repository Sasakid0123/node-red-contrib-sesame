module.exports = function (RED) {
    function SesameApiKeyNode(n) {
        RED.nodes.createNode(this, n);
    }
    RED.nodes.registerType("apikey", SesameApiKeyNode, { credentials: { apikey: { type: 'text' } } });

    function SesameNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.uuid = n.uuid;
    }
    RED.nodes.registerType("sesame", SesameNode, { credentials: { secretkey: { type: 'text' } } });

}