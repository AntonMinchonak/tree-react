import styled from 'styled-components';

const PopupWrapper = styled.div`
    padding: 10px;
    background: white;
    box-shadow: 0 3px 10px -3px hsla(240deg 18% 14% / 0.3);
    border-radius: 5px;
`;

function Popup({ children }) {
    return <PopupWrapper>{children}</PopupWrapper>;
}

export default Popup;
