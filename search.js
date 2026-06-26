// search.js - Live Search Function

// Data untuk search
const searchData = [

{ title: "Introduction", subtitle: "Start learning HTML basics", category: "Introduction", icon: "🏠", link: "MAINPAGE.html" },

      { title: "Module 1", subtitle: "Basic HTML module", category: "Module", icon: "📘", link: "index.html" },
      { title: "Module 2", subtitle: "User Interface Programming", category: "Module", icon: "📘", link: "page2.html" },
      { title: "Module 3", subtitle: "Peripherals", category: "Module", icon: "📘", link: "page3.html" },
      { title: "Module 4", subtitle: "Software Architectures and MVC", category: "Module", icon: "📘", link: "page4.html" },
      { title: "Module 5", subtitle: "Psychology and Motor Performance", category: "Module", icon: "📘", link: "page5.html" },
      { title: "Module 6", subtitle: "Cognitive Aspects", category: "Module", icon: "📘", link: "page6.html" },
      { title: "Module 7", subtitle: "User Centered Design", category: "Module", icon: "📘", link: "page7.html" },
      { title: "Module 8", subtitle: "Emergent Interfaces", category: "Module", icon: "📘", link: "page8.html" },

{ title: "Exercise 1", subtitle: "Basic HTML structure and tags", category: "Exercise", icon: "✏️", link: "Exercise1.html" },
{ title: "Exercise 2", subtitle: "GUI and interactive systems", category: "Exercise", icon: "✏️", link: "Exercise 2.html" },
{ title: "Exercise 3", subtitle: "HTML content and lists", category: "Exercise", icon: "✏️", link: "Exercise3.html" },
{ title: "Exercise 4", subtitle: "HTML hyperlinks", category: "Exercise", icon: "✏️", link: "Exercise4.html" },
{ title: "Exercise 5", subtitle: "Correct HTML errors", category: "Exercise", icon: "✏️", link: "Exercise5.html" },
{ title: "Exercise 6", subtitle: "HTML best practices", category: "Exercise", icon: "✏️", link: "Exercise6.html" },
{ title: "Exercise 7", subtitle: "Create a healthy lifestyle webpage", category: "Exercise", icon: "✏️", link: "Exercise7.html" },
{ title: "Exercise 8", subtitle: "Create a personal portfolio website", category: "Exercise", icon: "✏️", link: "Exercise8.html" },

      { title: "Progress 1", subtitle: "Module 1 progress dashboard", category: "Progress", icon: "📊", link: "progress1.html" },
      { title: "Progress 2", subtitle: "Module 2 progress dashboard", category: "Progress", icon: "📊", link: "progress2.html" },
      { title: "Progress 3", subtitle: "Module 3 progress dashboard", category: "Progress", icon: "📊", link: "progress3.html" },
      { title: "Progress 4", subtitle: "Module 4 progress dashboard", category: "Progress", icon: "📊", link: "progress4.html" },
      { title: "Progress 5", subtitle: "Module 5 progress dashboard", category: "Progress", icon: "📊", link: "progress5.html" },
      { title: "Progress 6", subtitle: "Module 6 progress dashboard", category: "Progress", icon: "📊", link: "progress6.html" },
      { title: "Progress 7", subtitle: "Module 7 progress dashboard", category: "Progress", icon: "📊", link: "progress7.html" },
      { title: "Progress 8", subtitle: "Module 8 progress dashboard", category: "Progress", icon: "📊", link: "progress8.html" },

      { title: "Game", subtitle: "Interactive quiz game", category: "Game", icon: "🎮", link: "game (2).html" }
    ];


// Fungsi live search - dipanggil setiap kali user menaip
function liveSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase().trim();
    const resultsContainer = document.getElementById("searchResults");
    
    // Sembunyikan results jika tiada input
    if (searchTerm === "") {
        resultsContainer.classList.remove("show");
        return;
    }
    
    // Filter data berdasarkan input
    const filtered = searchData.filter(function(item) {
    const searchableText = [
        item.title,
        item.subtitle,
        item.category
    ].join(" ").toLowerCase();

    return searchableText.includes(searchTerm);
});
    
    // Paparkan results
    if (filtered.length > 0) {
        resultsContainer.innerHTML = filtered.map(item => `
            <div class="search-item" onclick="goToPage('${item.link}')">
                <span class="search-item-icon">${item.icon}</span>
                <div style="flex: 1;">
                    <div class="search-item-title">${item.title}</div>
                    <div class="search-item-sub">${item.subtitle}</div>
                </div>
                <span class="search-item-category">${item.category}</span>
            </div>
        `).join('');
        resultsContainer.classList.add("show");
    } else {
        resultsContainer.innerHTML = `<div class="no-results">
            🔍 No results found for "<strong>${searchTerm}</strong>"<br>
            <span style="font-size: 12px;">Try: module, exercise, 1, 2, 3, html, form, button</span>
        </div>`;
        resultsContainer.classList.add("show");
    }
}

// Fungsi untuk pergi ke page
function goToPage(link) {
    if (link && link !== "#") {
        window.location.href = link;
    } else {
        alert("📊 Progress page is coming soon! Complete the exercises to track your progress.");
    }
}

// Tutup search results bila klik di luar
document.addEventListener("click", function(event) {
    const searchContainer = document.querySelector(".search-container");
    const resultsContainer = document.getElementById("searchResults");
    
    if (searchContainer && resultsContainer && !searchContainer.contains(event.target)) {
        resultsContainer.classList.remove("show");
    }
});

// Setup event listeners apabila page siap loading
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    
    if (searchInput) {
        // Live search: search semasa menaip
        searchInput.addEventListener("input", liveSearch);
        
        // Search bila tekan Enter
        searchInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                liveSearch();
            }
        });
    }
    
    console.log("Search.js loaded - Live search is ready!");
});