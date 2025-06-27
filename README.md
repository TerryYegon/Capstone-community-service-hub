# Hands Together

A community service hub web application that connects neighbors and enables them to share services, resources, and support within their local community.

## 🌟 Features

- **Home Dashboard**: Welcome page with community images and navigation
- **Post Services**: Create posts to offer services or resources to the community
- **Browse Posts**: View all community posts with filtering capabilities
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for posts
- **Image Support**: Optional image uploads via URL
- **Real-time Filtering**: Filter posts by location and category
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Notifications**: Success/error messages using SweetAlert2

## 📂 Project Structure
hands-together/
├── index.html              
├── src/
│   └── index.js            
├── css/
│   └── style.css           
├── images/
│   ├── hub1.jpg           
│   ├── hub2.jpg
│   ├── hub3.jpg
│   ├── view.png           
│   ├── edit.png
│   └── delete.png
└── README.md              

## 🚀 Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, etc.)
- Node.js and npm (for local development)
- Internet connection (for SweetAlert2 CDN)
- Render account (for backend deployment)

### Installation

1. **Clone or download the project files**
   ```bash
   git clone <your-repository-url>
   cd hands-together

Set up your file structure as shown above
Backend Setup (JSON Server)
For Local Development:
bash# Install json-server globally
npm install -g json-server

# Create a db.json file with initial data
echo '{"posts": []}' > db.json

# Start the server
json-server --watch db.json --port 3000
For Production (Render Deployment):

Deploy your JSON server to Render
Update the API_URL in src/index.js to your Render URL

javascriptconst API_URL = "https://your-app-name.onrender.com/posts";

Frontend Setup

Update the API endpoint in src/index.js if using Render
Open index.html in your web browser
Or serve it using a local server (recommended)



API Requirements
Your JSON server backend should support the following endpoints:
Local Development:

Base URL: http://localhost:3000

Production (Render):

Base URL: https://your-app-name.onrender.com

Endpoints:

GET /posts - Retrieve all posts
GET /posts/:id - Retrieve a specific post
POST /posts - Create a new post
PUT /posts/:id - Update an existing post
DELETE /posts/:id - Delete a post

Sample db.json structure for JSON Server:
json{
  "posts": [
    {
      "id": 1,
      "title": "Free Math Tutoring",
      "description": "Offering free math tutoring for high school students",
      "category": "Education",
      "location": "Downtown Library",
      "contact": "john@email.com",
      "imageurl": "https://example.com/image.jpg",
      "date": "2024-01-15T10:00:00.000Z"
    }
  ]
}
Post Data Structure
json{
  "id": "unique_id",
  "title": "Service Title",
  "description": "Detailed description",
  "category": "Food|Transport|Education|Health|Other",
  "location": "Location string",
  "contact": "Contact information",
  "imageurl": "Optional image URL",
  "date": "ISO date string"
}
## 💻 Usage
Navigation

🏠 Home: Returns to the welcome page
➕ Post a Service: Create a new community service post
📄 Posts: View and manage all community posts

Creating a Post

Click the "➕" button in the sidebar
Fill out the form with:

Title (required)
Description (required)
Category (Food, Transport, Education, Health, Other)
Location (required)
Contact information (required)
Image URL (optional)


Click "Submit Post"

Managing Posts

View: Click the eye icon to see the full description
Edit: Click the pencil icon to modify a post
Delete: Click the trash icon to remove a post (with confirmation)

Filtering Posts

Use the location search box to filter by location
Use the category dropdown to filter by service type
Filters work in combination

## 🛠️ Technologies Used

HTML5: Structure and semantics
CSS3: Styling and responsive design
Vanilla JavaScript: Interactive functionality
Fetch API: HTTP requests to backend
SweetAlert2: Beautiful alert/confirmation dialogs
JSON Server: Mock REST API for backend
Render: Cloud platform for backend deployment

## 🎨 Customization
Adding New Categories
Edit the category options in both:

index.html (lines with <option value="Category">)
Filter dropdown in the posts section

Changing API Endpoint
Update the API_URL constant in src/index.js:
For Local Development:
javascriptconst API_URL = "http://localhost:3000/posts";
For Production (Render):
javascriptconst API_URL = "https://your-app-name.onrender.com/posts";
Deploying to Render

Create a JSON Server project:
bashmkdir hands-together-api
cd hands-together-api
npm init -y
npm install json-server

Create package.json scripts:
json{
  "scripts": {
    "start": "json-server --watch db.json --port $PORT --host 0.0.0.0"
  }
}

Create db.json with your data structure
Deploy to Render:

Connect your repository to Render
Set build command: npm install
Set start command: npm start
Deploy and get your API URL



## Styling
Modify css/style.css to customize:

Colors and themes
Layout and spacing
Responsive breakpoints
Animations and transitions

## 🔧 Troubleshooting
Common Issues

Posts not loading

Local: Check if JSON server is running on http://localhost:3000
Production: Verify your Render API URL is correct and deployed
Check browser console for error messages
Ensure CORS is properly configured


Images not displaying

Ensure image URLs are valid and accessible
Check for CORS issues with external images


Form not submitting

Verify all required fields are filled
Check network tab for API request errors
Confirm API endpoint is reachable


Render-specific issues

Check Render logs for deployment errors
Ensure your JSON server is configured to use $PORT environment variable
Verify the start command in your package.json



## 🤝 Contributing

Fork the repository
Create a feature branch
Make your changes
Test thoroughly
Submit a pull request

## 📄 License
This project is open source and available under the MIT License.

## Author
Terry Yegon
Hands Together - Connecting communities, one service at a time. 🌟


