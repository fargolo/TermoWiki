const api = 'https://xtools.wmflabs.org/api/page';

async function main() {
  let revisions = document.getElementById("revisions");
  let references = document.getElementById("references");
  let editors = document.getElementById("editors");
  let fullReference = document.getElementById("fullReference");

  let queryOptions = { active: true, currentWindow: true };
  let [{ url: urlStr }] = await chrome.tabs.query(queryOptions);

  let wikiRegex = /.*:\/\/.*\.wikipedia\.org\/.*/
  if (wikiRegex.test(urlStr)) {
    let url = new URL(urlStr);

    let project = url.host;
    let article = url.pathname.split('/')[2];

    let res1 = await fetch(`${api}/articleinfo/${project}/${article}`);
    let articleInfo = await res1.json();

    revisions.innerHTML = articleInfo.revisions;
    editors.innerHTML = articleInfo.editors;

    let res2 = await fetch(`${api}/prose/${project}/${article}`);
    let prose = await res2.json();

    let referenceUrl = `https://xtools.wmflabs.org/articleinfo/${project}/${article}?uselang=${project}`;

    fullReference.href = referenceUrl;
  }
}

main();
