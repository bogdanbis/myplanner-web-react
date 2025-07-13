import type { PropsWithChildren } from "react";

interface MpColProps {
    className?: string;
    cols?: string | number;
}

const gridColumns = 60;

export default function MpCol({ cols, className, children }: PropsWithChildren<MpColProps>) {
    let colsNumber = null;
    const colsN = Number(cols);
    if (cols && colsN <= 1 && Number.isInteger(gridColumns * colsN))
        colsNumber = colsN * gridColumns;

    return (
        <div className={'col ' + (colsNumber ? `col-${colsNumber}` : '') + (className ? ' ' + className : '')}>
            {children}
        </div>
    )
}
