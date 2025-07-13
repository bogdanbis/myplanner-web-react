import type { InputHTMLAttributes } from "react";

export interface MpInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: any,
    onInput: (event: any) => void
    id: string;
    label?: string;
    large?: boolean;
    monospaced?: boolean;
    placeholder?: string
    required?: boolean;
    type?: string;
    unlabeled?: boolean;
}

export default function MpInput({
    value, 
    onInput,
    id,
    label,
    large = false,
    monospaced = false,
    placeholder,
    required = false,
    type = 'text',
    unlabeled = false,
    ...props
}: MpInputProps) {
    const displayedLabel = required ? (label + ' *') : label;

    return (
        <>
            {label &&
                <label htmlFor={id} className="mp-label">{displayedLabel}</label>}
            <input
                value={value}
                onInput={onInput}
                className={
                    'mp-form-item' +
                    (monospaced ? ' monospaced' : '') +
                    (large ? ' large-input' : '') +
                    (unlabeled ? ' unlabeled-input' : '')
                }
                id={id}
                placeholder={placeholder}
                required={required}
                type={type}
                {...props}
            />
        </>
    )
}
