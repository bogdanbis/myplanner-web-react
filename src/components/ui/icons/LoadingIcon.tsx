interface LoadingIconProps {
    withText?: boolean;
}

export default function LoadingIcon({ withText = false }: LoadingIconProps) {
    return withText
        ? (
            <span className="loading-icon-container">
                <span className="loading-icon">Loading...</span>
            </span>
        )
        : <span className="loading-icon" />
}
