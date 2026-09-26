// Refresh README.md from the live GitHub API:
//  1. regenerate the list of starred public repos (not forks, not archived) that
//     the curated tables do not already feature, between the STARRED-REPOS markers;
//  2. refresh the "⭐N" star counts on every repo link in a markdown table and
//     sort each table's rows by star count (descending).
// Idempotent: only touches the marked section, star markers and row order.
import { readFile, writeFile } from "node:fs/promises";

const FILE = "README.md";
const OWNER = "jaenster";
const token = process.env.GITHUB_TOKEN;
const START = "<!-- STARRED-REPOS:START -->";
const END = "<!-- STARRED-REPOS:END -->";
const MAX_DESC = 110;

const LINK = String.raw`\[\*\*[^\]]+\*\*\]\(https:\/\/github\.com\/([^/)]+)\/([^/)]+)\)`;
const LINK_STAR_G = new RegExp(`(${LINK})( ⭐\\d+)?`, "g"); // groups: 1 link, 2 owner, 3 repo, 4 star
const LINK_ONE = new RegExp(LINK); // groups: 1 owner, 2 repo

// A table row only has to start with a pipe; a missing trailing pipe is valid
// markdown and must not end the table.
const isRow = (l) => /^\s*\|/.test(l);
const isSeparator = (l) => /^\s*\|[\s:|-]*-[\s:|-]*\|?\s*$/.test(l);
const closeRow = (l) => (/\|\s*$/.test(l) ? l : `${l.trimEnd()} |`);
const key = (owner, repo) => `${owner}/${repo}`.toLowerCase();
const repoOf = (l) => {
  const m = l.match(LINK_ONE);
  return m ? key(m[1], m[2]) : null;
};

async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "jaenster-readme-stars",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
  return res.json();
}

// Every public repo of the owner, all pages.
async function ownerRepos() {
  const all = [];
  for (let page = 1; ; page++) {
    const batch = await api(`/users/${OWNER}/repos?type=owner&per_page=100&page=${page}`);
    all.push(...batch);
    if (batch.length < 100) return all;
  }
}

const repos = (await ownerRepos()).filter((r) => !r.private);
const stars = new Map(repos.map((r) => [key(OWNER, r.name), r.stargazers_count ?? 0]));

let md = await readFile(FILE, "utf8");

// 1. The generated section.
const s = md.indexOf(START);
const e = md.indexOf(END);
if (s !== -1 && e > s) {
  const curated = new Set();
  for (const l of (md.slice(0, s) + md.slice(e)).split("\n")) {
    const full = repoOf(l);
    if (full) curated.add(full);
  }
  const clean = (d) => {
    const t = (d ?? "").replace(/\s+/g, " ").replace(/\|/g, "\\|").trim();
    return t.length > MAX_DESC ? `${t.slice(0, MAX_DESC - 1).trimEnd()}…` : t;
  };
  const rows = repos
    .filter((r) => !r.fork && !r.archived && r.stargazers_count > 0)
    .filter((r) => !curated.has(key(OWNER, r.name)))
    .sort((a, b) => b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name))
    .map((r) => `| [**${r.name}**](${r.html_url}) ⭐${r.stargazers_count} | ${clean(r.description)} |`);
  const body = rows.length
    ? ["| Repo | What it does |", "|-|-|", ...rows].join("\n")
    : "_Nothing else yet._";
  md = `${md.slice(0, s + START.length)}\n${body}\n${md.slice(e)}`;
}

// 2. Star counts and sort order in every table.
const lines = md.split("\n");
for (const l of lines) {
  for (const m of l.matchAll(LINK_STAR_G)) {
    const full = key(m[2], m[3]);
    if (!stars.has(full)) stars.set(full, (await api(`/repos/${m[2]}/${m[3]}`)).stargazers_count ?? 0);
  }
}

const setStar = (row) =>
  row.replace(LINK_STAR_G, (_w, link, owner, repo) => {
    const n = stars.get(key(owner, repo)) ?? 0;
    return n > 0 ? `${link} ⭐${n}` : link;
  });

const out = [];
for (let i = 0; i < lines.length; ) {
  if (isRow(lines[i]) && isSeparator(lines[i + 1] ?? "")) {
    out.push(lines[i], lines[i + 1]);
    let j = i + 2;
    const body = [];
    while (j < lines.length && isRow(lines[j])) body.push(lines[j++]);

    const rows = body.map((r) => {
      const text = closeRow(setStar(r));
      const full = repoOf(text);
      return { text, count: (full && stars.get(full)) || 0 };
    });
    rows.sort((a, b) => b.count - a.count); // stable: ties keep original order

    out.push(...rows.map((r) => r.text));
    i = j;
  } else {
    out.push(lines[i++]);
  }
}

const next = out.join("\n");
const before = await readFile(FILE, "utf8");
if (next !== before) {
  await writeFile(FILE, next);
  console.log("README updated.");
} else {
  console.log("No changes.");
}
