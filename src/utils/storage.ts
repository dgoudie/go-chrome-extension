import { Observable, of } from 'rxjs';
import { concatMap, mapTo } from 'rxjs/operators';

export const getAllUrls = () =>
    new Observable<string>(observer =>
        chrome.storage.sync.get(['urls'], ({ urls }) => {
            observer.next(urls);
            observer.complete();
        })
    ).pipe(
        concatMap(urls =>
            !!urls
                ? of(urls)
                : new Observable<void>(observer =>
                      chrome.storage.sync.set({ urls: {} }, () => {
                          observer.complete();
                      })
                  ).pipe(mapTo({}))
        )
    );

export const getUrl = (goLinkRequested: string) =>
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
