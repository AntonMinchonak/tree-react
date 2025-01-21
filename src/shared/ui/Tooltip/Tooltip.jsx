import { useEffect } from 'react';
import Popup from 'shared/ui/Popup/Popup.jsx';

function Tooltip({ children, setShow }) {
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }, [setShow]);

    return <Popup>{children}</Popup>;
}

export default Tooltip;
