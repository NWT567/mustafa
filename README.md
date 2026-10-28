# Mustafa Coffee House

Mustafa Coffee House is a React 19 and TypeScript application built with TanStack Start, Vite, Nitro, and Tailwind CSS.

## Run locally

Use Node.js 22.12 or newer.

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Demo admin login

The temporary admin login does not require a database or external authentication backend.

- Admin page: `http://localhost:3000/admin/login`
- Email: `admin@mustafacoffee.test`
- Username: `mustafa-admin`
- Password: `MustafaAdmin#2026`

Either the email or username can be entered in the first field.

> **Demo only:** These credentials are intentionally stored in the codebase for temporary development access. Replace them with real authentication and remove the demo fallbacks before deploying a production admin panel.

## Optional credential overrides

Copy `.env.example` to `.env.local` and set any credentials you want to override:

```env
ADMIN_EMAIL=your-admin@example.com
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=your-random-secret-at-least-32-characters
```

Restart the development server after changing environment variables.

## Main routes

- `/` — public website
- `/login` — customer login
- `/order` — ordering experience
- `/reserve` — table reservations
- `/loyalty` — loyalty experience
- `/download` — public application downloads
- `/admin/login` — demo administrator login
- `/admin` — protected administrator dashboard
- `/admin/orders` — protected order management
- `/admin/reservations` — protected reservation management
- `/admin/loyalty` — protected loyalty management
- `/admin/downloads` — protected application release management

## Production build

```powershell
npm run build
npm run preview
```