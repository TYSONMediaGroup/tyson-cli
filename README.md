<p align="center">
  <a href="https://tysonmediagroup.org">
    <img src="https://raw.githubusercontent.com/TYSONMediaGroup/tysonmediagroup.org.myt5s.app/main/assets/LOGOSFORGEMINI/TYSONMediaGroupBanner.png" alt="TYSON Media Group" width="700">
  </a>
</p>

<h1 align="center">TYSON CLI</h1>

<p align="center">
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white" alt="Node.js"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript"></a>
  <a href="https://github.com/tj/commander.js"><img src="https://img.shields.io/badge/CLI-Commander-007ACC" alt="Commander CLI"></a>
  <a href="https://tysonmediagroup.org"><img src="https://img.shields.io/badge/Platform-myTYSON-007ACC" alt="myTYSON"></a>
</p>

> [!NOTE]
> **This TYSON Project is currently in active development.** Check back often for updates and new features!

Official Command Line Interface for the myTYSON Publishing Platform and TYSON Media Group ecosystem.

---

## Installation

```bash
git clone https://github.com/TYSONMediaGroup/tyson-cli.git
cd tyson-cli
npm install
npm link
```

## Commands

### Check Server Status
```bash
tyson status
```

### List Articles in Queue
```bash
tyson list
```

### Draft / Publish Content
```bash
tyson publish
```
Prompts interactively for content type, article title, slug, and tags to draft new publications.
