import Button from 'shared/ui/Button/Button.jsx';
import styled from 'styled-components';
import { useContext } from 'react';
import { TreeContext } from 'features/Tree/ui/Tree.jsx';
import Popup from 'shared/ui/Popup/Popup.jsx';

const NodeTooltipWrapper = styled.div`
    position: absolute;
    left: 80%;
    bottom: 70%;
    z-index: 2;
`;

const NodeTooltipContent = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

    button {
        color: black;
    }
`;

const Round = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    aspect-ratio: 1;
    border-radius: 50%;
    width: 20px;
`;
function TreeNodeTooltip({ nodeId }) {
    const { setDialog, treeName, createNode, renameNode, deleteNode } = useContext(TreeContext);

    return (
        <NodeTooltipWrapper>
            <Popup>
                <NodeTooltipContent>
                    <Button
                        action={() =>
                            setDialog({ text: 'Add node', action: createNode, nodeId, treeName })
                        }
                    >
                        <Round>+</Round>
                    </Button>
                    <Button action={() => deleteNode({ nodeId, treeName })}>
                        <Round>&#128465;</Round>
                    </Button>
                    <Button
                        action={() =>
                            setDialog({ text: 'Rename node', action: renameNode, nodeId, treeName })
                        }
                    >
                        <Round>&#9998;</Round>
                    </Button>
                </NodeTooltipContent>
            </Popup>
        </NodeTooltipWrapper>
    );
}

export default TreeNodeTooltip;
