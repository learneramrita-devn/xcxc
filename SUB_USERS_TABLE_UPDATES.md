# Sub Users Table Updates

## Changes Made

### 1. **Removed User Type Column**
   - User Type column removed from table
   - User Type field still in form (for backend grade calculation)
   - Table now shows: Title, Name, Mobile, Email, Status, Actions

### 2. **Default Status: In-Active**
   - All new users created with status: `DISABLED` (In-Active)
   - Status display logic:
     - `DISABLED` or `null` → "In-Active"
     - `ENABLED` → "Active"

### 3. **SVG Icons for Actions**
   - Created 3 new SVG icons:
     - `edit-icon.svg` - Pencil icon for edit
     - `delete-icon.svg` - Trash icon for delete
     - `verify-icon.svg` - Checkmark icon for verify
   
   - Icon styling:
     - 32x32px button size
     - 18x18px icon size
     - Border with color coding:
       - Verify: Green (#10b981)
       - Edit: Blue (#3b82f6)
       - Delete: Red (#ef4444)
     - Hover effects with background color

### 4. **Verify Button Always Visible**
   - Verify button now shows for all users
   - Previously only showed for In-Active users
   - Allows re-sending verification email if needed

## Files Updated

1. **SubUsersPage.jsx**
   - Imported SVG icons
   - Removed User Type column from table header
   - Updated colspan from 7 to 6
   - Changed status display logic (default to In-Active)
   - Updated action buttons to use SVG icons
   - Removed conditional rendering for verify button

2. **_subUsersPage.scss**
   - Replaced emoji-based buttons with SVG icon buttons
   - Added `.btn-action` base class
   - Color-coded borders and hover states
   - CSS filters for icon colors

3. **Created SVG Icons**
   - `src/assets/images/edit-icon.svg`
   - `src/assets/images/delete-icon.svg`
   - `src/assets/images/verify-icon.svg`

## Table Structure

| Title | Name | Mobile Number | Email | Status | Actions |
|-------|------|---------------|-------|--------|---------|
| Mr | John Doe | 9876543210 | john@example.com | In-Active | ✓ ✏ 🗑 |

## Action Buttons

```
[✓] Verify  - Green border, sends verification email
[✏] Edit    - Blue border, opens edit modal
[🗑] Delete  - Red border, deletes user
```

## Build Command

```bash
npm run build
```
