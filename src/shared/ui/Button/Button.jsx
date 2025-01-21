import styled from 'styled-components';

const ButtonWrapper = styled.button`
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    cursor: pointer;
    color: inherit;
    font-weight: inherit;
    width: 100%;
    height: 100%;

    &:hover {
        transform: scale(1.2);
        transition: 0.2s ease-in-out;
    }
`;

const Button = ({ action, children }) => {
    const handleAction = (e) => {
        e.stopPropagation();
        action();
    };

    return <ButtonWrapper onClick={handleAction}>{children}</ButtonWrapper>;
};

export default Button;
