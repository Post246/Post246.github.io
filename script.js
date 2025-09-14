document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const postContent = document.getElementById('postContent');
    const postBtn = document.getElementById('postBtn');
    const postsList = document.getElementById('postsList');
    
    // Initialize posts from local storage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    // Display existing posts
    displayPosts();
    
    // Event listener for the post button
    postBtn.addEventListener('click', function() {
        const content = postContent.value.trim();
        
        if (content) {
            // Create new post object
            const newPost = {
                id: Date.now(), // Using timestamp as ID
                content: content,
                date: new Date().toLocaleString()
            };
            
            // Add to posts array
            posts.unshift(newPost); // Add to beginning of array
            
            // Save to local storage
            localStorage.setItem('posts', JSON.stringify(posts));
            
            // Clear textarea
            postContent.value = '';
            
            // Update UI
            displayPosts();
        } else {
            alert('Please write something before posting!');
        }
    });
    
    // Function to display posts
    function displayPosts() {
        if (posts.length === 0) {
            postsList.innerHTML = '<div class="empty-posts">No posts yet. Share your first thought!</div>';
            return;
        }
        
        postsList.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <div class="post-content">${escapeHtml(post.content)}</div>
                <div class="post-date">Posted on ${post.date}</div>
            `;
            postsList.appendChild(postElement);
        });
    }
    
    // Helper function to escape HTML (prevent XSS)
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});