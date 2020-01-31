import { Observable } from 'rxjs';

const GO_REGEX = /http:\/\/go\/(.+)\//i;
const filter = {
    urls: ['*://go/*']
};

const getUrl = (goLinkRequested: string) =>
    new Observable<string>(observer =>
        chrome.storage.sync.get(['urls'], ({ urls }) => {
            const url = urls[goLinkRequested];
            if (!!url) {
                observer.next(url);
            } else {
                observer.error();
            }
            observer.complete();
        })
    );

const logOnBefore = (details: chrome.webRequest.WebRequestBodyDetails) => {
    const linkRequested = details.url.replace(GO_REGEX, '$1').toLowerCase();
    getUrl(linkRequested).subscribe(url =>
        chrome.tabs.update({
            url
        })
    );
    return { cancel: true };
};

chrome.webRequest.onBeforeRequest.addListener(logOnBefore, filter, [
    'blocking'
]);
