import type { FormHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import MpCol from "../grid/MpCol";

interface MpFormProps extends FormHTMLAttributes<HTMLFormElement> {
    cols?: string | number;
    colsSm?: string | number;
    actionsChildren?: ReactNode;
}

export default function MpForm({
    onSubmit,
    cols = 1,
    colsSm = 1,
    children,
    actionsChildren,
    ...props
}: PropsWithChildren<MpFormProps>) {
    const rowCols = `row-cols-${colsSm} row-cols-md-${cols}`;

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!onSubmit) return;
        event.preventDefault();
        onSubmit(event);
    }

    return (
        <form className={'mp-form row ' + rowCols} onSubmit={submit} {...props}>
            {children}
            {actionsChildren &&
                <MpCol cols="1" className="mp-form-actions">
                    {actionsChildren}
                </MpCol>
            }
        </form>
    )
}
