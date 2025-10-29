#!/bin/bash

echo "🚀 Setting up Bookmarks Interview Environment..."

# Backend setup
echo "📦 Installing Python dependencies..."
cd backend
pip install -r requirements.txt --break-system-packages

echo "🗄️  Setting up database..."
python manage.py makemigrations bookmarks users
python manage.py migrate

echo "👤 Creating test user..."
python manage.py shell << EOF
from django.contrib.auth.models import User
if not User.objects.filter(username='test').exists():
    User.objects.create_user('test', 'test@example.com', 'test1234')
    print('✅ Test user created: test@example.com / test1234')
else:
    print('✅ Test user already exists')
EOF

echo "📊 Creating sample data..."
python manage.py shell << EOF
from bookmarks.models import Bookmark, Tag
from django.contrib.auth.models import User

user = User.objects.get(username='test')

# Create tags
python_tag, _ = Tag.objects.get_or_create(name='python')
django_tag, _ = Tag.objects.get_or_create(name='django')
react_tag, _ = Tag.objects.get_or_create(name='react')
js_tag, _ = Tag.objects.get_or_create(name='javascript')

# Create bookmarks
if not Bookmark.objects.filter(owner=user).exists():
    b1 = Bookmark.objects.create(
        url='https://docs.djangoproject.com',
        title='Django Documentation',
        description='Official Django docs',
        owner=user
    )
    b1.tags.add(python_tag, django_tag)
    
    b2 = Bookmark.objects.create(
        url='https://react.dev',
        title='React Documentation',
        description='Learn React',
        owner=user
    )
    b2.tags.add(react_tag, js_tag)
    
    b3 = Bookmark.objects.create(
        url='https://www.python.org',
        title='Python Official Site',
        description='Python programming language',
        owner=user
    )
    b3.tags.add(python_tag)
    
    print('✅ Sample bookmarks created')
else:
    print('✅ Sample data already exists')
EOF

cd ..

# Frontend setup
echo "📦 Installing Node dependencies..."
cd frontend
npm install

cd ..

echo "✅ Setup complete!"
echo ""
echo "To run the application:"
echo "  Backend:  cd backend && python manage.py runserver 0.0.0.0:8000"
echo "  Frontend: cd frontend && npm run dev"
