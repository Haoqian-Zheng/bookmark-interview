# Frontend Bugs to Fix

Your Next.js frontend has 5 critical bugs. Fix as many as you can in 40 minutes.

---

## 🐛 Bug #1: Search Performance Issue

**Severity:** HIGH  
**File:** `src/app/bookmarks/page.tsx`

**Problem:**  
The search input calls the API on every single keystroke. Type "python" and it makes 6 API requests! This is inefficient and creates a poor user experience.

**How to verify:**
1. Open browser DevTools Network tab
2. Type slowly in the search box
3. Watch API requests fire for every character

**Expected behavior:**  
Should debounce the search - wait until user stops typing (300-500ms) before making API call.

**Hint:** Use `setTimeout` or a debounce utility like `lodash.debounce` or `use-debounce` hook

---

## 🐛 Bug #2: Filter State Not Preserved

**Severity:** MEDIUM  
**File:** `src/app/bookmarks/page.tsx`

**Problem:**  
When you select a tag filter and then refresh the page, your filter selection is lost. Same happens if you copy/paste the URL - filters don't persist.

**How to verify:**
1. Select a tag from the filter dropdown (e.g., "Python")
2. Refresh the page (F5)
3. Filter is reset to "All tags"

**Expected behavior:**  
Filter state should be stored in URL query parameters (e.g., `?tag=python`). On page load or refresh, read from URL and restore filter state.

**Hint:** Use Next.js `useSearchParams` and `useRouter` to read/write URL params

---

## 🐛 Bug #3: No Loading States

**Severity:** MEDIUM  
**File:** `src/app/bookmarks/page.tsx` and `src/components/BookmarkList.tsx`

**Problem:**  
When bookmarks are loading, the page shows nothing, then content suddenly pops in. When deleting, there's no feedback. Users don't know if something is happening.

**How to verify:**
1. Refresh the page - blank screen then content appears
2. Delete a bookmark - no indication it's processing
3. Apply filters - unclear if it's working

**Expected behavior:**  
- Show skeleton/spinner while initial data loads
- Show loading state on delete button when processing
- Show loading indicator when filters are applied

**Hint:** Track loading state with `useState`, show conditional loading UI

---

## 🐛 Bug #4: Delete Doesn't Update UI

**Severity:** HIGH  
**File:** `src/app/bookmarks/page.tsx` - delete handler

**Problem:**  
After deleting a bookmark, the API call succeeds but the bookmark still appears in the list until you manually refresh the page.

**How to verify:**
1. Click delete on any bookmark
2. Check Network tab - DELETE request returns 204 success
3. Bookmark still visible in the list

**Expected behavior:**  
After successful delete, immediately remove the bookmark from the UI (optimistic update) OR refetch the bookmark list.

**Hint:** Update local state by filtering out the deleted bookmark, or call the fetch function again

---

## 🐛 Bug #5: No Error Handling

**Severity:** MEDIUM  
**File:** `src/app/bookmarks/page.tsx` and `src/components/AddBookmarkForm.tsx`

**Problem:**  
When API requests fail (network error, server error, validation error), the app shows nothing. Users have no idea what went wrong.

**How to verify:**
1. Stop the backend server
2. Try to load bookmarks or create a new one
3. Nothing happens - no error message

**Expected behavior:**  
- Show user-friendly error messages when requests fail
- Display validation errors from API responses
- Provide retry option or guidance

**Hint:** Use try/catch around fetch calls, store error state, display error UI

---

## Priority Order (if short on time)

1. **Bug #4** (Delete UI) - Breaks core functionality
2. **Bug #1** (Search debounce) - High impact on UX/performance
3. **Bug #3** (Loading states) - Important for UX
4. **Bug #2** (URL state) - Nice to have
5. **Bug #5** (Error handling) - Important but less visible in demo

---

## Testing Your Fixes

After each fix:
1. Test in browser at http://localhost:3000
2. Check browser console for errors
3. Use Network tab to verify API behavior
4. Test edge cases (empty states, slow network)

**Pro tip:** Some bugs are interdependent. Fixing #1 might help with #3. Think about the user experience holistically!

## Available Libraries

Already installed in package.json:
- `use-debounce` - for bug #1
- You can install others if needed: `npm install <package>`
