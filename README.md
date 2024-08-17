# Organized App

Modular app for organizing your life.

## Contributing

This app is made with [Nuxt](https://nuxt.com/), [shadcn](https://www.shadcn-vue.com/), [UnoCSS](https://unocss.dev/) and [Tauri](https://v2.tauri.app/). See documentation for each to get started.

### Prerequisites

- [Bun](https://bun.sh/)
- [Tauri v2 prerequisites](https://v2.tauri.app/start/prerequisites/)

### Commands

Example commands use [@antfu/ni](https://github.com/antfu-collective/ni).

#### Start development server

```bash
nr desktop # Target: Windows, Linux, MacOS
nr android # Target: Android
```

#### Build ([Distribute](https://v2.tauri.app/distribute/))

```bash
nr build:desktop
nr build:android # Requires distribution setup
```

#### Other

Add shdcn component to the app:

```bash
nr add
```

Migrate database schema changes:

```bash
nr migrate
```

Live SQL explorer (works with desktop target):

```bash
nr studio
```

Regenerate Nuxt:

```bash
nr generate
```
