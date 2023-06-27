{
    let createPost = function(){

        let newPostform = $('#new-post-form');

        newPostform.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostform.serialize(),
                success : function(data){
                    new Noty({
                        theme: 'sunset',
                        text: 'Post created successfully!',
                        type : 'success',
                        layout: 'topRight',
                        timeout : 1500
                    }).show();
                    let newPost = newPostDom(data.data.post);
                    $('#post-list>ul').prepend(newPost);
                    deletepost($(' .delete-post-button'),newPost);
                },
                error : function(error){
                    console.log(error.responseText);
                    new Noty({
                        theme: 'sunset',
                        text: error.responseText,
                        type : 'error',
                        layout: 'topRight',
                        timeout : 1500
                    }).show();
                }
            });
        });
    }
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
            <p>
                
                    <a class = "delete-post-button" href="/posts/destroy/${post._id}">X</a>
                 
                ${post.Content}
                <br>
                <small>
                    ${post.user.name}
                </small>
            </p>
            <div class="post-comments">
        
                
        
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Type your comments here ... " >
                        <input type="hidden" name="post" value=${post._id} >
                        <input type="submit" value="Add Comment">
                    </form>
        
                  
                <div class="post-comment-list">
                    <ul id="post-comment-${post._id} %>">   
        
                    </ul>
                </div>
        
            </div>
        </li>`)
    }
    let deletepost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: "GET",
                url: $(deleteLink).prop('href'),
                success: function(data){
                    new Noty({
                        theme: 'sunset',
                        text: 'Post Deleted successfully!',
                        type : 'success',
                        layout: 'topRight',
                        timeout : 1500
                    }).show();
                    $(`#post-${data.data.post_id}`).remove();
                },error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}