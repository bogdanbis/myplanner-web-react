import { useState, type PropsWithChildren } from "react";
import MpButton, { type MpButtonProps } from "./MpButton";

interface MpLinkButtonWithConfirmProps extends MpButtonProps {
    onConfirm: () => void;
    busy?: boolean;
    cancelText?: string;
    confirmText?: string;
    id?: string;
    withIcons?: boolean;
}

export default function MpLinkButtonWithConfirm({
    onConfirm,
    busy = false,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    id = 'confirm-button',
    withIcons = false,
    children,
    ...props
}: PropsWithChildren<MpLinkButtonWithConfirmProps>) {
    const [showConfirm, setShowConfirm] = useState(false);

    const confirmIcon = withIcons ? 'slash-circle' : undefined;
    const cancelIcon = withIcons ? 'exclamation-circle-fill' : undefined;

    const handleConfirm = () => {
        setShowConfirm(false);
        onConfirm();
    }
    if (showConfirm)
        return (
            <div id={id} className="mp-button-confirm-container">
                <MpButton onClick={() => setShowConfirm(false)} icon={cancelIcon} link className="dark">
                    {cancelText}
                </MpButton>
                <MpButton onClick={handleConfirm} icon={confirmIcon} link className="danger" busy={busy}>
                    {confirmText}
                </MpButton>
            </div>
        )
    else
        return (
            <MpButton onClick={() => setShowConfirm(true)} id={id} link busy={busy} {...props}>
                {children}
            </MpButton>
        )
}
