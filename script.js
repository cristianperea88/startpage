const form = document.getElementById("searchForm");

form.addEventListener("submit", (e) => {
    const q = form.q.value.trim();
    if (!/^\S+\.\S{2,}$/.test(q)) return; // no es dominio: el form busca en Google
    e.preventDefault();
    location.href = q.includes("://") ? q : `https://${q}`;
});

   addEventListener("keydown", (e) => {
       if (e.key === "/" && document.activeElement !== form.q) { e.preventDefault(); form.q.focus(); }
   });