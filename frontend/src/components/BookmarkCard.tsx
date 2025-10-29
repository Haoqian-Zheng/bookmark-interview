import { Bookmark } from '@/types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: number) => void;
}

export default function BookmarkCard({ bookmark, onDelete }: BookmarkCardProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg flex-1 mr-2">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            {bookmark.title}
          </a>
        </h3>
        <button
          onClick={() => onDelete(bookmark.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-2">{getDomain(bookmark.url)}</p>

      {bookmark.description && (
        <p className="text-sm text-gray-700 mb-3">{bookmark.description}</p>
      )}

      {bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {bookmark.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2">
        {new Date(bookmark.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
