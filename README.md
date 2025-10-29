# Bookmarks Manager - Technical Interview

A simple application where users can save, organize, and search their bookmarked links.

## Your Role

This interview is customized for your role. Please read the appropriate section:

- 🔧 **Backend Engineer** → See [Backend Instructions](#backend-engineer)
- 🎨 **Frontend Engineer** → See [Frontend Instructions](#frontend-engineer)  
- 🔄 **Fullstack Engineer** → See [Fullstack Instructions](#fullstack-engineer)

---

## Backend Engineer

**Time limit:** 40 minutes

### What Works
✅ Frontend is fully functional - use it to test your API changes  
✅ Authentication & basic CRUD endpoints exist  
✅ Database is pre-seeded with test data

### What's Broken
Your job is to fix critical bugs in the Django backend. See `backend/BUGS.md` for details.

### Getting Started
```bash
# First time setup
./setup.sh

# Run the application
./run.sh

# Or run manually:
# Terminal 1 - Backend
cd backend
python manage.py runserver

# Terminal 2 - Frontend (for testing)
cd frontend
npm run dev
```

Visit http://localhost:3000 and login with:
- Email: `test@example.com`
- Password: `test1234`

**Focus on:** `backend/bookmarks/` directory only

---

## Frontend Engineer

**Time limit:** 40 minutes

### What Works
✅ Backend API is fully functional with proper authentication  
✅ All API endpoints return correct data  
✅ Database is pre-seeded with test data

### What's Broken
Your job is to fix UX and functionality issues in the Next.js frontend. See `frontend/BUGS.md` for details.

### Getting Started
```bash
# First time setup
./setup.sh

# Run the application
./run.sh

# Or run manually:
# Terminal 1 - Backend (runs automatically for you)
cd backend
python manage.py runserver

# Terminal 2 - Frontend (your focus)
cd frontend
npm run dev
```

Visit http://localhost:3000 and login with:
- Email: `test@example.com`
- Password: `test1234`

**Focus on:** `frontend/src/` directory only

---

## Fullstack Engineer

**Time limit:** 40 minutes

### What's Broken
Both the backend and frontend have critical bugs that need fixing. You'll need to identify and fix issues across the entire stack.

**See both:**
- `backend/BUGS.md` - Backend issues (fix 2-3 bugs)
- `frontend/BUGS.md` - Frontend issues (fix 2-3 bugs)

### Getting Started
```bash
# First time setup
./setup.sh

# Run the application
./run.sh
```

Visit http://localhost:3000 and login with:
- Email: `test@example.com`
- Password: `test1234`

### Strategy Tip
Start by identifying which bugs are backend vs frontend issues. Fix the backend issues first, then move to frontend, or tackle them in order of severity.

---

## App Features (For Reference)

**Bookmarks have:**
- URL
- Title
- Description (optional)
- Tags (multiple)
- Created date
- Owner (user)

**Main page shows:**
- List of your bookmarks
- Search bar (searches title/description)
- Tag filter dropdown
- Add new bookmark button

**You can:**
- Create new bookmarks
- Delete your own bookmarks
- Filter by tags
- Search bookmarks
- See bookmark count

---

## Project Structure

```
bookmarks-interview/
├── backend/
│   ├── bookmarks/        # Main app with models, views, serializers
│   ├── users/            # Authentication
│   ├── config/           # Django settings
│   └── BUGS.md          # Backend bugs to fix
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js pages
│   │   ├── components/  # React components
│   │   ├── lib/         # API utilities
│   │   └── types/       # TypeScript types
│   └── BUGS.md          # Frontend bugs to fix
├── setup.sh             # One-time setup script
└── run.sh              # Run both servers
```

---

## Evaluation Criteria

We're looking for:
- ✅ **Problem solving** - Can you identify and fix the bugs?
- ✅ **Code quality** - Are your fixes clean and maintainable?
- ✅ **Best practices** - Do you follow Django/Next.js conventions?
- ✅ **Testing mindset** - Do you verify your fixes work?
- ✅ **Communication** - Can you explain your approach?

**Don't worry about:**
- ❌ Perfect styling/CSS
- ❌ Adding new features (unless a bug requires it)
- ❌ Refactoring working code
- ❌ Writing tests (though feel free if time permits)

---

## Useful Commands

**Backend:**
```bash
cd backend
python manage.py shell          # Django shell
python manage.py makemigrations # Create migrations
python manage.py migrate        # Run migrations
python manage.py createsuperuser # Create admin user
```

**Frontend:**
```bash
cd frontend
npm run dev                     # Start dev server
npm run build                   # Build for production
```

---

## Troubleshooting

**"Module not found" errors:**
```bash
# Backend
cd backend
pip install -r requirements.txt --break-system-packages

# Frontend
cd frontend
npm install
```

**Database issues:**
```bash
cd backend
rm db.sqlite3
python manage.py migrate
# Then run setup.sh again to recreate test data
```

**Port already in use:**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

---

## For Replit Setup

If using Replit:
1. Import this project
2. Click "Run" - it will automatically execute `run.sh`
3. Both servers will start automatically
4. Frontend will be available in the webview
5. Make sure you're viewing port 3000 (not 8000)

---

## Questions During Interview?

Ask your interviewer! We're here to help if you get stuck or need clarification.

Good luck! 🚀
