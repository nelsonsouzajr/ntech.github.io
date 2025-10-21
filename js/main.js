document.addEventListener('DOMContentLoaded', ()=>{
const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();


// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click', function(e){
const href = this.getAttribute('href');
if(href.startsWith('#')){
e.preventDefault();
const t = document.querySelector(href);
if(t) t.scrollIntoView({behavior:'smooth'});
}
});
});
// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const nav = document.querySelector('.main-nav');
if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.gap = '12px';
            nav.style.position = 'absolute';
            nav.style.right = '18px';
            nav.style.top = '64px';
            nav.style.background = 'var(--muted-bg)';
            nav.style.padding = '12px';
            nav.style.borderRadius = '8px';
            nav.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)';
            nav.style.width = 'auto';
            nav.style.minWidth = '200px';
            nav.style.zIndex = '50';
        }
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileBtn.contains(e.target) && nav.style.display === 'flex') {
            nav.style.display = 'none';
        }
    });
}
// Formulário - validação básica
const form = document.getElementById('contact-form');
if(form){
form.addEventListener('submit', (e)=>{
e.preventDefault();
const name = document.getElementById('name')?.value.trim();
const message = document.getElementById('message')?.value.trim();
if(!name || !message){ alert('Por favor, preencha todos os campos.'); return; }
// Aqui você pode integrar com uma API ou serviço de envio
alert('Mensagem enviada! Em breve entraremos em contato.');
form.reset();
});
}
// WhatsApp float visibility (opcional) - pequena interação
const wa = document.querySelector('.whatsapp-float');
window.addEventListener('scroll', ()=>{
if(!wa) return;
if(window.scrollY > 300) wa.classList.add('visible'); else wa.classList.remove('visible');
});
// THEME: inicialização e toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Função para definir o tema
const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('ntech-theme', theme);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
};

// Inicialização do tema
const stored = localStorage.getItem('ntech-theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (stored) {
    setTheme(stored);
} else if (prefersDark) {
    setTheme('dark');
} else {
    setTheme('light');
}


// atualiza aria-pressed do botão
const updateToggleState = ()=>{
const active = root.getAttribute('data-theme') === 'dark';
if(themeToggle){ themeToggle.setAttribute('aria-pressed', active ? 'true' : 'false'); }
};
updateToggleState();
if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
        // animação: girar
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(()=> themeToggle.style.transform = '', 350);

        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    });
}


});