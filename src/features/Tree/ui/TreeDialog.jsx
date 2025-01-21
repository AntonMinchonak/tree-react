import Button from 'shared/ui/Button/Button.jsx';
import styled from 'styled-components';
import Input from 'shared/ui/Input/Input.jsx';
import { useEffect, createRef, useState, useCallback } from 'react';
import Popup from 'shared/ui/Popup/Popup.jsx';

const TreeDialogContent = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: stretch;

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        width: auto;
        border: 1px solid black;
        border-radius: 50%;
        aspect-ratio: 1;
        padding: 3px;
    }
`;

const TreeDialogWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const ErrorText = styled.div`
    color: red;
    font-size: 12px;
`;

const validateText = (text) => {
    return (
        (text.length > 40 && 'Length should be below 40 symbols') ||
        (text.length < 1 && "Can't be empty") ||
        (/(^\s|\s{2,})/.test(text) &&
            "Сan't be more than 1 space in a row or a space at the beginning of a line")
    );
};

function TreeDialog({ dialog, setDialog }) {
    const [text, setText] = useState('');
    const [errorText, setErrorText] = useState('');
    const inputRef = createRef();

    const onSubmit = useCallback(async () => {
        const errorText = validateText(text);

        if (errorText) {
            setErrorText(errorText);

            return;
        }

        const response = await dialog.action({
            nodeId: dialog.nodeId,
            nodeName: text,
            treeName: dialog.treeName,
        });

        if (response.error) {
            setErrorText(response.message);

            return;
        }

        setDialog(null);
    }, [dialog, setDialog, text]);

    useEffect(() => {
        inputRef.current.focus();
        inputRef.current.onkeydown = (e) => {
            if (e.key === 'Enter') {
                onSubmit();
            }
        };
    }, [inputRef, onSubmit]);

    const onInput = (e) => {
        setText(e);
        setErrorText('');
    };

    return (
        <TreeDialogWrapper>
            <Popup>
                <TreeDialogContent>
                    <h5>{dialog.text}</h5>
                    <Input ref={inputRef} action={onInput} value={text} />
                    <Button action={() => onSubmit()}>✓</Button>
                    <Button action={() => setDialog(null)}>✖</Button>
                </TreeDialogContent>
                {errorText && <ErrorText>Error: {errorText}</ErrorText>}
            </Popup>
        </TreeDialogWrapper>
    );
}

export default TreeDialog;
