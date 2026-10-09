<div align="center">

<a href="https://github.com/jaenster">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=28&duration=3500&pause=900&color=79FF97&center=true&vCenter=true&width=720&lines=Jan+Stoots+%E2%80%94+jaenster;TypeScript+enthusiast.;Reverse+engineer+%28noob%29.;I+make+Claude+do+things+it+shouldn't." alt="typing banner" />
</a>

<p>
  <img src="https://img.shields.io/badge/Netherlands-%F0%9F%87%B3%F0%9F%87%B1-9f9f9f?style=flat-square" alt="NL" />
  <a href="https://github.com/jaenster?tab=followers"><img src="https://img.shields.io/github/followers/jaenster?style=flat-square&color=79ff97&label=followers" alt="followers" /></a>
  <a href="https://github.com/sponsors/jaenster"><img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-ea4aaa?style=flat-square&logo=githubsponsors&logoColor=white" alt="Sponsor" /></a>
</p>

</div>

---

I reverse-engineer old games, build developer tools across too many languages, and write more libraries than anyone asked for.

```ts
const jaenster = {
  location:    "Netherlands",
  code:        ["TypeScript", "Zig", "Go", "C++", "Swift"] as const,
  pets:        ["void", "pointer"], // no leaks so far
  editor:      "JetBrains (IDEA)",
  rabbitHoles: ["Diablo II internals", "the entire WeakRef family", "reimplementing JS primitives for fun", "type-level TS"],
  askMeAbout:  ["building MCP servers", "reverse engineering old games", "Zig & distributed TS"],
  currently:   "reverse engineering Diablo II and building MCP servers in Zig",
  funFacts: [
    "thinks the type system is a separate programming language",
    "won't stop talking about Diablo II",
    "shipped more TypeScript micro-libs than anyone asked for",
    "has read more disassembly than is strictly healthy",
    "would rather write a polyfill than wait for TC39",
    "measures uptime in Baal runs",
  ] as const,
} satisfies Developer;
```

### Tech

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Zig](https://img.shields.io/badge/Zig-F7A41D?style=flat-square&logo=zig&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=cplusplus&logoColor=white)
![Swift](https://img.shields.io/badge/Swift-F05138?style=flat-square&logo=swift&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=flat-square&logo=postgresql&logoColor=white)

---

### Diablo II, reverse-engineered

| Repo | What it does |
|-|-|
| [**jaenster-kolbot**](https://github.com/jaenster/jaenster-kolbot) ⭐41 | Diablo II botting framework |
| [**d2-dedicated-server**](https://github.com/jaenster/d2-dedicated-server) ⭐28 | Self-hosted cloud-native D2 1.14d realm + game server in Zig (modern PvPGN) |
| [**libd2**](https://github.com/jaenster/libd2) ⭐15 | A Zig reimplementation of the deterministic Diablo II 1.14d engine core |
| [**d2-clientless**](https://github.com/jaenster/d2-clientless) ⭐10 | Clientless D2 1.14d Battle.net client (BNCS/MCP/BNFTP/D2GS) in Zig |
| [**d2inject**](https://github.com/jaenster/d2inject) ⭐6 | Diablo II injection tooling |
| [**aether**](https://github.com/jaenster/aether) ⭐5 | The unseen layer between you and Diablo II |
| [**ryuk**](https://github.com/jaenster/ryuk) ⭐4 | Diablo II bot — the one that eats apples |

<!-- STARRED:diablo:START -->
_Also starred:_

| Repo | What it does |
|-|-|
| [**d2mac-linux**](https://github.com/jaenster/d2mac-linux) ⭐4 | The 1.14d macOS Diablo II binary running natively on 32-bit Linux: Mach-O converted to ELF, Darwin/Carbon rei… |
| [**blizzard-legacy-dl**](https://github.com/jaenster/blizzard-legacy-dl) ⭐3 | Download the legacy Blizzard games (Diablo II, StarCraft, Warcraft III) from Blizzard's own servers, without… |
| [**d2-bnftp-archive**](https://github.com/jaenster/d2-bnftp-archive) ⭐3 | Archive of every file Blizzard's classic Battle.net servers serve over BNFTP |
| [**D2OpenGL**](https://github.com/jaenster/D2OpenGL) ⭐3 | OpenGL renderer for Diablo II 1.14d on Windows, restored from the Mac build |
| [**socks5-diablo**](https://github.com/jaenster/socks5-diablo) ⭐3 | Very simple implementation of socks5 protocol |
<!-- STARRED:diablo:END -->

### Libraries

_Mostly solutions to problems I gave myself._

| Repo | What it does |
|-|-|
| [**justscale**](https://github.com/justscale/justscale) ⭐17 | Write a single-server backend. It just scales across a cluster. |
| [**fake-socket**](https://github.com/jaenster/fake-socket) ⭐5 | In-memory socket implementation |
| [**weakrefmap**](https://github.com/jaenster/weakrefmap) ⭐4 | WeakRef-backed Map — one of an unreasonable number of WeakRef variants |

<!-- STARRED:libraries:START -->
<!-- STARRED:libraries:END -->

### Apps & daemons

| Repo | What it does |
|-|-|
| [**hush**](https://github.com/jaenster/hush) ⭐3 | macOS secrets daemon (ssh-agent for env vars) — Zig + libsodium |
| [**MacDirStat**](https://github.com/jaenster/macdirstat) ⭐1 | Disk usage as a treemap for macOS, in the shape of WinDirStat. Pure Zig against AppKit. |
| [**hoardarr**](https://github.com/jaenster/hoardarr) | Drop-in SABnzbd replacement with a Sonarr/Radarr-style UI — pure-Go single binary, no cgo |

<!-- STARRED:apps:START -->
<!-- STARRED:apps:END -->

### MCP servers for agentic llm's

| Repo | What it does |
|-|-|
| [**puppeteer-mcp-claude**](https://github.com/jaenster/puppeteer-mcp-claude) ⭐49 | Browser automation for Claude, powered by Puppeteer |
| [**ts-lsp-mcp**](https://github.com/jaenster/ts-lsp-mcp) ⭐3 | TypeScript language-server features as MCP tools |
| [**remote-shell-mcp**](https://github.com/jaenster/remote-shell-mcp) ⭐2 | Persistent SSH, SFTP, port-forwarding & Docker over MCP |
| [**ghidra-mcp**](https://github.com/jaenster/ghidra-mcp) ⭐1 | Ghidra reverse-engineering over MCP — headless daemon, OAuth 2.1, k8s |
| [**node-debugger-mcp**](https://github.com/jaenster/node-debugger-mcp) | A real Node.js debugger for Claude via the V8 Inspector Protocol |
| [**nestjs-mcp-controller**](https://github.com/jaenster/nestjs-mcp-controller) | Build MCP servers in NestJS with `@Controller`/`@Tool()` classes |

<!-- STARRED:mcp:START -->
<!-- STARRED:mcp:END -->

---

<div align="center">

Reach me on Discord — `jaenster#1337`

<sub>Most of it works. The rest are undocumented features.</sub>

</div>
