interface MpCardProps {
    title?: string;
    className?: string;
    children?: React.ReactNode | undefined;
}

export default function MpCard({ title, className, children }: MpCardProps) {
    return (
        <div className={'mp-card' + (className ? ' ' + className : '')}>
            {title &&
                <div className="mp-card-title">
                    {title}
                </div>}
            {children}
        </div>
    )
}
