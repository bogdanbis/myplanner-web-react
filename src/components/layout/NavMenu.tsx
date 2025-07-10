import { useEffect, useMemo, useState, type CSSProperties } from "react";
import NavMenuItem, { type NavMenuItemProps } from "./NavMenuItem";
import { useLocation } from "react-router";

export default function NavMenu(props: { menuItems: NavMenuItemProps[] }) {

    const [selectedIndex, setSelectedIndex] = useState<number | null>();

    const currentRoute = useLocation();

    useEffect(() => {
        setSelectedIndex(null);
        for (let index in props.menuItems) {
            const menuItem = props.menuItems[index];
            const isActive = menuItem.path === '/'
                ? currentRoute.pathname === '/' || currentRoute.pathname.startsWith('/plan/')
                : currentRoute.pathname.startsWith(menuItem.path);
            if (isActive) {
                setSelectedIndex(Number(index));
                break;
            }
        }
    }, [currentRoute]);

    const itemNegativeIndex = selectedIndex != null
        ? { '--item-negative-index': props.menuItems.length - selectedIndex } as CSSProperties
        : null;

    return (
        <>
            <div className="nav-menu">
                {props.menuItems.map((menuItem, index) => (
                    <NavMenuItem
                        key={index}
                        icon={menuItem.icon}
                        label={menuItem.label}
                        notificationCount={menuItem.notificationCount}
                        path={menuItem.path}
                    />
                ))}
            </div>
            {itemNegativeIndex != null &&
                <div style={itemNegativeIndex} className="active-menu-item" />}
        </>
    )
}
