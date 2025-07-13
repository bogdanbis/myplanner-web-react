import { useRef, forwardRef, useImperativeHandle, type PropsWithChildren } from "react"
import MpIcon from "./icons/MpIcon";

interface MpDialogProps {
    size?: string;
    title?: string;
}

export interface MpDialogHandle {
    open: () => void;
    close: () => void;
}

const MpDialog = forwardRef<MpDialogHandle, PropsWithChildren<MpDialogProps>>(({ size = 'normal', title, children }, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    const open = () => {
        dialog.current?.showModal();
    }

    const close = () => {
        dialog.current?.close();
    }

    useImperativeHandle(ref, () => ({ open, close }), []);

    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === e.currentTarget)
            close();
    }

    return (
        <dialog ref={dialog} onClick={handleDialogClick} className={'dialog dialog-size-' + size}>
            <div className="dialog-body">
                <div className="dialog-title">
                    {title}
                    <button className="dialog-close-btn" onClick={close}><MpIcon icon="x-lg" /></button>
                </div>
                {children}
            </div>
        </dialog>
    )
}
);

export default MpDialog;
