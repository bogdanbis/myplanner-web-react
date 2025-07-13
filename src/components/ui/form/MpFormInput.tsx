import MpCol from "../grid/MpCol";
import MpIcon from "../icons/MpIcon";
import MpInput from "./base/MpInput";

interface MpFormInputProps {
    value: any,
    onInput: (event: any) => void
    cols?: string | number;
    description?: string;
    id: string;
    info?: string;
    label?: string;
    large?: boolean;
    monospaced?: boolean;
    placeholder?: string;
    required?: boolean;
    type?: string;
    unlabeled?: boolean;
}

export default function MpFormInput({
    value,
    onInput,
    cols,
    description,
    id,
    info,
    label,
    large = false,
    monospaced = false,
    placeholder,
    required = false,
    type = 'text',
    unlabeled = false,
}: MpFormInputProps) {
    return (
        <MpCol cols={cols} className="mp-form-item-container">
            <MpInput
                value={value}
                onInput={onInput}
                id={id}
                label={label}
                large={large}
                monospaced={monospaced}
                placeholder={placeholder}
                required={required}
                type={type}
                unlabeled={unlabeled}
            />
            {info &&
                <small><MpIcon icon="info-circle" className="mr-2" /> {info}</small>}
            {description &&
                <small>{description}</small>}
        </MpCol>
    )
}
