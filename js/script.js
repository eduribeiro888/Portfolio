// Arquivo JavaScript principal do portfólio de Eduardo Ribeiro

// Executa quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os elementos com a classe fade-in para aplicar efeitos de aparecimento
    const elementosComFade = document.querySelectorAll(".fade-in");

    // Configurações do observador de interseção
    const opcoesObservador = {
        root: null, // Observa em relação à viewport
        rootMargin: "0px", // Sem margem adicional
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    };

    // Cria um observador de interseção para detectar quando elementos entram na viewport
    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            // Verifica se o elemento está visível na viewport
            if (entrada.isIntersecting) {
                // Adiciona a classe 'visible' para ativar a animação
                entrada.target.classList.add("visible");
                // Opcional: parar de observar o elemento depois que ele aparece
                // observador.unobserve(entrada.target);
            }
        });
    }, opcoesObservador);

    // Observa cada elemento com a classe fade-in
    elementosComFade.forEach(el => {
        observador.observe(el);
    });

    // Implementa rolagem suave para links de âncora internos
    const linksAncora = document.querySelectorAll("a[href^=\"#\"]");

    // Adiciona evento de clique a cada link de âncora
    linksAncora.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            
            // Verifica se é um link âncora válido (ex: #contato) e não apenas # ou #!
            if (href.length > 1 && href.startsWith("#") && document.querySelector(href)) {
                e.preventDefault(); // Impede o comportamento padrão do navegador
                const idAlvo = href.substring(1);
                const elementoAlvo = document.getElementById(idAlvo);

                // Rola suavemente até o elemento alvo
                if (elementoAlvo) {
                    elementoAlvo.scrollIntoView({
                        behavior: "smooth" // Comportamento de rolagem suave
                    });
                }
            }
        });
    });

    // Adiciona a classe fade-in às seções principais se ainda não tiverem
    const secoes = document.querySelectorAll("main > section, header#inicio, footer");
    secoes.forEach(secao => {
        if (!secao.classList.contains("fade-in")) {
            secao.classList.add("fade-in");
        }
        observador.observe(secao); // Garante que todas as seções sejam observadas
    });
});
