module.exports = function (RED) {
    function SesameApiKeyNode(n) {
        RED.nodes.createNode(this, n);
    }
    RED.nodes.registerType("apikey", SesameApiKeyNode, { credentials: { apikey: { type: 'text' } } });
}