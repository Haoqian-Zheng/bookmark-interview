'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { api } from '@/lib/api';
import Navbar from '@/components/Navbar';
import BookmarkList from '@/components/BookmarkList';
import AddBookmarkForm from '@/components/AddBookmarkForm';
import { Bookmark, Tag } from '@/types';

export default function BookmarksPage() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);

  // BUG #2: Filter state not preserved in URL
  // Should use useSearchParams and update URL when filter changes

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadBookmarks();
    loadTags();
  }, [router]);

  const loadBookmarks = async (search?: string, tag?: string) => {
    // BUG #3: No loading state
    const data = await api.getBookmarks(search, tag);
    setBookmarks(data);
  };

  const loadTags = async () => {
    const data = await api.getTags();
    setTags(data);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // BUG #1: No debouncing - calls API on every keystroke
    loadBookmarks(query, selectedTag);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
    loadBookmarks(searchQuery, tag);
  };

  const handleAddBookmark = async (data: any) => {
    // BUG #5: No error handling
    await api.createBookmark(data);
    setShowAddForm(false);
    loadBookmarks(searchQuery, selectedTag);
    loadTags();
  };

  const handleDeleteBookmark = async (id: number) => {
    // BUG #4: Delete doesn't update UI immediately
    await api.deleteBookmark(id);
    // Missing: setBookmarks(bookmarks.filter(b => b.id !== id))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={() => {
        auth.logout();
        router.push('/login');
      }} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Bookmarks</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {showAddForm ? 'Cancel' : '+ Add Bookmark'}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6">
            <AddBookmarkForm onSubmit={handleAddBookmark} />
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <select
            value={selectedTag}
            onChange={(e) => handleTagFilter(e.target.value)}
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">All tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <BookmarkList
          bookmarks={bookmarks}
          onDelete={handleDeleteBookmark}
        />
      </div>
    </div>
  );
}
