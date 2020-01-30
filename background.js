const GO_REGEX = /http:\/\/go\/(.+)\//i;
var filter = {
  urls: ["*://go/*"]
};

const logOnBefore = async details => {
  console.log(details);
  const linkRequested = details.url.replace(GO_REGEX, "$1").toLowerCase();
  fetch(`http://localhost:3000?url=${linkRequested}`)
    .then(response => response.text())
    .then(url =>
      chrome.tabs.update({
        url
      })
    );
  return { cancel: true };
};

chrome.webRequest.onBeforeRequest.addListener(logOnBefore, filter, [
  "blocking"
]);
