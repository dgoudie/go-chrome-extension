import { GoLinkItem } from '../models/go-link-item';
import { convertGoLinkToRule } from './link-utils';

const addGuidsToGoLinks = (links: Omit<GoLinkItem, 'id'>[]): GoLinkItem[] => {
  return links.map((link) => ({ ...link, id: crypto.randomUUID() }));
};

export const getAllGoLinks = () =>
  new Promise<GoLinkItem[]>((resolve) =>
    chrome.storage.sync.get(['goLinks'], ({ goLinks }) => {
      resolve(goLinks);
    })
  ).then((links) =>
    !!links
      ? Promise.resolve(addGuidsToGoLinks(links))
      : new Promise<void>((resolve) => {
          chrome.storage.sync.set({ goLinks: [] }, () => {
            resolve();
          });
        }).then(() => [] as GoLinkItem[])
  );

export const addGoLinks = async (newGoLinks: GoLinkItem[]) => {
  const rules = newGoLinks.map((goLink) => convertGoLinkToRule(goLink));
  await chrome.declarativeNetRequest.updateSessionRules({
    addRules: rules,
  });
  const existingGoLinks = await getAllGoLinks();
  const goLinks = [...existingGoLinks, ...newGoLinks].sort((l1, l2) =>
    l1.shortName.localeCompare(l2.shortName)
  );
  return await new Promise<GoLinkItem[]>((resolve) =>
    chrome.storage.sync.set({ goLinks }, () => {
      resolve(goLinks);
    })
  );
};

export const deleteGoLink = async (goLinkToDelete: GoLinkItem) => {
  const rule = convertGoLinkToRule(goLinkToDelete);
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [rule.id],
  });
  const existingGoLinks = await getAllGoLinks();
  const goLinks = existingGoLinks.filter(
    (gl) => gl.shortName !== goLinkToDelete.shortName
  );
  return await new Promise<GoLinkItem[]>((resolve) =>
    chrome.storage.sync.set({ goLinks }, () => {
      resolve(goLinks);
    })
  );
};
