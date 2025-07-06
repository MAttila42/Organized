# Organized App

Your everyday companion app

## Contributing

### Tech Stack

This app is made with

- [SvelteKit](https://svelte.dev/)
- [Shadcn](https://shadcn-svelte.com/)
- [UnoCSS](https://unocss.dev/)
- [Tauri](https://tauri.app/)
- [Bun](https://bun.sh/)
- [Drizzle](https://orm.drizzle.team/)
- [@yuo-app/lin](https://github.com/yuo-app/lin)

See documentation for each to get started.

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
- [Tauri](https://tauri.app/start/prerequisites/)
- [VSCode](https://code.visualstudio.com/) (recommended)
- You should also install all recommended VSCode extensions from the `.vscode/extensions.json` file.

### Setup

Example commands use [@antfu/ni](https://github.com/antfu-collective/ni).

```sh
ni # Install dependencies
nr sync # Sync svelte types
nr init # Initialize android target
nr desktop # Start desktop dev build + creates database
nlx eemoji init -c none # Initialize automatic commit emojis
```

If you wish to use the [lin](https://github.com/yuo-app/lin) tool, you need to set up the environment variables in the `.env` file. You can use the `.env.example` as a template.

### Commands

#### Start development server

```sh
nr desktop # Target: Windows, Linux, MacOS
nr android # Target: Android
```

#### Build

```sh
nr build:desktop
nr build:android
```

Android build requirees [distribution setup](https://tauri.app/distribute/).

#### Database

```sh
nr db:generate # Generate SQL migrations
nr db:migrate # Apply migrations
nr db:push # Push schema changes without SQL file generations
nr db:studio # Start real time SQL explorer
```

For more information, check the [documentation](https://orm.drizzle.team/docs/kit-overview).

#### Other

```sh
nr add <component> # Add shadcn component
nr lint # Eslint check and fix
nr lin <command> [options] # Run lin commands
nr tauri <command> [options] # Run tauri commands
```
