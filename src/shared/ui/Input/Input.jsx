import styled from 'styled-components';
import { forwardRef } from 'react';

const InputWrapper = styled.div`
    padding: 3px 8px;
    border: 1px solid lightgrey;
    border-radius: 5px;
`;
const UiInput = styled.input`
    outline: none;
    border: none;
    width: 100%;
`;

const Input = forwardRef(({ action, value, type = 'text' }, ref) => {
    return (
        <InputWrapper>
            <UiInput ref={ref} type={type} value={value} onChange={(e) => action(e.target.value)} />
        </InputWrapper>
    );
});

Input.displayName = 'Input';

export default Input;
