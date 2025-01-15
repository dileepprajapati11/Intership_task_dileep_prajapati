let articles = []; // To store articles
let currentPage = 1;
const articlesPerPage = 4;

// Handle form submission
document.getElementById('article-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const imageInput = document.getElementById('image');
  let imageUrl = '';

  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      imageUrl = e.target.result;
      saveArticle(title, description, imageUrl);
    };
    reader.readAsDataURL(file);
  } else {
    saveArticle(title, description, '');
  }
});

function saveArticle(title, description, imageUrl) {
  if (title && description) {
    articles.push({ title, description, imageUrl });
    localStorage.setItem('articles', JSON.stringify(articles));
    displayArticles();
    displayPagination();
    document.getElementById('article-form').reset();
  }
}

function displayArticles() {
  const newsFeed = document.getElementById('news-feed');
  newsFeed.innerHTML = '';

  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const currentArticles = articles.slice(start, end);

  if (currentArticles.length === 0) {
    newsFeed.innerHTML = '<p class="text-center text-muted">No articles to display.</p>';
    return;
  }

  currentArticles.forEach((article) => {
    newsFeed.innerHTML += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card p-3">
          <h5>${article.title}</h5>
          <p>${article.description}</p>
          ${
            article.imageUrl
              ? `<img src="${article.imageUrl}" alt="Article Image" class="img-fluid">`
              : ''
          }
        </div>
      </div>
    `;
  });
}

function displayPagination() {
  const paginationControls = document.getElementById('pagination-controls');
  paginationControls.innerHTML = '';

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  if (totalPages <= 1) return;

  // Previous button
  if (currentPage > 1) {
    paginationControls.innerHTML += `<button class="btn btn-primary me-2" onclick="goToPage(${currentPage - 1})">Previous</button>`;
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationControls.innerHTML += `<button class="btn ${i === currentPage ? 'btn-secondary' : 'btn-outline-primary'} me-2" onclick="goToPage(${i})">${i}</button>`;
  }

  // Next button
  if (currentPage < totalPages) {
    paginationControls.innerHTML += `<button class="btn btn-primary" onclick="goToPage(${currentPage + 1})">Next</button>`;
  }
}

function goToPage(page) {
  currentPage = page;
  displayArticles();
  displayPagination();
}

window.onload = function () {
  const storedArticles = localStorage.getItem('articles');
  if (storedArticles) {
    articles = JSON.parse(storedArticles);
  }
  displayArticles();
  displayPagination();
};
