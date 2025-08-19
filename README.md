# GitHub User Info App 🖥️

A sleek and interactive **GitHub User Info Viewer** built with **JavaScript**, **HTML**, and **CSS**, powered by **Anime.js** for smooth UI animations.  

This app fetches information from GitHub users using the GitHub API and displays it in a clean, user-friendly interface.

---

## Features ✨

- **Fetch GitHub user data** by username.
- **Keyboard and mouse friendly**: Press **Enter** or click **Search** to fetch data.
- **Error handling**: Displays informative messages if the input is empty, user doesn't exist, or service is unavailable.
- **Responsive design**: Works on desktop and mobile devices.
- **Clean and animated UI**: Smooth transitions for loading and displaying data.
- **Customizable behavior**: Error messages can auto-hide or remain visible.
- **Dynamic content generation**: Only shows available information (bio, name, Twitter, followers).

---

## UI / UX Highlights 🎨

- Minimalist and modern card design for user info.
- Avatar and details displayed elegantly with sliding effects.
- Interactive error messages with animations.
- Layout adapts gracefully to different screen sizes.
- Immediate visual feedback on user actions.

---

## Core Functions 🔧

### `handleStart()`

Handles starting the search when the user clicks the button or presses Enter.  
Validates input, clears previous results, and calls `GetInfo()`.

```javascript
const handleStart = () => {
  const inputValue = input.value;
  if (inputValue) {
    dataContent.innerHTML = "";
    GetInfo(inputValue);
    input.value = "";
  } else {
    addTexToErorButton("لم تكتب شيء");
    addAndRemoveClassShowTheMassage();
  }
};
