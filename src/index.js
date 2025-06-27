const API_URL = "https://community-service-hub.onrender.com/posts";



const navHome = document.getElementById("navHome");
const navCreate = document.getElementById("navCreate");
const navPosts = document.getElementById("navPosts");


const homeSection = document.getElementById("homeSection");
const createSection = document.getElementById("createSection");
const postListSection = document.getElementById("postListSection");

function showSection(section) {
  homeSection.style.display = "none";
  createSection.style.display = "none";
  postListSection.style.display = "none";

  section.style.display = "block";
}

navHome.addEventListener("click", () => showSection(homeSection));
navCreate.addEventListener("click", () => showSection(createSection));
navPosts.addEventListener("click", () => {
  showSection(postListSection);
  fetchAndDisplayPosts(); 
});


showSection(homeSection);



document.getElementById("imageUrl").addEventListener('input', function(event) {
    event.preventDefault();

    const imageUrl = document.getElementById("imageUrl").value;
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");
    const imagePreview = document.getElementById("imagePreview");

    if (imageUrl) {
        imagePreview.src = imageUrl;
        imagePreviewContainer.style.display = 'block';
    } else {
        imagePreviewContainer.style.display = 'none';
    }
});

document.getElementById("postForm").addEventListener('submit', function(event){
    event.preventDefault();

    const postId = document.getElementById("postId").value;

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const imageurl = document.getElementById("imageUrl").value;
    const contact = document.getElementById("contact").value;

    const postData = {
        title,
        description,
        category,
        location,
        imageurl,
        contact,
        date: new Date().toISOString()
    };

    const url = postId ? `${API_URL}/${postId}` : API_URL;
    const method = postId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: postId ? 'Post updated!' : 'Post added!',
            text: 'Your changes have been saved.',
            timer: 5000,
            showConfirmButton: false
        });

        document.getElementById('postForm').reset();
        document.getElementById('postId').value = ""; 
        document.getElementById('submitBtn').textContent = 'Submit Post';
        document.getElementById('imagePreviewContainer').style.display = 'none';

        fetchAndDisplayPosts();
    });
});


let allPosts = [];


function fetchAndDisplayPosts() {
    fetch(API_URL)
    .then(response => response.json())
    .then(posts => {
        allPosts = posts;
        applyFilters(); 
    });
}



const filterLocation = document.getElementById('filterLocation');
const filterCategory = document.getElementById('filterCategory');


filterLocation.addEventListener('input', applyFilters);
filterCategory.addEventListener('change', applyFilters);

function applyFilters() {
  const locationValue = filterLocation.value.toLowerCase();
  const categoryValue = filterCategory.value;

  fetch(API_URL)
    .then(response => response.json())
    .then(posts => {
      const filteredPosts = posts.filter(post => {
        const matchesLocation = post.location.toLowerCase().includes(locationValue);
        const matchesCategory = categoryValue === "" || post.category === categoryValue;
        return matchesLocation && matchesCategory;
      });

      displayFilteredPosts(filteredPosts);
    });
}





function displayFilteredPosts(posts) {
    const postList = document.getElementById("postList");
    postList.innerHTML = '';

    if (posts.length === 0) {
        postList.innerHTML = '<p>No posts match your filter.</p>';
        return;
    }

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p><strong>Category:</strong> ${post.category}</p>
            <p><strong>Location:</strong> ${post.location}</p>
             <p><strong>Contact:</strong> ${post.contact}</p>
            <p><strong>Date:</strong> ${new Date(post.date).toLocaleDateString()}</p>
            ${post.imageurl ? `<img src="${post.imageurl}" alt="Post image" style="max-width: 200px;">` : ''}
            <br>
            <button class="viewBtn" data-id="${post.id}" title="View">
            <img src="images/view.png" alt="View" width="20" />
            </button>
            <button class="editBtn" data-id="${post.id}" title="Edit">
            <img src="images/edit.png" alt="Edit" width="20" />
            </button>
            <button class="deleteBtn" data-id="${post.id}" title="Delete">
            <img src="images/delete.png" alt ="Delete" width ="20" />
            </button>
            <hr />

           
        `;

        postList.appendChild(postDiv);
    });

    addPostEventListeners();
}


filterCategory.addEventListener('change', applyFilters);
filterLocation.addEventListener('input', applyFilters);

function handleViewPost(event) {
  const postId = event.currentTarget.dataset.id;
  console.log("Viewing post ID:", postId); 

  fetch(`${API_URL}/${postId}`)  
    .then(res => {
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    })
    .then(post => {
      Swal.fire({
        title: post.title,
        text: post.description,
        icon: 'info'
      });
    })
    
}



function handleEditPost(event) {
    const postId = event.currentTarget.dataset.id; 

    fetch(`${API_URL}/${postId}`)
        .then(res => res.json())
        .then(post => {
            document.getElementById('postId').value = post.id;
            document.getElementById('title').value = post.title;
            document.getElementById('description').value = post.description;
            document.getElementById('category').value = post.category;
            document.getElementById('contact').value = post.contact || '';
            document.getElementById('location').value = post.location;
            document.getElementById('imageUrl').value = post.imageurl;

            if (post.imageurl) {
                document.getElementById('imagePreview').src = post.imageurl;
                document.getElementById('imagePreviewContainer').style.display = 'block';
            } else {
                document.getElementById('imagePreviewContainer').style.display = 'none';
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.getElementById('submitBtn').textContent = 'Update Post';

            showSection(createSection);
        });
}



function handleDeletePost(event) {
  const postId = event.currentTarget.dataset.id;

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to undo this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${API_URL}/${postId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The post has been removed.',
              timer: 1500,
              showConfirmButton: false
            });
            fetchAndDisplayPosts();  
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to delete post.'
            });
          }
        });
    }
  });
}



function addPostEventListeners() {
    document.querySelectorAll('.viewBtn').forEach(button => {
        button.addEventListener('click', handleViewPost);
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', handleDeletePost);
    });

    document.querySelectorAll('.editBtn').forEach(button => {
        button.addEventListener('click', handleEditPost);
    });
}


fetchAndDisplayPosts();


