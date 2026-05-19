# VS Code Setup Guide

This guide helps you set up the project in Visual Studio Code.

## 📦 Installing VS Code

1. Download VS Code from https://code.visualstudio.com/
2. Install it on your system
3. Open VS Code

## 🔌 Recommended Extensions

Install these extensions for the best development experience:

### Essential Extensions:

1. **ES7+ React/Redux/React-Native snippets**
   - Publisher: dsznajder
   - Provides React code snippets

2. **ESLint**
   - Publisher: Microsoft
   - JavaScript linting

3. **Prettier - Code formatter**
   - Publisher: Prettier
   - Code formatting

4. **MongoDB for VS Code**
   - Publisher: MongoDB
   - View and interact with MongoDB

5. **Thunder Client**
   - Publisher: Thunder Client
   - REST API testing (Postman alternative)

6. **Auto Rename Tag**
   - Publisher: Jun Han
   - Auto rename paired HTML/JSX tags

7. **Path Intellisense**
   - Publisher: Christian Kohler
   - Autocomplete filenames

8. **npm Intellisense**
   - Publisher: Christian Kohler
   - Autocomplete npm modules

### Installation Commands:

Open VS Code terminal (Ctrl+` or Cmd+`) and run:

```bash
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension mongodb.mongodb-vscode
code --install-extension rangav.vscode-thunder-client
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension christian-kohler.npm-intellisense
```

## 🚀 Opening the Project

### Method 1: From VS Code
1. Open VS Code
2. File → Open Folder
3. Navigate to `blog-management-system`
4. Click "Select Folder"

### Method 2: From Terminal
```bash
cd blog-management-system
code .
```

## ⚙️ VS Code Configuration

Create `.vscode/settings.json` in project root:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dsznajder.es7-react-js-snippets",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "mongodb.mongodb-vscode",
    "rangav.vscode-thunder-client",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "christian-kohler.npm-intellisense"
  ]
}
```

## 🖥️ Using Integrated Terminal

### Opening Multiple Terminals:

1. **Terminal 1 (Backend):**
   - Open terminal: Terminal → New Terminal
   - Navigate to backend:
     ```bash
     cd backend
     npm run dev
     ```

2. **Terminal 2 (Frontend):**
   - Click "+" icon in terminal panel
   - Navigate to frontend:
     ```bash
     cd frontend
     npm run dev
     ```

### Terminal Shortcuts:
- Open Terminal: `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)
- New Terminal: `Ctrl+Shift+`` (Windows/Linux) or `` Cmd+Shift+` `` (Mac)
- Switch Terminals: Click on terminal names or use dropdown

## 🔍 Navigation Tips

### Quick File Navigation:
- **Quick Open**: `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
  - Type filename to open
  - Example: Type "PostList" to find PostList.jsx

### Go to Symbol:
- **In File**: `Ctrl+Shift+O` (Windows/Linux) or `Cmd+Shift+O` (Mac)
- **In Workspace**: `Ctrl+T` (Windows/Linux) or `Cmd+T` (Mac)

### Find in Files:
- `Ctrl+Shift+F` (Windows/Linux) or `Cmd+Shift+F` (Mac)

## 🐛 Debugging Setup

### Backend Debugging:

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/backend/server.js",
      "cwd": "${workspaceFolder}/backend",
      "envFile": "${workspaceFolder}/backend/.env",
      "console": "integratedTerminal"
    }
  ]
}
```

**Usage:**
1. Open `backend/server.js`
2. Click line number to set breakpoint
3. Press F5 or Run → Start Debugging
4. Use Debug panel to step through code

### Frontend Debugging:
- Use Browser DevTools (F12)
- Install React DevTools extension in Chrome/Firefox

## 📝 Code Snippets

### Custom Snippets for React:

File → Preferences → User Snippets → javascript.json

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "const ${1:ComponentName} = () => {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "};",
      "",
      "export default ${1:ComponentName};"
    ]
  },
  "useState Hook": {
    "prefix": "ust",
    "body": [
      "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState($2);"
    ]
  },
  "useEffect Hook": {
    "prefix": "uef",
    "body": [
      "useEffect(() => {",
      "  $0",
      "}, []);"
    ]
  }
}
```

## 🧪 Testing API with Thunder Client

1. Install Thunder Client extension
2. Click Thunder Client icon in sidebar
3. Create new request:
   ```
   Method: GET
   URL: http://localhost:5000/api/posts
   ```
4. Click "Send"

### Common Test Requests:

**Get All Posts:**
```
GET http://localhost:5000/api/posts
```

**Create Post:**
```
POST http://localhost:5000/api/posts
Headers: Content-Type: application/json
Body:
{
  "title": "Test Post",
  "authorName": "John Doe",
  "email": "john@example.com",
  "category": "Technology",
  "status": "Published",
  "shortDescription": "Test description",
  "content": "Test content",
  "tags": ["test", "api"]
}
```

**Search Posts:**
```
GET http://localhost:5000/api/posts/search?q=test
```

## 📊 Workspace Layout

Recommended layout for development:

1. **Editor**: Center (main coding area)
2. **Sidebar**: Left (file explorer)
3. **Terminal**: Bottom (split for backend/frontend)
4. **Debug Console**: Bottom (when debugging)

### Save Workspace:
File → Save Workspace As... → `blog-management.code-workspace`

## 🎨 Theme Recommendations

Popular themes for better readability:
- Dark+: Built-in, clean dark theme
- One Dark Pro: Atom-inspired theme
- Night Owl: Easy on eyes for night coding
- Dracula Official: Popular dark theme

Install: Extensions → Search "theme name"

## ⌨️ Essential Keyboard Shortcuts

### General:
- Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`
- Quick Open: `Ctrl+P` / `Cmd+P`
- Toggle Sidebar: `Ctrl+B` / `Cmd+B`
- Toggle Terminal: `` Ctrl+` `` / `` Cmd+` ``

### Editing:
- Copy Line: `Shift+Alt+Down` / `Shift+Option+Down`
- Delete Line: `Ctrl+Shift+K` / `Cmd+Shift+K`
- Comment Line: `Ctrl+/` / `Cmd+/`
- Format Document: `Shift+Alt+F` / `Shift+Option+F`

### Navigation:
- Go to Definition: `F12`
- Go Back: `Alt+Left` / `Ctrl+-`
- Go Forward: `Alt+Right` / `Ctrl+Shift+-`

### Search:
- Find: `Ctrl+F` / `Cmd+F`
- Replace: `Ctrl+H` / `Cmd+H`
- Find in Files: `Ctrl+Shift+F` / `Cmd+Shift+F`

## 🔧 Troubleshooting VS Code

### Terminal Not Working:
- Check default shell: Terminal → Select Default Profile
- On Windows: Use PowerShell or Command Prompt
- On Mac/Linux: Use bash or zsh

### Extensions Not Working:
- Reload window: Ctrl+Shift+P → "Reload Window"
- Reinstall extension
- Check extension logs

### Format on Save Not Working:
- Check Prettier extension is installed
- Verify .vscode/settings.json exists
- Try manual format: `Shift+Alt+F`

### IntelliSense Not Working:
- Reload window
- Delete node_modules and reinstall
- Check jsconfig.json or tsconfig.json

## 📚 Learning Resources

- VS Code Docs: https://code.visualstudio.com/docs
- Keyboard Shortcuts: Help → Keyboard Shortcuts Reference
- Interactive Playground: Help → Welcome → Interactive Playground

## 💡 Pro Tips

1. **Multi-Cursor Editing:**
   - Hold `Alt` and click to add cursors
   - `Ctrl+D` / `Cmd+D` to select next occurrence

2. **Split Editor:**
   - `Ctrl+\` / `Cmd+\` to split editor
   - View files side by side

3. **Zen Mode:**
   - `Ctrl+K Z` / `Cmd+K Z` for distraction-free coding
   - Press Esc twice to exit

4. **Emmet:**
   - Type `.container` and press Tab for `<div className="container"></div>`
   - Works in JSX files

5. **Git Integration:**
   - Source Control panel shows changes
   - Stage, commit, push from VS Code
   - View diff by clicking changed files

## ✅ VS Code Setup Checklist

- [ ] VS Code installed
- [ ] Recommended extensions installed
- [ ] Workspace opened correctly
- [ ] .vscode/settings.json configured
- [ ] Terminals working (backend + frontend)
- [ ] File navigation works
- [ ] Format on save enabled
- [ ] Theme configured (optional)

## 🎉 You're Ready to Code!

Your VS Code is now fully configured for Blog Management System development. Happy coding!
