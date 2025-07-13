interface MpIconProps {
    icon: string;
    className?: string;
}

export default function MpIcon({ icon, className }: MpIconProps) {
    return (
        <i className={'bi bi-' + icon + (className ? ' ' + className : '')}></i>
    )
}
