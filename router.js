// dit is de router voor de applicatie
// we vervangen alle <a> links met js router navigatie
// verander hier niet te veel aan

// de globale route variabele
window.currentRoute = '/';

// route regels (WIP)
// ik heb er wat voorbeelden bijgezet maar die kan je weghalen als je ze niet nodig hebt
// je kan deze niet aanpassen tijdens runtime omdat deze config alleen andere vars genereert
const routerRules = [
    {
        type: 'redirect',
        from: '/verify-success.html',
        to: '/home.html'
    },
    // {
    //     type: 'inputs',
    //     from: '/learn/[topic].html',
    //     to: '/learn/learn.html?topic={topic}'
    // }
]


// script injectior
async function injectJS(code, id = undefined) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = code;
    script.id = id;
    document.head.appendChild(script);
}

// css injector
async function injectCSS(code, id = undefined) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = code;
    style.id = id;
    document.head.appendChild(style);
}

// we voeren deze code uit bij elke page navigatie
function updateLinks() {
    document.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('routed') === 'true') return; // al aangepast

        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
            // dit zijn grappige links of externe links, die negeren we
            link.setAttribute('routed', 'true');
            return;
        }
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(href);
        });
        link.setAttribute('routed', 'true');
    });

    // oja we moeten ook de title updaten
    document.title = document.querySelector('main').querySelector('h1')?.innerText || 'IT Learn'

    document.querySelectorAll('script').forEach(async script => {
        if (script.getAttribute('routed') === 'true') return; // al geïnjecteerd

        if (script.src) {
            if (script.src.startsWith('/')) {
                const jsContent = await fetch(script.src).then(res => res.text());
                injectJS(jsContent, 'PageScript');
            } else {
                // de regex haalt het bestand uit het pad
                const jsContent = await fetch(window.currentRoute.replace(/(.*\/).*/, '') + script.src).then(res => res.text());
                injectJS(jsContent, 'PageScript');
            }
        } else {
            injectJS(script.textContent, 'PageScript');
        }
        script.setAttribute('routed', 'true');
    });

    document.querySelectorAll('link[rel="stylesheet"]').forEach(async link => {
        if (link.getAttribute('routed') === 'true') return; // al geïnjecteerd

        const href = link.getAttribute('href');
        if (href) {
            if (href.startsWith('/')) {
                const cssContent = await fetch(href).then(res => res.text());
                injectCSS(cssContent, 'PageStyle');
            } else {
                // de regex haalt het bestand uit het pad
                const cssContent = await fetch(window.currentRoute.replace(/(.*\/).*/, '') + href).then(res => res.text());
                injectCSS(cssContent, 'PageStyle');
            }
            injectCSS(cssContent, 'PageStyle');
        }
        link.setAttribute('routed', 'true');
    });

}

// dit is de navigatie zelf
async function navigateTo(page) {
    // maak de route correct
    // de regex zorgt ervoor dat er geen / aan het begin staat
    const route = 'pages/' + page.replace(/^\/+/, '');

    // nuke de oude scripts
    document.querySelectorAll('script[id="PageScript"]').forEach(script => script.remove());

    // zet de link in de globale variabele en in de url balk
    // we gebruiken pushstate zodat we de geschiedenis behouden
    // we gebruiken search prams omdat we geen server side routing hebben
    // we gebruiken page omdat route begint met pages/ en dat is niet goed bij terughalen van state 
    window.currentRoute = route;
    window.currentPage = page;
    let url = new URL(window.location.href);
    url.searchParams.set('route', page);
    window.history.pushState({}, '', url);


    // haal de nieuwe content op
    const newContent = await fetch(route).then(res => res.text());

    // ook de css
    const newCss = await fetch(route.replace('.html', '.css')).then(res => {
        if (res.ok) return res.text();
        return null;
    });

    // nuke oude css
    document.querySelectorAll('style[id="PageStyle"]').forEach(style => style.remove());

    // inject de nieuwe css als die er is
    if (newCss) {
        injectCSS(newCss, 'PageStyle');
    }

    // scroll naar boven
    window.scrollTo(0, 0);

    // vervang de main content
    document.querySelector('main').innerHTML = newContent;

    // update de links opnieuw
    updateLinks();

    // stuur een event dat we van pagina veranderd zijn
    window.dispatchEvent(new Event('page-changed'));
}

// we doen een setup bij het laden van de pagina
window.addEventListener('load', async () => {
    // check de url voor een route parameter
    let url = new URL(window.location.href);
    let route = url.searchParams.get('route') || '/home.html';

    document.querySelectorAll('script').forEach(script => {
        script.setAttribute('routed', 'true');
    });

    await navigateTo(route);
});
function parseConfig() {
    // todo: maak dit
}



// maak de window variabele beschikbaar
window.updateLinks = updateLinks;
window.navigateTo = navigateTo;