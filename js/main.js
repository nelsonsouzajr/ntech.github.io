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

// Rolagem automática dos depoimentos
const carousel = document.querySelector('.testimonials-carousel');
if (carousel) {
  let scrollAmount = 0;
  const scrollStep = 1;
  const delay = 10;

  function autoScroll() {
    if (carousel.scrollWidth - carousel.clientWidth === scrollAmount) {
      scrollAmount = 0;
    } else {
      scrollAmount += scrollStep;
    }
    carousel.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }


  let autoScrollInterval = setInterval(autoScroll, delay);

  // Pausa ao interagir
  carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  carousel.addEventListener('mouseleave', () => autoScrollInterval = setInterval(autoScroll, delay));
}
// ====================== Modal Depoimentos ======================
const openFormBtn = document.getElementById("openForm");
const closeFormBtn = document.getElementById("closeForm");
const modal = document.getElementById("testimonialModal");

if (openFormBtn && closeFormBtn && modal) {
  openFormBtn.addEventListener("click", () => modal.style.display = "flex");
  closeFormBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// ====================== Fim Modal Depoimentos ======================

// ====================== Máscara para telefone
const phoneInput = document.getElementById('telephone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value;
        
        // Remove tudo que não é número
        value = value.replace(/\D/g, '');
        
        // Aplica a máscara conforme digita
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        
        // Atualiza o valor do input
        e.target.value = value;
    });

    // Impede caracteres não numéricos
    phoneInput.addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    });
}
// ====================== Formulário de Contato ======================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Pega o botão e muda o texto
        const submitBtn = document.getElementById("submitBtn");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;

        try {
            // Prepara os dados do formulário
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Envia o formulário via AJAX
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Limpa o formulário e mostra mensagem de sucesso
            contactForm.reset();
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = "Mensagem enviada com sucesso!";
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
            
        } catch (error) {
            console.error('Erro:', error);
            alert("Erro ao enviar mensagem. Por favor, tente novamente.");
        } finally {
            // Restaura o botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}