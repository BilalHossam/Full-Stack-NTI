document.addEventListener('DOMContentLoaded', function() {
    // Form validation for login, register, create, and edit post forms
    const forms = document.querySelectorAll('form:not(.comment-form)');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const username = form.querySelector('input[name="username"]');
            const password = form.querySelector('input[name="password"]');
            const title = form.querySelector('input[name="title"]');
            const content = form.querySelector('textarea[name="content"]');
            
            let errors = [];
            
            if (username && username.value.trim().length < 3) {
                errors.push('Username must be at least 3 characters long');
            }
            
            if (password && password.value.length < 6) {
                errors.push('Password must be at least 6 characters long');
            }
            
            if (title && title.value.trim().length < 5) {
                errors.push('Title must be at least 5 characters long');
            }
            
            if (content && content.value.trim().length < 10) {
                errors.push('Content must be at least 10 characters long');
            }
            
            if (errors.length > 0) {
                event.preventDefault();
                alert(errors.join('\n'));
            }
        });
    });
    
    // Logout confirmation
    const logoutLinks = document.querySelectorAll('a[href="logout.php"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (!confirm('Are you sure you want to logout?')) {
                event.preventDefault();
            }
        });
    });
    
    // AJAX comment submission
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const content = commentForm.querySelector('textarea[name="comment"]').value;
            const postId = new URLSearchParams(window.location.search).get('id');
            
            if (content.trim().length < 5) {
                alert('Comment must be at least 5 characters long');
                return;
            }
            
            const submitButton = commentForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            
            fetch('post.php?id=' + postId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'comment=' + encodeURIComponent(content)
            })
            .then(response => response.text())
            .then(data => {
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to post comment');
                submitButton.disabled = false;
            });
        });
    }
});