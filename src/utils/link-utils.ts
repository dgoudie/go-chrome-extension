const HTTP_REGEX = /https?:\/\//i;
const URL_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const isValidUrl = (url: string) => {
    return !!url.match(URL_REGEX);
};

export const normalizeUrl = (url: string) => {
    if (!url.match(HTTP_REGEX)) {
        url = 'http://' + url;
    }
    return url;
};

export const isValidGoLink = (obj: any) =>
    !!obj.shortName &&
    typeof obj.shortName === 'string' &&
    !!obj.fullLink &&
    typeof obj.fullLink === 'string' &&
    isValidUrl(obj.fullLink);
