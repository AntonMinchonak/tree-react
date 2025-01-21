import TreeNode from './TreeNode.jsx';
import React, { useEffect, useState } from 'react';
import TreeApi from 'features/Tree/api/TreeApi.js';
import TreeDialog from 'features/Tree/ui/TreeDialog.jsx';
import Input from 'shared/ui/Input/Input.jsx';
import Button from 'shared/ui/Button/Button.jsx';
import BASE_TREE_NAME from 'features/Tree/constants/BASE_TREE_NAME.js';
import styled from 'styled-components';

export const TreeContext = React.createContext({});

const CheckoutWrapper = styled.div`
    display: flex;
    gap: 10px;
    max-width: 500px;
    width: 100%;

    div:first-child {
        flex-grow: 1;
    }
`;

const FetchTreeButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: darkblue;
    color: white;
    font-weight: 900;
    width: 40px;
    border-radius: 5px;
`;

function Tree() {
    const [dialog, setDialog] = useState(null);
    const [tree, setTree] = useState({});
    const [treeName, setTreeName] = useState(BASE_TREE_NAME);

    const fetchTree = async () => {
        const data = await TreeApi.getTree({ treeName });
        setTree(data);
    };

    const createNode = async (params) => {
        const response = await TreeApi.createNode(params);
        if (!response.error) await fetchTree();
        return response;
    };

    const deleteNode = async (params) => {
        const response = await TreeApi.deleteNode(params);
        if (!response.error) await fetchTree();
        return response;
    };

    const renameNode = async (params) => {
        const response = await TreeApi.renameNode(params);
        if (!response.error) await fetchTree();
        return response;
    };

    useEffect(() => {
        fetchTree();
    }, []);

    if (!tree.id) {
        return 'Loading...';
    }

    return (
        <TreeContext.Provider
            value={{ setDialog, fetchTree, createNode, deleteNode, renameNode, treeName }}
        >
            <CheckoutWrapper>
                <Input value={treeName} action={setTreeName}></Input>
                <FetchTreeButton>
                    <Button action={fetchTree}>↧</Button>
                </FetchTreeButton>
            </CheckoutWrapper>
            <TreeNode value="Root" id={tree.id} defaultIsOpen={true} childTree={tree.children} />
            {!!dialog && <TreeDialog dialog={dialog} setDialog={setDialog}></TreeDialog>}
        </TreeContext.Provider>
    );
}

export default Tree;
