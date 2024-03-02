export function ISOStringToDateString(isoString: string) {
    const date = isoString.split('T')[0];
    return date.split('-').join('.');
}
