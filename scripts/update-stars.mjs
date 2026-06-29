// Refresh the "⭐N" star counts on the repo links in README.md from the live
// GitHub API, and sort each table's rows by star count (descending).
// Idempotent: only touches markers and row order inside markdown tables.
import { readFile, writeFile } from "node:fs/promises";

const FILE = "README.md";
const token = process.env.GITHUB_TOKEN;

const LINK = String.raw`\[\*\*[^\]]+\*\*\]\(https:\/\/github\.com\/([^/)]+)\/([^/)]+)\)`;
const LINK_STAR_G = new RegExp(`(${LINK})( ⭐\\d+)?`, "g"); // groups: 1 link, 2 owner, 3 repo, 4 star
const LINK_ONE = new RegExp(LINK); // groups: 1 owner, 2 repo

const isRow = (l) => /^\s*\|.*\|\s*$/.test(l);
const isSeparator = (l) => /^\s*\|[\s:|-]*-[\s:|-]*\|\s*$/.test(l);
const repoOf = (l) => {
  const m = l.match(LINK_ONE);
  return m ? `${m[1]}/${m[2]}` : null;
};

async function fetchStars(full) {
  const res = await fetch(`https://api.github.com/repos/${full}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "jaenster-readme-stars",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`${full}: ${res.status} ${res.statusText}`);
  return (await res.json()).stargazers_count ?? 0;
}

const md = await readFile(FILE, "utf8");
const lines = md.split("\n");

const repos = new Set();
for (const l of lines) {
  const full = repoOf(l);
  if (full) repos.add(full);
}

const stars = new Map();
for (const full of repos) stars.set(full, await fetchStars(full));

const setStar = (row) =>
  row.replace(LINK_STAR_G, (_w, link, owner, repo) => {
    const n = stars.get(`${owner}/${repo}`) ?? 0;
    return n > 0 ? `${link} ⭐${n}` : link;
  });

const out = [];
for (let i = 0; i < lines.length; ) {
  if (isRow(lines[i]) && isSeparator(lines[i + 1] ?? "")) {
    const header = lines[i];
    const sep = lines[i + 1];
    let j = i + 2;
    const body = [];
    while (j < lines.length && isRow(lines[j])) body.push(lines[j++]);

    const rows = body.map((r) => {
      const text = setStar(r);
      const full = repoOf(text);
      return { text, count: (full && stars.get(full)) || 0 };
    });
    rows.sort((a, b) => b.count - a.count); // stable: ties keep original order

    out.push(header, sep, ...rows.map((r) => r.text));
    i = j;
  } else {
    out.push(lines[i++]);
  }
}

const next = out.join("\n");
if (next !== md) {
  await writeFile(FILE, next);
  console.log("README updated (stars + sort).");
} else {
  console.log("No changes.");
}
