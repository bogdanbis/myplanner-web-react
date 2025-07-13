import type { PropsWithChildren } from "react";

export default function MpCardActions({ children }: PropsWithChildren) {
    return (
        <div className="mp-card-actions">
            {children}
        </div>
    )
}
