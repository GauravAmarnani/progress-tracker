const btn = document.getElementById("themeToggle");

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
}

btn.onclick = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.theme =
    document.documentElement.classList.contains("dark") ? "dark" : "light";
};
