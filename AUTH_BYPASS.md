# 🔓 Authentication Bypass Mode

## Current Status

Authentication has been **temporarily bypassed** to allow direct access to the Dashboard.

## What's Changed

### 1. AuthContext (`frontend/src/contexts/AuthContext.tsx`)

- Mock user automatically logged in:

  - **Name**: Demo User
  - **Email**: demo@intelliview.com
  - **Role**: STUDENT
  - **ID**: mock-user-123

- Disabled features:
  - ✗ Google OAuth login
  - ✗ Token refresh
  - ✗ Real logout (shows alert)
  - ✗ Backend authentication calls

### 2. App Routes (`frontend/src/App.tsx`)

- Removed `ProtectedRoute` wrapper
- Direct access to `/dashboard` without authentication
- Default route (`/`) redirects to dashboard

### 3. Dashboard (`frontend/src/pages/Dashboard.tsx`)

- Added yellow banner showing "Authentication Bypass Mode Active"
- All features accessible without authentication

## Accessing the App

Simply visit: **http://localhost:5173**

You'll be automatically redirected to the dashboard with a mock user.

## RBAC Testing Note

The RBAC test panel on the dashboard will still try to call the backend APIs. These may fail with CORS or authentication errors since you're not actually logged in to the backend.

## Re-enabling Authentication

When you're ready to re-enable Google OAuth:

### Step 1: Fix Google Cloud Console Setup

Follow the instructions in `GOOGLE_OAUTH_SETUP.md`

### Step 2: Restore AuthContext

In `frontend/src/contexts/AuthContext.tsx`, replace the bypass code with:

```typescript
// Normal mode - restore these lines
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Restore fetchUser, login, logout, refreshAuth functions
// (see git history or backup for original code)
```

### Step 3: Restore Protected Routes

In `frontend/src/App.tsx`, restore the `ProtectedRoute` wrapper:

```typescript
import ProtectedRoute from "./components/ProtectedRoute";

// Wrap routes with ProtectedRoute
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

### Step 4: Remove Bypass Banner

In `frontend/src/pages/Dashboard.tsx`, remove the yellow banner:

```typescript
// Remove this:
<div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium">
  🔓 Authentication Bypass Mode Active - Demo User
</div>
```

## Development Notes

- **Frontend**: Running at http://localhost:5173
- **Backend**: Running at http://localhost:8000 (but not used for auth in bypass mode)
- **Mock User**: Automatically logged in as STUDENT role

## Troubleshooting

### Can't see the Dashboard?

- Make sure frontend server is running: `npm run dev` in `/frontend`
- Clear browser cache and reload

### Want to test different roles?

Edit `frontend/src/contexts/AuthContext.tsx` and change the mock user role:

```typescript
const [user] = useState<User | null>({
  // ...existing code...
  role: "ADMIN", // or "PLACEMENT_COORDINATOR" or "STUDENT"
});
```

### Want to test RBAC with backend?

You'll need to properly configure Google OAuth first (see `GOOGLE_OAUTH_SETUP.md`), or temporarily disable authentication on the backend routes as well.
