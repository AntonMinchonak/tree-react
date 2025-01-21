import BaseApi from 'shared/api/BaseApi.js';

class TreeApi extends BaseApi {
    static baseUrl = 'https://test.vmarmysh.com/api.user.tree.';

    static async getTree(params) {
        return this.doRequest({
            url: this.baseUrl + 'get?' + this.buildQuery({ treeName: params?.treeName }),
            method: 'POST',
        });
    }

    static createNode = (params) => {
        return this.doRequest({
            url:
                this.baseUrl +
                'node.create?' +
                this.buildQuery({
                    treeName: params.treeName,
                    parentNodeId: params.nodeId,
                    nodeName: params.nodeName,
                }),
            method: 'POST',
        });
    };

    static deleteNode = (params) => {
        return this.doRequest({
            url:
                this.baseUrl +
                'node.delete?' +
                this.buildQuery({
                    treeName: params.treeName,
                    nodeId: params.nodeId,
                }),
            method: 'POST',
        });
    };

    static renameNode = (params) => {
        return this.doRequest({
            url:
                this.baseUrl +
                'node.rename?' +
                this.buildQuery({
                    treeName: params.treeName,
                    nodeId: params.nodeId,
                    newNodeName: params.nodeName,
                }),
            method: 'POST',
        });
    };
}

export default TreeApi;
