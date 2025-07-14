import { sanitize } from "@/utils/sanitize";

interface MpMultilineTextProps {
    text?: string;
    className?: string;
}

export default function MpMultilineText({ text, className }: MpMultilineTextProps) {
    if (text == null)
        return <span></span>;
    
    const displayedText = sanitize(text)!.replaceAll('\n', '<br />');

    return (
        <span className={className ? className : ''}>{displayedText}</span>
    )
}
