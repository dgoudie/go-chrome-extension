import { Observable } from 'rxjs';
import { getGoLink } from './utils/storage';

const GO_REGEX = /http:\/\/go\/(.+)\//i;
const filter = {
    urls: ['*://go/*']
};

const logOnBefore = (details: chrome.webRequest.WebRequestBodyDetails) => {
    const linkRequested = details.url.replace(GO_REGEX, '$1').toLowerCase();
    getGoLink(linkRequested).subscribe(url =>
        chrome.tabs.update({
            url
        })
    );
    return { cancel: true };
};

chrome.webRequest.onBeforeRequest.addListener(logOnBefore, filter, [
    'blocking'
]);
