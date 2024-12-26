function createPost() {
    const postText = document.getElementById('post-text').value;
    const imageInput = document.getElementById('image-upload');
    const imageFile = imageInput.files[0];

    if (postText.trim() || imageFile) {
        const newsfeed = document.getElementById('newsfeed');
        
        // Create a new post element
        const post = document.createElement('div');
        post.classList.add('post');
        
        // Post header (user profile image and username)
        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        
        const profileImg = document.createElement('img');
        profileImg.src = "user.png"; // Placeholder image
        profileImg.classList.add('profile-img');
        postHeader.appendChild(profileImg);
        
        const username = document.createElement('span');
        username.classList.add('username');
        username.innerText = "M. Ahamed Bijoy";  // Placeholder for username
        postHeader.appendChild(username);
        
        // Calculate time ago
        const postTime = document.createElement('span');
        postTime.classList.add('post-time');
        postTime.innerText = timeAgo(new Date());  // Show time since post
        postHeader.appendChild(postTime);
        
        post.appendChild(postHeader);

        // Post content (text)
        const postContent = document.createElement('div');
        postContent.classList.add('post-content');
        postContent.innerText = postText;
        post.appendChild(postContent);
        
        // If an image is selected, display it
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageElement = document.createElement('img');
                imageElement.src = e.target.result;
                imageElement.classList.add('post-image');
                post.appendChild(imageElement);
            };
            reader.readAsDataURL(imageFile);
        }

        // Post actions (like and comment buttons)
        const postActions = document.createElement('div');
        postActions.classList.add('post-actions');
        
        const likeButton = document.createElement('button');
        likeButton.innerText = 'Like';
        likeButton.onclick = function() {
            if (likeButton.innerText === 'Like') {
                likeButton.innerText = 'Unlike';
            } else {
                likeButton.innerText = 'Like';
            }
        };
        postActions.appendChild(likeButton);

        const commentButton = document.createElement('button');
        commentButton.innerText = 'Comment';
        postActions.appendChild(commentButton);
        
        post.appendChild(postActions);

        // Comment section
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
        
        // Create comment input
        const commentInput = document.createElement('textarea');
        commentInput.placeholder = 'Add a comment...';
        commentInput.classList.add('comment-input');
        
        // Add comment button
        const commentSubmitButton = document.createElement('button');
        commentSubmitButton.innerText = 'Post Comment';
        commentSubmitButton.classList.add('post-comment-btn');
        
        // Handle comment submission
        commentSubmitButton.onclick = function() {
            const commentText = commentInput.value.trim();
            if (commentText) {
                // Create comment element
                const comment = document.createElement('div');
                comment.classList.add('comment');
                
                const commentUsername = document.createElement('span');
                commentUsername.classList.add('comment-username');
                commentUsername.innerText = "John Doe";  // Placeholder for username
                comment.appendChild(commentUsername);
                
                const commentContent = document.createElement('span');
                commentContent.classList.add('comment-content');
                commentContent.innerText = commentText;
                comment.appendChild(commentContent);

                // Append the comment to the comment section
                commentSection.appendChild(comment);

                // Clear the comment input
                commentInput.value = '';
            }
        };

        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentSubmitButton);
        
        post.appendChild(commentSection);
        
        // Prepend the post to the newsfeed to show the most recent post first
        newsfeed.insertBefore(post, newsfeed.firstChild);
        
        // Clear the textarea and image input
        document.getElementById('post-text').value = '';
        imageInput.value = '';
    }
}

// Function to calculate time ago in a readable format (e.g., "2 minutes ago")
function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    const intervals = [
        { label: "second", value: 60 },
        { label: "minute", value: 60 },
        { label: "hour", value: 24 },
        { label: "day", value: 30 },
        { label: "month", value: 12 },
        { label: "year", value: Infinity },
    ];

    let amount = seconds;
    for (let i = 0; i < intervals.length; i++) {
        if (amount < intervals[i].value) {
            return `${amount} ${intervals[i].label}${amount !== 1 ? 's' : ''} ago`;
        }
        amount = Math.floor(amount / intervals[i].value);
    }
}
