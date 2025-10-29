#!/bin/bash

echo "🚀 Starting Bookmarks Manager..."

# Start backend in background
echo "🔧 Starting Django backend on port 8000..."
cd backend
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Next.js frontend on port 3000..."
cd ../frontend
NEXT_PUBLIC_API_URL="http://localhost:8000" npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers running!"
echo "📍 Backend:  http://localhost:8000"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
