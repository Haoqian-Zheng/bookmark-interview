import { Bookmark } from '@/types';
import BookmarkCard from './BookmarkCard';

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onDelete: (id: number) => void;
}

export default function BookmarkList({ bookmarks, onDelete }: BookmarkListProps) {
  // BUG #3: No loading state displayed
  // Should show skeleton or spinner while loading

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No bookmarks yet</p>
        <p className="mt-2">Add your first bookmark to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
