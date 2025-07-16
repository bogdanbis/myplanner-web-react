import { useRef, type InputHTMLAttributes } from "react";
import MpButton from "./buttons/MpButton";

interface MpFileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
    onUpload: () => void;
    accept?: string;
    busy?: boolean;
    disabled?: boolean;
    icon?: string;
    children?: React.ReactNode | undefined;
}

export default function MpFileUpload({
    onUpload,
    accept,
    busy,
    disabled,
    icon,
    children,
    ...props
}: MpFileUploadProps) {

    const input = useRef<HTMLInputElement>(null);

    const chooseFile = () => {
        input.current?.click();
    }

    const setFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0)
            onUpload();
    };

    return (
        <div className="d-block">
            <input
                onChange={setFile}
                accept={accept}
                disabled={disabled}
                className="d-none"
                ref={input}
                {...props}
            />
            <MpButton onClick={chooseFile} busy={busy} disabled={disabled} icon={icon}>
                {children}
            </MpButton>
        </div>
    )
}
