import type { PropsWithChildren, ButtonHTMLAttributes } from "react";
import LoadingIcon from "../icons/LoadingIcon";
import MpIcon from "../icons/MpIcon";

export interface MpButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    busy?: boolean;
    gradient?: boolean;
    link?: boolean;
    icon?: string;
}

export default function MpButton({
    busy = false,
    disabled = false,
    gradient = false,
    link = false,
    icon,
    type = 'button',
    children,
    className,
    ...props
}: PropsWithChildren<MpButtonProps>) {
    return (
        <button
            disabled={busy || disabled}
            type={type}
            className={
                'mp-button' +
                (busy ? ' busy' : '') +
                (link ? ' mp-link-button' : '') +
                (children ? ' mp-icon-button' : '') +
                (gradient ? ' mp-button-gradient' : '') +
                (className ? ' ' + className : '')
            }
            {...props}
        >
            <LoadingIcon />
            {icon && <MpIcon icon={icon} className="mr-s" />}
            {children}
        </button>
    )
}
