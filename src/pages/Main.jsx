import Tree from 'features/Tree/ui/Tree.jsx';
import styled from 'styled-components';

const MainWrapper = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background: white;
`;

function Main() {
    return (
        <MainWrapper>
            <h1>Tree</h1>
            <Tree />
        </MainWrapper>
    );
}

export default Main;
