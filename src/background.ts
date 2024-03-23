import { registerRules } from './utils/link-utils';

chrome.runtime.onStartup.addListener(() => {
  registerRules();
});

chrome.runtime.onInstalled.addListener(() => {
  registerRules();
});
