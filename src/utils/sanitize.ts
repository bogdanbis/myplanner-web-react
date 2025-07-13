import DOMPurify from 'dompurify';

export function sanitize(value?: string) {
    if (!value) return;
    return DOMPurify.sanitize(value, { ALLOWED_TAGS: [] })
        .replaceAll(/(?:https?|ftp):\/\/[\n\S]+/g, ''); // remove links
}
