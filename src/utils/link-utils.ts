import { GoLinkItem } from '../models/go-link-item';
import { getAllGoLinks } from './storage';
import { hashCode } from './string-hashcode';

const HTTP_REGEX = /https?:\/\//i;
const URL_REGEX =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const isValidUrl = (url: string) => {
  return !!url.match(URL_REGEX);
};

export const normalizeUrl = (url: string) => {
  if (!url.match(HTTP_REGEX)) {
    url = 'http://' + url;
  }
  return url;
};

export const getArgumentCountFromUrl = (url: string) => {
  let counter = 0;
  while (true) {
    if (url.includes(`\\${counter + 1}`)) {
      counter += 1;
    } else {
      return counter;
    }
  }
};

export const isValidGoLink = (obj: any) =>
  !!obj.shortName &&
  typeof obj.shortName === 'string' &&
  !!obj.fullLink &&
  typeof obj.fullLink === 'string' &&
  isValidUrl(obj.fullLink);

export const convertGoLinkToRule = (
  link: GoLinkItem
): chrome.declarativeNetRequest.Rule => {
  let regexFilter = `^http://go/${link.shortName}`;
  let counter = 1;
  while (link.fullLink.includes(`\\${counter}`)) {
    regexFilter += `(?:/([\\w-_]+))`;
    counter += 1;
  }
  regexFilter += '/?$';
  return {
    id: hashCode(link.id),
    priority: 1,
    action: {
      redirect: {
        regexSubstitution: link.fullLink,
      },
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
    },
    condition: {
      regexFilter,
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
    },
  };
};

export const registerRules = async () => {
  const links = await getAllGoLinks();
  const rules = links.map((link) => convertGoLinkToRule(link));
  const ruleIds = rules.map((rule) => rule.id);
  chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: ruleIds,
    addRules: rules,
  });
};
