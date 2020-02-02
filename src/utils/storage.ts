import { Observable, of } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';

import { GoLinkItem } from '../models/go-link-item';
import { sortBy } from 'lodash';

export const getAllGoLinks = () =>
    new Observable<GoLinkItem[]>(observer =>
        chrome.storage.sync.get(['goLinks'], ({ goLinks }) => {
            observer.next(goLinks);
            observer.complete();
        })
    ).pipe(
        concatMap(urls =>
            !!urls
                ? of(urls)
                : new Observable<void>(observer =>
                      chrome.storage.sync.set({ goLinks: [] }, () => {
                          observer.next();
                          observer.complete();
                      })
                  ).pipe(mapTo<any, GoLinkItem[]>([]))
        )
    );

export const getGoLink = (shortName: string) =>
    new Observable<string>(observer =>
        chrome.storage.sync.get(
            ['goLinks'],
            ({ goLinks }: { goLinks: GoLinkItem[] }) => {
                const goLink = goLinks.find(
                    goLink => goLink.shortName === shortName
                );
                if (!!goLink) {
                    observer.next(goLink.fullLink);
                } else {
                    observer.error();
                }
                observer.complete();
            }
        )
    );

export const addGoLinks = (newGoLinks: GoLinkItem[]) => {
    return getAllGoLinks().pipe(
        map(existingGoLinks =>
            sortBy([...existingGoLinks, ...newGoLinks], 'shortName')
        ),
        concatMap(
            goLinks =>
                new Observable<GoLinkItem[]>(observer =>
                    chrome.storage.sync.set({ goLinks }, () => {
                        observer.next(goLinks);
                        observer.complete();
                    })
                )
        )
    );
};

export const deleteGoLink = (goLinkToDelete: GoLinkItem) => {
    return getAllGoLinks().pipe(
        map(existingGoLinks =>
            existingGoLinks.filter(
                gl => gl.shortName !== goLinkToDelete.shortName
            )
        ),
        concatMap(
            goLinks =>
                new Observable<GoLinkItem[]>(observer =>
                    chrome.storage.sync.set({ goLinks }, () => {
                        observer.next(goLinks);
                        observer.complete();
                    })
                )
        )
    );
};
