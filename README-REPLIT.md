# 🚀 Running on Replit

## Quick Start

Just click the **Run** button at the top! 

The `run.sh` script will:
1. Check if setup is needed
2. Start Django backend (port 8000)
3. Start Next.js frontend (port 3000)

## First Time Setup

If this is your first time running, the app will automatically run `setup.sh` which:
- ✅ Installs Python dependencies
- ✅ Creates database and runs migrations
- ✅ Creates test user: `test@example.com` / `test1234`
- ✅ Adds sample bookmarks
- ✅ Installs Node.js dependencies

**This takes about 3-5 minutes.**

## Accessing the App

After setup completes, you'll see:
```
✅ Both servers running!
📍 Backend:  http://localhost:8000
📍 Frontend: http://localhost:3000
📍 Login:    test@example.com / test1234
```

**Important:** In Replit's webview, make sure you're viewing **port 3000** (the frontend), not port 8000.

Click the port dropdown in the webview and select **3000**.

## Manual Setup (if needed)

If automatic setup fails, run in the Shell:

```bash
bash setup.sh
```

Then click Run again.

## Interview Instructions

### For Backend Engineers
- **Focus:** Fix bugs in `backend/bookmarks/`
- **Documentation:** See `backend/BUGS.md`
- **Time:** 40 minutes

### For Frontend Engineers  
- **Focus:** Fix bugs in `frontend/src/`
- **Documentation:** See `frontend/BUGS.md`
- **Time:** 40 minutes

### For Fullstack Engineers
- **Focus:** Fix bugs in both backend and frontend
- **Documentation:** See both BUGS.md files
- **Time:** 40 minutes

## Troubleshooting

### "Port already in use"
Click **Stop** then **Run** again. The script will clean up old processes.

### "Database locked"
Run in Shell:
```bash
cd backend
rm db.sqlite3
cd ..
bash setup.sh
```

### "Module not found"
Run in Shell:
```bash
bash setup.sh
```

### Frontend shows blank page
Make sure you're viewing **port 3000** in the webview, not port 8000.

### Console/Shell Commands

**Backend:**
```bash
cd backend
python manage.py shell          # Django shell
python manage.py createsuperuser # Create admin
python manage.py makemigrations # Create migrations
python manage.py migrate        # Run migrations
```

**Frontend:**
```bash
cd frontend
npm run dev     # Start dev server
npm run build   # Build for production
```

## Project Structure

```
bookmark-interview/
├── .replit              ← Replit configuration (already set up)
├── run.sh              ← Starts both servers (click Run button)
├── setup.sh            ← One-time setup (runs automatically)
├── README.md           ← Main documentation
├── backend/
│   ├── BUGS.md        ← Backend bugs to fix
│   ├── bookmarks/     ← Main app with bugs
│   ├── config/        ← Django settings
│   └── users/         ← Authentication
└── frontend/
    ├── BUGS.md        ← Frontend bugs to fix
    └── src/           ← Next.js app with bugs
```

## What's Working

✅ Automatic setup on first run  
✅ Both servers start automatically  
✅ Hot reload (changes auto-refresh)  
✅ Pre-configured ports  
✅ Test user and sample data

## What to Fix

See the appropriate BUGS.md file for your role!

---

**Questions?** Check the main [README.md](README.md) for detailed documentation.

**Good luck!** 🚀
