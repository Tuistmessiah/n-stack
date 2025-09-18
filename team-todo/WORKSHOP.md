# Team Todo Manager - Workshop Guide

## 🎯 Overview

This is a React application built with Vite, PrimeReact, and MockAPI that serves as a hands-on workshop exercise. Students will have **1 hour** to enhance this basic team todo management system.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

```bash
npm install
npm run dev
```

The application will start at `http://localhost:5173`

## 📋 Current Features

### ✅ Already Implemented

-   **User Management**: View list of team members with avatars
-   **Task Management**: View tasks with status, priority, and due dates
-   **API Integration**: Full CRUD operations with MockAPI endpoints
-   **Responsive Layout**: Split view for users and tasks
-   **Modern UI**: Built with PrimeReact components

### 🔧 API Endpoints (Already Configured)

-   **Users**: `https://60946850a7e53a0017952aaf.mockapi.io/test/pedro/post1/users`
-   **Tasks**: `https://60946850a7e53a0017952aaf.mockapi.io/test/pedro/post1/tasks`

Both endpoints support GET, POST, PUT, DELETE operations.

## 🎯 Workshop Challenges (1 Hour)

### 🌟 Easy Challenges (15-20 minutes)

1. **Add New User Form**

    - Create a dialog with input fields for name, email, role
    - Integrate with the users API
    - Add form validation

2. **Add New Task Form**
    - Create a dialog with fields for title, description, priority, due date
    - Assign tasks to users
    - Handle form submission

### 🔥 Medium Challenges (20-25 minutes)

3. **Edit Functionality**

    - Implement edit dialogs for both users and tasks
    - Pre-populate forms with existing data
    - Handle updates via API

4. **Task Filtering**

    - Add filters for task status (completed/pending)
    - Filter by priority (high/medium/low)
    - Filter by assigned user

5. **Enhanced UI**
    - Add loading states for better UX
    - Implement confirmation dialogs for deletions
    - Add success/error toast notifications

### 🚀 Advanced Challenges (15-20 minutes)

6. **Dashboard View**

    - Create a dashboard with task statistics
    - Show charts using PrimeReact Chart components
    - Display progress indicators

7. **Search Functionality**

    - Add global search for tasks and users
    - Implement real-time filtering as user types

8. **Drag & Drop**
    - Implement drag & drop for task status changes
    - Use PrimeReact DataTable advanced features

## 🛠️ Available PrimeReact Components

The project includes these PrimeReact components (already imported):

-   `Dialog` - For forms and modals
-   `InputText`, `Dropdown`, `Calendar` - For form inputs
-   `Chart` - For dashboard statistics
-   `ProgressBar` - For progress indicators
-   `Toolbar` - For action buttons
-   `Sidebar` - For navigation
-   `AutoComplete` - For search functionality

## 📚 Helpful Resources

-   [PrimeReact Documentation](https://primereact.org/)
-   [PrimeReact DataTable](https://primereact.org/datatable/)
-   [PrimeReact Dialog](https://primereact.org/dialog/)
-   [PrimeReact Form Components](https://primereact.org/inputtext/)

## 🎨 Design Tips

1. **Consistency**: Use the existing color scheme and spacing
2. **User Experience**: Add loading states and error handling
3. **Responsive**: Test on different screen sizes
4. **Accessibility**: Use proper labels and ARIA attributes

## 💡 Bonus Ideas

-   Implement user roles and permissions
-   Add task categories/tags
-   Create task templates
-   Implement due date notifications
-   Add dark/light theme toggle
-   Export tasks to CSV/PDF
-   Add task dependencies
-   Implement team chat functionality

## 🏆 Success Criteria

By the end of the workshop, you should have:

-   ✅ At least 2 new features implemented
-   ✅ Working forms with validation
-   ✅ Enhanced user experience
-   ✅ Clean, maintainable code

Good luck! 🚀

---

_Remember: This is a learning exercise. Focus on functionality over perfection, and don't hesitate to ask for help!_
