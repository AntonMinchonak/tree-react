import styled from 'styled-components';
import { useState } from 'react';
import TreeNodeTooltip from 'features/Tree/ui/TreeNodeTooltip.jsx';

const ChildTree = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    border-left: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`;

const NodeWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
`;

const NodeTitle = styled.div`
    position: relative;
    font-size: 16px;
    color: ${(props) => (props.$hasChildren ? 'black' : 'grey')};
    font-weight: ${(props) => (props.$hasChildren ? '900' : '400')};
    cursor: ${(props) => (props.$hasChildren ? 'pointer' : '')};

    &:hover {
        ${(props) => props.$hasChildren && 'color: blue;'}
    }
`;

function TreeNode({ id, value, defaultIsOpen, childTree }) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);
    const [isHover, setIsHover] = useState(false);
    let hoverTimeout = null;
    const filteredChildTree = childTree.filter((e) => e.name);
    const hasChildren = filteredChildTree.length;

    const handleHover = (value) => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            setIsHover(value);
        }, 200);
    };

    return (
        <NodeWrapper>
            <NodeTitle
                $hasChildren={hasChildren}
                onClick={() => setIsOpen(!isOpen)}
                onMouseOver={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
            >
                {value} {!!(isOpen && hasChildren) && '—'}
                {!!isHover && <TreeNodeTooltip nodeId={id} />}
            </NodeTitle>
            {isOpen && (
                <ChildTree>
                    {!!hasChildren &&
                        filteredChildTree.map((e) => (
                            <TreeNode
                                key={e.id}
                                id={e.id}
                                value={e.name}
                                childTree={e.children}
                            ></TreeNode>
                        ))}
                </ChildTree>
            )}
        </NodeWrapper>
    );
}

export default TreeNode;
