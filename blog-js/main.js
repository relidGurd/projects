(() => {
  function postPageNumberContainer() {
    const pageContainer = document.createElement("ul");
    pageContainer.classList.add("pagination");
    pageContainer.classList.add("flexy");

    return {
      pageContainer,
    };
  }

  function createBlogListPagination(number) {
    const pageNumbItem = document.createElement("li");
    const pageNumbLink = document.createElement("a");

    pageNumbLink.textContent = number;
    pageNumbItem.classList.add("page-item");
    pageNumbLink.classList.add("page-link");
    pageNumbItem.classList.add("numb-items");

    pageNumbItem.append(pageNumbLink);
    return {
      pageNumbItem,
      pageNumbLink,
    };
  }

  function createPost(postText) {
    const postItem = document.createElement("p");

    postItem.textContent = postText;
    postItem.classList.add("posts");

    return {
      postItem,
    };
  }

  function createCommentList(userName, commentTextId) {
    const commentItem = document.createElement("li");
    const commentHeader = document.createElement("div");
    const commentBody = document.createElement("div");
    const commentBlockquote = document.createElement("div");
    const commentText = document.createElement("div");

    commentItem.classList.add("card");
    commentHeader.classList.add("card-header");
    commentBody.classList.add("card-body");
    commentBlockquote.classList.add("blockquote", "mb-0");

    commentHeader.textContent = userName;
    commentText.textContent = commentTextId;

    commentItem.append(commentHeader);
    commentItem.append(commentBody);
    commentBody.append(commentBlockquote);
    commentBlockquote.append(commentText);

    return {
      commentItem,
      commentBody,
      commentBlockquote,
      commentText,
    };
  }

  async function blogPost(postID) {
    const postContainer = document.getElementById("blog-post");
    const commentsList = document.createElement("ul");
    // Получаю айди публикации
    const blogPost = await fetch(
      `https://gorest.co.in/public-api/posts/${postID}`
    );
    const blogPostID = await blogPost.json();

    // Получаю комментарии публикации
    const blogComments = await fetch(
      `https://gorest.co.in/public-api/comments?post_id=${postID}`
    );
    const blogCommentsId = await blogComments.json();

    // Создаю контент на основе полученных данных

    const postIdTitle = document.createElement("h1");
    const postIdText = document.createElement("p");

    postIdTitle.textContent = blogPostID.data.title;
    postIdText.textContent = blogPostID.data.body;

    blogCommentsId.data.forEach((userComment) => {
      const comment = createCommentList(userComment.name, userComment.body);
      commentsList.append(comment.commentItem);
    });

    postContainer.append(postIdTitle);
    postContainer.append(postIdText);
    postContainer.append(commentsList);
  }

  async function blogJs(pageNumb) {
    const container = document.getElementById("blog");
    const pages = postPageNumberContainer();

    const blogList = await fetch(
      `https://gorest.co.in/public-api/posts?page=${pageNumb}`
    );
    const blogListPages = await blogList.json();
    console.log(blogListPages);
    for (let i = 1; i <= blogListPages.meta.pagination.pages; i++) {
      const number = createBlogListPagination(i);
      number.pageNumbItem.addEventListener("click", async function () {
        window.location.search = `page=${i}`;
      });
      pages.pageContainer.append(number.pageNumbItem);
    }

    blogListPages.data.forEach((blogPost) => {
      const postTitleLink = createPost(blogPost.title);
      postTitleLink.postItem.addEventListener("click", function () {
        window.location = `./post.html?id=${blogPost.id}`;
      });
      container.append(postTitleLink.postItem);
    });
    container.append(pages.pageContainer);
  }
  window.blogJs = blogJs;
  window.blogPost = blogPost;
})();
