import { GoLinkItem } from '../models/go-link-item';

export const getAllGoLinks = () =>
    new Promise<GoLinkItem[]>(resolve =>
        chrome.storage.sync.get(['goLinks'], ({ goLinks }) => {
            resolve(goLinks);
        })
    ).then(urls =>
        !!urls
            ? Promise.resolve(urls)
            : new Promise<void>(resolve => {
                  chrome.storage.sync.set({ goLinks: [] }, () => {
                      resolve();
                  });
              }).then(() => [] as GoLinkItem[])
    );

export const getGoLink = (shortName: string) =>
    new Promise<string>((resolve, reject) =>
        chrome.storage.sync.get(
            ['goLinks'],
            ({ goLinks }: { goLinks: GoLinkItem[] }) => {
                const goLink = goLinks.find(
                    goLink => goLink.shortName === shortName
                );
                if (!!goLink) {
                    resolve(goLink.fullLink);
                } else {
                    reject();
                }
            }
        )
    );

export const addGoLinks = async (newGoLinks: GoLinkItem[]) => {
    const existingGoLinks = await getAllGoLinks();
    const goLinks = [...existingGoLinks, ...newGoLinks].sort((l1, l2) =>
        l1.shortName.localeCompare(l2.shortName)
    );
    return await new Promise<GoLinkItem[]>(resolve =>
        chrome.storage.sync.set({ goLinks }, () => {
            resolve(goLinks);
        })
    );
};

export const deleteGoLink = async (goLinkToDelete: GoLinkItem) => {
    const existingGoLinks = await getAllGoLinks();
    const goLinks = existingGoLinks.filter(
        gl => gl.shortName !== goLinkToDelete.shortName
    );
    return await new Promise<GoLinkItem[]>(resolve =>
        chrome.storage.sync.set({ goLinks }, () => {
            resolve(goLinks);
        })
    );
};
