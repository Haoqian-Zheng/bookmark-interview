# Backend Bugs to Fix

Your Django backend has 5 critical bugs. Fix as many as you can in 40 minutes.

---

## 🐛 Bug #1: Performance Issue - Slow List Endpoint

**Severity:** HIGH  
**File:** `bookmarks/views.py` - `BookmarkListCreateView`

**Problem:**  
The bookmarks list endpoint is extremely slow when users have many bookmarks with tags. Each bookmark triggers additional database queries.

**How to verify:**
1. Check Django Debug Toolbar or add `print(len(connection.queries))` 
2. Notice N+1 query pattern with tags

**Expected behavior:**  
Should use `select_related()` or `prefetch_related()` to optimize queries. For 20 bookmarks with tags, should be ~3 queries instead of 40+.

**Hint:** Check the serializer - it accesses `bookmark.tags.all()` for each bookmark

---

## 🐛 Bug #2: Security Issue - Can Delete Others' Bookmarks

**Severity:** CRITICAL  
**File:** `bookmarks/views.py` - `BookmarkDetailView`

**Problem:**  
Any authenticated user can delete any bookmark by knowing its ID, even if they don't own it.

**How to verify:**
1. Login as `test@example.com`
2. Note a bookmark ID owned by another user
3. Send DELETE request - it succeeds!

**Expected behavior:**  
Users should only be able to delete their own bookmarks. Should return 403 Forbidden if trying to delete someone else's bookmark.

**Hint:** Add permission check in `delete()` method or use `get_queryset()` to filter by owner

---

## 🐛 Bug #3: Missing Pagination

**Severity:** MEDIUM  
**File:** `bookmarks/views.py` - `BookmarkListCreateView`

**Problem:**  
The list endpoint returns ALL bookmarks at once. With 1000+ bookmarks, the response is huge and slow.

**Expected behavior:**  
Should paginate results (e.g., 20 per page) with `page` query parameter support.

**How to verify:**
Open http://localhost:8000/api/bookmarks/ - notice all bookmarks returned

**Hint:** Use Django REST Framework's `PageNumberPagination`

---

## 🐛 Bug #4: Broken Tag Filtering

**Severity:** MEDIUM  
**File:** `bookmarks/views.py` - `BookmarkListCreateView` filter logic

**Problem:**  
When filtering by tag (e.g., `/api/bookmarks/?tag=python`), the results are incorrect or empty.

**How to verify:**
1. Visit http://localhost:8000/api/bookmarks/?tag=python
2. Results don't match bookmarks that actually have "python" tag

**Expected behavior:**  
Should return bookmarks that have the specified tag (case-insensitive).

**Hint:** Check the `Q` object query - might be using wrong field lookup or logic

---

## 🐛 Bug #5: Can Create Duplicate Bookmarks

**Severity:** LOW  
**File:** `bookmarks/models.py` - `Bookmark` model

**Problem:**  
A user can bookmark the same URL multiple times. This clutters their list.

**How to verify:**
1. Create a bookmark with URL "https://example.com"
2. Create another bookmark with the same URL
3. Both are saved successfully

**Expected behavior:**  
Should enforce unique constraint on (user, url) combination. Return validation error if duplicate attempted.

**Hint:** Add `unique_together` or `UniqueConstraint` in model Meta class

---

## Priority Order (if short on time)

1. **Bug #2** (Security) - Most critical
2. **Bug #1** (Performance) - High impact  
3. **Bug #4** (Tag filter) - Breaks key feature
4. **Bug #3** (Pagination) - Important for scale
5. **Bug #5** (Duplicates) - Nice to have

---

## Testing Your Fixes

After each fix:
1. Restart Django server if you changed models
2. Test the specific endpoint/feature
3. Check frontend at http://localhost:3000 to see if it works end-to-end
4. Use Django shell or admin to verify database changes

**Pro tip:** Fix bugs in priority order. Partial credit for explaining your approach even if you don't finish!
