const api = 'https://xtools.wmflabs.org/api/page';

async function main() {
  const revisions = document.getElementById("revisions");
  const references = document.getElementById("references");
  const negativeFlags = document.getElementById("negativeFlags");
  const editors = document.getElementById("editors");

  const queryOptions = { active: true, currentWindow: true };
  const [{ url: urlStr }] = await chrome.tabs.query(queryOptions);
  
  const wikiRegex = /.*:\/\/.*\.wikipedia\.org\/.*/
  if (wikiRegex.test(urlStr)) {
    const url = new URL(urlStr);

    const project = url.host;
    const article = url.pathname.split('/')[2];

    const res1 = await fetch(`${api}/articleinfo/${project}/${article}`);
    const articleInfo = await res1.json();

    revisions.innerHTML = articleInfo.revisions;
    editors.innerHTML = articleInfo.editors;

    const res2 = await fetch(`${api}/prose/${project}/${article}`);
    const prose = await res2.json();

    references.innerHTML = prose.references;
  }
}

main();
