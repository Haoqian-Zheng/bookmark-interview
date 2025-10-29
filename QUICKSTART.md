# 🚀 Quick Start Guide

## First Time Setup (5 minutes)

```bash
cd bookmark-interview
./setup.sh
```

This will:
- ✅ Install Python dependencies
- ✅ Create database and run migrations
- ✅ Create test user (test@example.com / test1234)
- ✅ Add sample bookmarks
- ✅ Install Node.js dependencies

## Running the Application

```bash
./run.sh
```

Then open:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/admin

Login with:
- Email: `test@example.com`
- Password: `test1234`

## For Replit

1. Upload this folder to Replit
2. Click "Run" button
3. Both servers start automatically
4. Frontend appears in webview

## Project Structure

```
bookmark-interview/
├── README.md              ← Start here
├── QUICKSTART.md         ← This file
├── setup.sh              ← Run once to setup
├── run.sh                ← Run to start servers
├── .replit               ← Replit configuration
├── .gitignore            ← Git ignore rules
├── replit.nix            ← Nix dependencies
├── backend/
│   ├── BUGS.md          ← Backend bugs list
│   ├── requirements.txt
│   ├── manage.py
│   ├── config/          ← Django settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── bookmarks/       ← Main app (models, views, serializers)
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── admin.py
│   └── users/           ← Authentication
│       ├── views.py
│       ├── serializers.py
│       └── urls.py
└── frontend/
    ├── BUGS.md          ← Frontend bugs list
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── postcss.config.js
    └── src/
        ├── app/         ← Pages (Next.js 14 app router)
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── globals.css
        │   ├── login/
        │   │   └── page.tsx
        │   └── bookmarks/
        │       └── page.tsx
        ├── components/  ← React components
        │   ├── Navbar.tsx
        │   ├── BookmarkList.tsx
        │   ├── BookmarkCard.tsx
        │   └── AddBookmarkForm.tsx
        ├── lib/         ← API client & auth
        │   ├── api.ts
        │   └── auth.ts
        └── types/       ← TypeScript types
            └── index.ts
```

## Interview Versions

### Backend Only
- **Focus:** `backend/bookmarks/` directory
- **Bugs:** See `backend/BUGS.md` (5 bugs)
- **Frontend works perfectly** (for testing)

### Frontend Only  
- **Focus:** `frontend/src/` directory
- **Bugs:** See `frontend/BUGS.md` (5 bugs)
- **Backend works perfectly** (API ready to use)

### Fullstack
- **Fix bugs in both:** 2-3 backend + 2-3 frontend
- **See both:** `backend/BUGS.md` + `frontend/BUGS.md`

## Common Commands

**Backend:**
```bash
cd backend
python manage.py runserver        # Start server
python manage.py shell            # Django shell
python manage.py makemigrations   # Create migrations
python manage.py migrate          # Apply migrations
python manage.py createsuperuser  # Admin user
```

**Frontend:**
```bash
cd frontend
npm run dev    # Development server
npm run build  # Production build
npm install    # Install dependencies
```

## Troubleshooting

### Setup issues
```bash
# Re-run setup
./setup.sh

# Or manually:
cd backend
pip install -r requirements.txt --break-system-packages
python manage.py migrate
```

### Port in use
```bash
# Kill processes
lsof -ti:8000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

### Database reset
```bash
cd backend
rm db.sqlite3
python manage.py migrate
cd ..
./setup.sh  # Re-create test data
```

### Frontend dependencies issue
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## File Checklist

Verify you have all these files:

### Root Files
- [x] README.md
- [x] QUICKSTART.md
- [x] setup.sh
- [x] run.sh
- [x] .replit
- [x] .gitignore
- [x] replit.nix

### Backend Files (21 files)
- [x] backend/BUGS.md
- [x] backend/requirements.txt
- [x] backend/manage.py
- [x] backend/config/__init__.py
- [x] backend/config/settings.py
- [x] backend/config/urls.py
- [x] backend/config/wsgi.py
- [x] backend/bookmarks/__init__.py
- [x] backend/bookmarks/models.py
- [x] backend/bookmarks/views.py
- [x] backend/bookmarks/serializers.py
- [x] backend/bookmarks/urls.py
- [x] backend/bookmarks/admin.py
- [x] backend/users/__init__.py
- [x] backend/users/models.py
- [x] backend/users/views.py
- [x] backend/users/serializers.py
- [x] backend/users/urls.py
- [x] backend/users/admin.py

### Frontend Files (15 files)
- [x] frontend/BUGS.md
- [x] frontend/package.json
- [x] frontend/next.config.js
- [x] frontend/tailwind.config.js
- [x] frontend/tsconfig.json
- [x] frontend/postcss.config.js
- [x] frontend/src/app/layout.tsx
- [x] frontend/src/app/page.tsx
- [x] frontend/src/app/globals.css
- [x] frontend/src/app/login/page.tsx
- [x] frontend/src/app/bookmarks/page.tsx
- [x] frontend/src/components/Navbar.tsx
- [x] frontend/src/components/BookmarkList.tsx
- [x] frontend/src/components/BookmarkCard.tsx
- [x] frontend/src/components/AddBookmarkForm.tsx
- [x] frontend/src/lib/api.ts
- [x] frontend/src/lib/auth.ts
- [x] frontend/src/types/index.ts

**Total: 43 files**

## What Next?

1. ✅ Extract the archive
2. ✅ Run `./setup.sh`
3. ✅ Run `./run.sh`
4. ✅ Open http://localhost:3000
5. ✅ Start fixing bugs!

## Interview Preparation

**For Interviewers:**
1. Test the setup yourself first
2. Verify both servers start correctly
3. Create a Replit template for easy sharing
4. Have the scoring rubric ready (see README.md)

**For Candidates:**
1. Read the appropriate BUGS.md file
2. Understand the app structure
3. Test the app to see the bugs in action
4. Fix bugs in priority order
5. Verify your fixes work

Good luck! 🚀
