import MpIcon from "./icons/MpIcon";
import MpLink from "./MpLink";

interface MpBackLinkProps {
    to: string;
    routeName?: string;
    icon?: string;
    className?: string;
    children?: React.ReactNode | undefined;
}

export default function MpBackLink({
    to,
    routeName,
    icon = 'chevron-left',
    className,
    children,
}: MpBackLinkProps) {
    return (
        <MpLink to={to} className={'cursor-pointer mt-l' + (className ? ' ' + className : '')}>
            <MpIcon icon={icon} />
            {children || routeName}
        </MpLink>
    )
}
