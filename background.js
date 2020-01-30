const urlMap = {
  google: 'https://google.com',
  stan: 'https://stan.systems'
};

chrome.storage.sync.set({ urls: urlMap });

const GO_REGEX = /http:\/\/go\/(.+)\//i;
var filter = {
  urls: ['*://go/*']
};

const getUrl = goLinkRequested =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(['urls'], ({ urls }) =>
      !!urls[goLinkRequested] ? resolve(urls[goLinkRequested]) : reject()
    )
  );

const logOnBefore = async details => {
  const linkRequested = details.url.replace(GO_REGEX, '$1').toLowerCase();
  getUrl(linkRequested).then(url =>
    chrome.tabs.update({
      url
    })
  );
  return { cancel: true };
};

chrome.webRequest.onBeforeRequest.addListener(logOnBefore, filter, [
  'blocking'
]);
