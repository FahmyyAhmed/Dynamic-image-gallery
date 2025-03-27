# Image Gallery Web Application

This is an interactive image gallery web application built using **HTML**, **CSS**, and **JavaScript**. The gallery allows users to view, add, edit, delete, and filter images dynamically. The application interacts with a backend API to fetch and manage image data, but also includes a fallback using sample data in case the server is unavailable.

# Website Link
https://fahmyyahmed.github.io/Dynamic-image-gallery/

## Features
- **Image Gallery:** View a dynamic gallery of images with titles, descriptions, categories, and photographer information.
- **Add/Edit Image:** Users can add new images or edit existing ones using a modal form.
- **Delete Image:** Images can be removed from the gallery.
- **Search:** Filter images based on title or description.
- **Category Filter:** Filter images based on categories such as "Nature", "Urban", etc.
- **Responsive Design:** The app is designed to work on mobile, tablet, and desktop devices.

## Technologies Used
- **HTML:** Structure of the application.
- **CSS:** Styling for layout, responsiveness, and interactivity.
- **JavaScript:** Interactivity and dynamic image loading, filtering, adding, editing, and deleting.
- **API Interaction:** Fetches and manages image data from a backend server.
- **Sample Data:** Used when the API is unavailable.

## How It Works

### 1. **HTML Structure:**
The HTML structure includes:
- **Header Section:** Contains the navigation menu, website title, and "Add Image" button. Also includes a hamburger menu for smaller screens.
- **Main Content Section:**
  - **Hero Section:** Displays a carousel of featured images.
  - **Filter Section:** A search bar and category filter buttons allow filtering of images.
  - **Gallery Section:** The images are displayed in a grid layout with cards showing the title, description, and photographer name.
- **Image Modal:** A modal window used for adding or editing images, containing fields like category, title, image URL, description, and photographer name.

### 2. **CSS Styles:**
The CSS is used for:
- **Basic Styling:** Fonts, colors, layout, and general aesthetics.
- **Responsive Design:** Media queries are used to adjust the layout for different screen sizes.
- **Interactive Effects:** Hover effects on images and buttons to improve user experience.

### 3. **JavaScript Functionality:**
The JavaScript controls the interactivity of the gallery and modal forms. Key features include:
- **Dynamic Image Loading:** The gallery is populated by images fetched from an API using the `fetchImages()` function. In case the API is down, a set of sample images (`sampleImages`) is used.
- **Image Modal:** The modal opens for both adding new images and editing existing ones. The form inputs are pre-filled when editing.
- **Add/Edit Image:** When a user submits the form, the application either sends a `POST` (for new images) or `PATCH` request (for updates) to the backend.
- **Delete Image:** The `DELETE` request is sent to the backend when an image is deleted, and the gallery is re-rendered without that image.
- **Search Function:** The search box filters images by title and description as the user types.
- **Category Filters:** Users can filter images by categories such as "Nature" and "Urban".

### 4. **API Interaction:**
- **Fetching Images:** Images are fetched from the backend server using the `fetch()` function in JavaScript. The server is expected to run on `http://localhost:3000/images`.
- **Adding/Editing Images:** When adding or editing images, the app sends data to the server using `POST` and `PATCH` requests.
- **Deleting Images:** The app sends a `DELETE` request to the server to remove an image.

### 5. **Fallback to Sample Data:**
If the backend server is unavailable or the fetch operation fails, the gallery uses predefined **sample images** as placeholders.

## Project Setup

### Prerequisites
Make sure you have a modern browser (e.g., Chrome, Firefox) to run the application. Optionally, you can run a local API server to manage image data.

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/FahmyyAhmed/image-gallery.git
   cd image-gallery
   ```

2. Open `index.html` in your browser to view the application.

3. If you have a backend server, make sure it is running on `http://localhost:3000/images`. If not, sample data will be used.

### Backend API (Optional)
If you want to set up the backend API to manage image data:
1. Set up a basic server using Node.js/Express or any backend framework.
2. Define routes for:
   - **GET /images** to fetch all images.
   - **POST /images** to add a new image.
   - **PATCH /images/:id** to update an image.
   - **DELETE /images/:id** to delete an image.

### Sample API Data
Here is a sample JSON object for image data:

```json
[
  {
    "id": 1,
    "title": "Mountain Sunset",
    "category": "Nature",
    "imageUrl": "https://example.com/mountain.jpg",
    "description": "A beautiful sunset over the mountains.",
    "photographer": "John Doe"
  },
  {
    "id": 2,
    "title": "City Skyline",
    "category": "Urban",
    "imageUrl": "https://example.com/city.jpg",
    "description": "A vibrant city skyline at night.",
    "photographer": "Jane Smith"
  }
]
```

### 6. **Image Modals:**
- **Add Image Modal:** This modal form is used for adding new images.
- **Edit Image Modal:** When an image is clicked for editing, this modal will populate the current image’s data (title, description, category, photographer) and allow updates.

## Contributing
Feel free to fork the repository and submit pull requests if you have improvements or bug fixes.

## License
This project is licensed under the MIT License.
