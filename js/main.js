/**
 * KILL THE INTERNET 2.0 - VLAD CAMPOS STYLE JS
 * Minimal, text-based theme switcher and reading-time calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // THEME SYSTEM
  // ==========================================================================
  const toggleButton = document.getElementById('theme-toggle');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return systemPrefersDark.matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
  };

  // SVG icon switcher
  const updateToggleIcon = (theme) => {
    if (!toggleButton) return;
    if (theme === 'dark') {
      toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
        </svg>
      `;
      toggleButton.setAttribute('aria-label', 'Alternar para tema claro');
    } else {
      toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      `;
      toggleButton.setAttribute('aria-label', 'Alternar para tema escuro');
    }
  };

  // Initialize theme
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==========================================================================
  // LANGUAGE PREFERENCE SYSTEM
  // ==========================================================================
  const navUtility = document.querySelector('.nav-utility');
  if (navUtility) {
    navUtility.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href) {
        const url = new URL(link.href);
        // Se a rota do link contém "/en/", a preferência passa a ser inglês
        if (url.pathname.includes('/en/')) {
          localStorage.setItem('preferred-language', 'en');
        } else {
          // Caso contrário, se for um link de navegação de idioma padrão, salva português
          localStorage.setItem('preferred-language', 'pt');
        }
      }
    });
  }

  // ==========================================================================
  // READING TIME ESTIMATOR
  // ==========================================================================
  const postContent = document.querySelector('.post-content');
  const readingTimeVal = document.getElementById('reading-time');
  
  if (postContent && readingTimeVal) {
    const text = postContent.textContent || postContent.innerText;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    
    // Suporte a rótulos traduzidos no cálculo de tempo
    const isEn = window.location.pathname.includes('/en/');
    readingTimeVal.textContent = isEn 
      ? `${minutes} min read` 
      : `${minutes} min de leitura`;
  }
});
