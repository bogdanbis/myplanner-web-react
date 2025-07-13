import { NavLink } from "react-router";
import MpIcon from "@/components/ui/icons/MpIcon";

export interface NavMenuItemProps {
    path: string,
    icon?: string,
    label: string,
    notificationCount?: number,
}

export default function NavMenuItem(props: NavMenuItemProps) {
    return (
        <NavLink to={props.path} className="menu-item">
            <div className="text-container">
                <MpIcon icon={props.icon || 'file-text-fill'} />
                {props.label}
                {props.notificationCount &&
                    <div className="menu-item-notification-badge">{props.notificationCount}</div>
                }
            </div>
        </NavLink>
    )
}
