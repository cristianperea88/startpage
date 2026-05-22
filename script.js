const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        return;
    }
    

if (query.includes(".")) {
    window.location.href = `https://${query}`;
} else {
    window.location.href =
    `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
});