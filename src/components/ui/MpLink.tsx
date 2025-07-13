import { Link } from "react-router";
import MpIcon from "./icons/MpIcon";

interface MpLinkProps {
    to: string;
    disabled?: boolean;
    icon?: string;
    children?: React.ReactNode | undefined;
    className?: string;
}

export default function MpLink({
    to,
    disabled = false,
    icon,
    children,
    className,
}: MpLinkProps) {
    return (
        <div className={'router-link-wrapper' + (className ? ' ' + className : '')}>
            {disabled
                ? <span>
                    {icon && <MpIcon icon={icon} className="link-icon" />}
                    {children}
                </span>
                : <Link to={to}>
                    {icon && <MpIcon icon={icon} className="link-icon" />}
                    {children}
                </Link>
            }
        </div>
    )
}
