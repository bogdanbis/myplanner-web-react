import MpCol from "../grid/MpCol";
import MpIcon from "../icons/MpIcon";
import MpInput, { type MpInputProps } from "./base/MpInput";

interface MpFormInputProps extends MpInputProps {
    cols?: string | number;
    description?: string;
    info?: string;
}

export default function MpFormInput({
    cols,
    description,
    info,
    ...props
}: MpFormInputProps) {
    return (
        <MpCol cols={cols} className="mp-form-item-container">
            <MpInput
                {...props}
            />
            {info &&
                <small><MpIcon icon="info-circle" className="mr-2" /> {info}</small>}
            {description &&
                <small>{description}</small>}
        </MpCol>
    )
}
