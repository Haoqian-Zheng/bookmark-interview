#!/bin/bash
set -e

echo "🚀 Starting Bookmarks Manager..."

# Check if setup has been run
if [ ! -f "backend/db.sqlite3" ]; then
    echo "⚠️  Database not found. Running setup first..."
    bash setup.sh
fi

# Kill any existing processes on these ports
echo "🧹 Cleaning up any existing processes..."
lsof -ti:8000 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true

# Wait a moment for ports to be freed
sleep 1

# Start backend in background
echo "🔧 Starting Django backend on port 8000..."
cd backend
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
echo "⏳ Waiting for backend to be ready..."
sleep 5

# Start frontend
echo "🎨 Starting Next.js frontend on port 3000..."
cd ../frontend
NEXT_PUBLIC_API_URL="http://localhost:8000" npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "✅ Both servers running!"
echo "📍 Backend:  http://localhost:8000"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Login:    test@example.com / test1234"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

# Trap Ctrl+C and other termination signals
trap cleanup INT TERM EXIT

# Wait for both processes
wait
