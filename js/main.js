// =====================================
// main.js – NTech
// =====================================

// Seleciona o botão e o elemento raiz (HTML)
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

// Função para definir o tema (força 'light' ou 'dark')
const setTheme = (theme) => {
  const validTheme = theme === "dark" ? "dark" : "light";
  root.setAttribute("data-theme", validTheme);

  // Atualiza ícones de acordo com o tema
  const sunIcon = themeToggle.querySelector(".sun");
  const moonIcon = themeToggle.querySelector(".moon");

  if (validTheme === "dark") {
    sunIcon.style.opacity = "0";
    sunIcon.style.transform = "rotate(90deg)";
    moonIcon.style.opacity = "1";
    moonIcon.style.transform = "rotate(0deg)";
  } else {
    sunIcon.style.opacity = "1";
    sunIcon.style.transform = "rotate(0deg)";
    moonIcon.style.opacity = "0";
    moonIcon.style.transform = "rotate(-90deg)";
  }

  localStorage.setItem("ntech-theme", validTheme);
  console.log("Tema definido:", validTheme);
};

// Função para alternar o tema atual
const toggleTheme = () => {
  const currentTheme = root.getAttribute("data-theme");
  setTheme(currentTheme === "light" ? "dark" : "light");
};

// Evento de clique no botão
themeToggle.addEventListener("click", toggleTheme);

// Define o tema inicial
const storedTheme = localStorage.getItem("ntech-theme");
setTheme(storedTheme ? storedTheme : "light");
