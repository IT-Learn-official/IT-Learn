// Global translations object
const translations = {
    en: {
        // Landing page
        login: 'Login',
        signup: 'Sign Up',
        learn: 'Learn',
        practice: 'Practice',
        build: 'Build',
        discord: 'Discord',
        roadmap: 'Roadmap',
        heroTitle: 'Discover the World of Coding',
        getStarted: 'Get started',
        heroSub: 'Coding made easy by students for students.',
        coursesSectionTitle: 'Set off on your programming adventure.',
        coursesSectionSub: 'Discover coding with interactive courses built to make learning fun and easy.',
        sponsorlabel: 'SPONSORED BY: No Sponsors yet, if you want to sponsor feel free to contact us at contact.itlearn@gmail.com',
        landingpython: 'Master programming basics like variables, loops, and control flow using the most popular coding language.',
        landinghtml: 'Learn HTML by creating your very first website and dive into web development.',
        startlearning: 'Start learning',
        landingcss: 'Discover CSS and style your HTML pages with colors, fonts, layouts, and more!',
        morelink: 'Explore All Courses',
        landinglevelup: 'Level Up Your Learning',
        landingxp: 'Earn XP and unlock badges as you finish small lessons in Python, HTML, JavaScript, and more. Learning to code has never been this fun!',
        landingmeetcoders: 'Meet fellow coders on your journey.',
        landingbuildtogether: 'It’s better to build together than alone. Hop into our Discord to connect, collaborate, and support each other.',
        teambroodje56: 'I’m Broodje56, and together with Joren I co-founded IT Learn.  Ever since I was young, I’ve been fascinated by technology, coding, and building creative projects.  I love experimenting with new ideas from making games and extensions to designing full platforms.  With IT Learn, my goal is to share this passion and help other young people discover the fun side of programming in an interactive way.',
        teamJoren: "I'm Joren, and together with Broodje56 I co-founded IT Learn. I’ve been programming since i was 11 and have worked on different projects.I’ve also helped multiple people with creating websites and apps.With IT Learn, I want to help others learn programming in a fun and educational way. I hope you’ll enjoy our project!",
        statslearners: 'Learners',
        statscountries: 'Countries',
        statsexercises: 'Exercises',
        landinglearnforfree: 'Start Learning for Free',
        landingjoinjourney: 'Join our coding journey and explore the world of programming together.',
        landingmadewithlove: 'Made with ❤️ in Belgium',
        landingfooterourteam: 'Our Team',
        landinghelpcenter: 'Help Center',
        landingfooterpractice: 'PRACTICE',
        landingfooterchallenges: 'Challenges',
        landingfooterprojects: 'Projects',
        'hero-title': 'Discover the World of Coding',
        'hero-sub': 'Coding made easy by students for students.',
        'section-title': 'Set off on your programming adventure.',
        'section-sub': 'Discover coding with interactive courses built to make learning fun and easy.',
        badge: 'BEGINNER',
        'course-type': 'Course',
        exploreallcourses: 'Explore All Courses',
        founder: 'Founder',
        viewprofile: 'View profile',
        allcourses: 'All Courses',
        termsandconditions: 'Terms and conditions',
        privacypolicy: 'Privacy Policy',


        // Roadmap
        roadmapOverview: 'An overview of what we will and will not do for IT Learn',
        doh2: "✅ Things we're going to do",
        roadmapdo1: "Integration with Smartschool OAuth",
        roadmapdo2: "Class groups for smartschool students",
        roadmapdo3: "Teachers can assign tasks to their class",
        roadmapdo4: "Cybersecurity lessons (phishing, malware, ...)",
        roadmapdo5: "Code editor + console/webpage",
        roadmapdo6: "Customizable avatars and profile pages",
        roadmapdo7: "Mobile-friendly interface",
        roadmapdo8: "Badges & achievements for completed modules",
        laterh2: "🕒 Things for later",
        roadmaplater1: "Leaderboards per class and global",
        roadmaplater2: "Quests and achieve goals together",
        roadmaplater3: "Collaboration features for group projects",
        roadmaplater4: "Video tutorials and live coding sessions",
        wonth2: "❌ Things we won't do",
        roadmapwont1: "Unrelated topics outside IT",
        roadmapwont2: "Ads or invasive tracking",
        'roadmap-title': '🚀 IT Learn Roadmap',
        doh2: "✅ Things we're going to do",
        laterh2: "🕒 Things for later",
        wonth2: "❌ Things we won't do",
        roadmapdo9: "Regularly updated content",
        roadmapdo10: "Multi-language support",
        copyright: "© 2025 IT Learn | Roadmap is updated regularly",


        // Login/Signup
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        enterEmail: 'Enter your email',
        enterPassword: 'Enter your password',
        createPassword: 'Create a password',
        reenterPassword: 'Re-enter your password',
        createAccount: 'Create account',
        continueWithGoogle: 'Continue with Google',
        alreadyHaveAccount: 'Already have an account?',
        dontHaveAccount: "Don't have an account?",
        termsAgree: 'I agree to the',
        termsAndConditions: 'Terms and Conditions',
        signup: 'Sign Up',
        createAPassword: 'Create a password',
        reenterPassword: 'Re-enter your password',
        confirmPassword: 'Confirm Password',
        iAgree: 'I agree to the',
        signupTerms: 'Terms and Conditions',
        createAccount: 'Create account',
        or: 'OR',
        continueGoogle: 'Continue with Google',
        alreadyHaveAccount: 'Already have an account?',


        // Learn page
        profile: 'Profile',
        badges: 'Badges',
        settings: 'Settings',
        logOut: 'Log Out',
        chooseProgramming: 'Choose a programming language',
        backToLanguages: 'Back to all programming languages',
        nextLesson: 'Next lesson',
        'login-form': 'Login',
        'dontHaveAccount': "Don't have an account?",
        'welcomeAboard': 'Welcome aboard!',
        'createSomethingCool': 'Create something cool ✨',
        'devJourneyStarts': 'Your dev journey starts here',
        'smallStepsBigBuilds': 'Small steps, big builds',
        'designCodeRepeat': 'Design. Code. Repeat.',
        'developedByBroodje56': 'Developed by Broodje56',
        'developedByJoren': 'Developed by Joren',
        'joinDiscord': 'Join Discord',
        'programmingEqualsLife': 'Programming = life',
        'keepPushingForward': 'Keep pushing forward',
        'codeYourDreams': 'Code your dreams',
        'debuggingIsFun': 'Debugging is fun',
        'eatSleepCodeRepeat': 'Eat, Sleep, Code, Repeat',
        'thinkTwiceCodeOnce': 'Think twice, code once',
        'helloWorld': 'Hello World!',
        'brainExeStopped': 'Brain.exe has stopped working',
        'codeLikeABoss': 'Code like a boss',
        'syntaxNeverSleeps': 'Syntax never sleeps',
        'fromIdeasToApps': 'From ideas to apps',
        'firstBugIsFriend': 'Your first bug is a friend',
        'ctrlSProgress': 'CTRL + S your progress',
        'keepCalmCodeOn': 'Keep calm and code on',
        'oneLineAtATime': 'One line at a time',
        'compileYourDreams': 'Compile your dreams',
        'futureDevInProgress': 'Future dev in progress',
        'readySetDeploy': 'Ready, set, deploy!',
        'helloFutureProgrammer': 'Hello, future programmer!',
        'error404': 'Error 404: File not found',
        'learningNeverStops': 'Learning never stops',
                'codingPlusMusic': 'Coding + Music = ❤️',
        'emailVerified': '✅ Email Verified!',
        'verifySuccessMessage': 'Your account has been successfully confirmed. You can now login to continue your learning journey.',
        'goToLogin': 'Go to Login',
        'autoRedirecting': 'Automatically redirecting in',
        'seconds': 'seconds...',


        // Login/Signup

    },
    nl: {
        // Landing page
        login: 'Inloggen',
        signup: 'Registreren',
        learn: 'Leren',
        practice: 'Oefenen',
        build: 'Bouwen',
        discord: 'Discord',
        roadmap: 'Roadmap',
        heroTitle: 'Ontdek de Wereld van Coderen',
        getStarted: 'Aan de slag',
        heroSub: 'Coderen eenvoudig gemaakt door studenten voor studenten.',
        coursesSectionTitle: 'Begin aan je programmeeravontuur',
        coursesSectionSub: 'Ontdek coderen met interactieve cursussen die leren leuk en makkelijk maken.',
        sponsorlabel: 'GESPONSORD DOOR: Nog geen sponsors. Wil je sponsoren? Neem gerust contact op via contact.itlearn@gmail.com',
        landingpython: 'Beheers de basis van programmeren zoals variabelen, lussen en controleflow met de populairste programmeertaal.',
        landinghtml: 'Leer HTML door je eerste website te bouwen en duik in webontwikkeling.',
        startlearning: 'Begin met leren',
        landingcss: 'Ontdek CSS en style je HTML-pagina\'s met kleuren, lettertypen, layouts en meer!',
        morelink: 'Bekijk alle cursussen',
        landinglevelup: 'Trek je leren naar een hoger niveau',
        landingxp: 'Verdien XP en ontgrendel badges terwijl je kleine lessen in Python, HTML, JavaScript en meer afrondt. Programmeren leren was nog nooit zo leuk!',
        landingmeetcoders: 'Ontmoet medeprogrammeurs tijdens je reis.',
        landingbuildtogether: 'Samen bouwen is beter dan alleen. Ga naar onze Discord om te connecten, samenwerken en elkaar te steunen.',
        teambroodje56: 'Ik ben Broodje56, en samen met Joren heb ik IT Learn opgericht. Sinds jonge leeftijd ben ik gefascineerd door technologie, coderen en creatieve projecten. Ik experimenteer graag met nieuwe ideeën, van het maken van games en extensies tot volledige platforms. Met IT Learn wil ik deze passie delen en andere jongeren de leuke kant van programmeren laten ontdekken op een interactieve manier.',
        teamJoren: 'Ik ben Joren, en samen met Broodje56 heb ik IT Learn opgericht. Ik programmeer sinds mijn 11e en heb aan verschillende projecten gewerkt. Ik heb ook anderen geholpen met het maken van websites en apps. Met IT Learn wil ik anderen op een leuke en leerzame manier leren programmeren. Ik hoop dat je van ons project geniet!',
        statslearners: 'Leerlingen',
        statscountries: 'Landen',
        statsexercises: 'Oefeningen',
        landinglearnforfree: 'Gratis leren',
        landingjoinjourney: 'Doe mee met onze codeerreis en ontdek samen de wereld van programmeren.',
        landingmadewithlove: 'Gemaakt met ❤️ in België',
        landingfooterourteam: 'Ons Team',
        landinghelpcenter: 'Helpcentrum',
        landingfooterpractice: 'OEFEN',
        landingfooterchallenges: 'Uitdagingen',
        landingfooterprojects: 'Projecten',
        'hero-title': 'Ontdek de Wereld van Coderen',
        'hero-sub': 'Coderen eenvoudig gemaakt door studenten voor studenten.',
        'section-title': 'Begin aan je programmeeravontuur',
        'section-sub': 'Ontdek coderen met interactieve cursussen die leren leuk en makkelijk maken.',
        badge: 'BEGINNER',
        'course-type': 'Cursus',
        exploreallcourses: 'Bekijk alle cursussen',
        founder: 'Oprichter',
        viewprofile: 'Profiel bekijken',
        allcourses: 'Alle cursussen',
        termsandconditions: 'Algemene voorwaarden',
        privacypolicy: 'Privacybeleid',


        // Roadmap
        roadmapOverview: 'Een overzicht van wat we wel en niet gaan doen voor IT Learn',
        doh2: "✅ Dingen die we gaan doen",
        roadmapdo1: "Integratie met Smartschool OAuth",
        roadmapdo2: "Klasgroepen voor Smartschool-studenten",
        roadmapdo3: "Leerkrachten kunnen taken aan hun klas toewijzen",
        roadmapdo4: "Cybersecurity-lessen (phishing, malware, ...)",
        roadmapdo5: "Code-editor + console/webpagina",
        roadmapdo6: "Aanpasbare avatars en profielpagina's",
        roadmapdo7: "Mobielvriendelijke interface",
        roadmapdo8: "Badges & prestaties voor afgeronde modules",
        laterh2: "🕒 Dingen voor later",
        roadmaplater1: "Ranking per klas en wereldwijd",
        roadmaplater2: "Missies en doelen samen bereiken",
        roadmaplater3: "Samenwerkingsfuncties voor groepsprojecten",
        roadmaplater4: "Videotutorials en live-coding sessies",
        wonth2: "❌ Dingen die we niet gaan doen",
        roadmapwont1: "Onderwerpen buiten IT",
        roadmapwont2: "Advertenties of opdringerige tracking",
        'roadmap-title': '🚀 IT Learn Roadmap',
        doh2: "✅ Dingen die we gaan doen",
        laterh2: "🕒 Dingen voor later",
        wonth2: "❌ Dingen die we niet gaan doen",
        roadmapdo9: "Regelmatig bijgewerkte inhoud",
        roadmapdo10: "Ondersteuning voor meerdere talen",
        copyright: "© 2025 IT Learn | Roadmap wordt regelmatig bijgewerkt",


        // Login/Signup
        email: 'E-mail',
        password: 'Wachtwoord',
        confirmPassword: 'Bevestig wachtwoord',
        enterEmail: 'Voer je e-mailadres in',
        enterPassword: 'Voer je wachtwoord in',
        createAPassword: 'Maak een wachtwoord aan',
        reenterPassword: 'Voer je wachtwoord opnieuw in',
        createAccount: 'Account aanmaken',
        continueWithGoogle: 'Doorgaan met Google',
        alreadyHaveAccount: 'Heb je al een account?',
        dontHaveAccount: 'Nog geen account?',
        termsAgree: 'Ik ga akkoord met de',
        termsAndConditions: 'Algemene voorwaarden',
        or: 'OF',
        continueGoogle: 'Doorgaan met Google',
        alreadyHaveAccount: 'Heb je al een account?',
        createPassword: 'Maak een wachtwoord aan',
        reenterPassword: 'Voer je wachtwoord opnieuw in',
        confirmPassword: 'Bevestig wachtwoord',
        iAgree: 'Ik ga akkoord met de',
        signupTerms: 'Algemene voorwaarden',
        createAccount: 'Account aanmaken',

        // Learn page
        profile: 'Profiel',
        badges: 'Badges',
        settings: 'Instellingen',
        logOut: 'Uitloggen',
        chooseProgramming: 'Kies een programmeertaal',
        backToLanguages: 'Terug naar alle programmeertalen',
        nextLesson: 'Volgende les',
        'login-form': 'Inloggen',
        'dontHaveAccount': 'Nog geen account?',
        'welcomeAboard': 'Welkom aan boord!',
        'createSomethingCool': 'Maak iets tofs ✨',
        'devJourneyStarts': 'Jouw ontwikkelreis begint hier',
        'smallStepsBigBuilds': 'Kleine stappen, grote projecten',
        'designCodeRepeat': 'Ontwerp. Codeer. Herhaal.',
        'developedByBroodje56': 'Ontwikkeld door Broodje56',
        'developedByJoren': 'Ontwikkeld door Joren',
        'joinDiscord': 'Doe mee op Discord',
        'programmingEqualsLife': 'Programmeren = leven',
        'keepPushingForward': 'Blijf vooruitgaan',
        'codeYourDreams': 'Codeer je dromen',
        'debuggingIsFun': 'Debuggen is leuk',
        'eatSleepCodeRepeat': 'Eet, slaap, codeer, herhaal',
        'thinkTwiceCodeOnce': 'Denk twee keer, codeer één keer',
        'helloWorld': 'Hallo Wereld!',
        'brainExeStopped': 'Brain.exe is gestopt',
        'codeLikeABoss': 'Codeer als een baas',
        'syntaxNeverSleeps': 'Syntax slaapt nooit',
        'fromIdeasToApps': 'Van ideeën naar apps',
        'firstBugIsFriend': 'Je eerste bug is een vriend',
        'ctrlSProgress': 'CTRL + S je voortgang',
        'keepCalmCodeOn': 'Blijf kalm en codeer door',
        'oneLineAtATime': 'Eén regel tegelijk',
        'compileYourDreams': 'Compileer je dromen',
        'futureDevInProgress': 'Toekomstige dev in ontwikkeling',
        'readySetDeploy': 'Klaar, set, deploy!',
        'helloFutureProgrammer': 'Hallo, toekomstige programmeur!',
        'error404': 'Fout 404: Bestand niet gevonden',
        'learningNeverStops': 'Leren stopt nooit',
                'codingPlusMusic': 'Coderen + Muziek = ❤️',
        'emailVerified': '✅ E-mail geverifieerd!',
        'verifySuccessMessage': 'Je account is succesvol bevestigd. Je kunt nu inloggen om verder te gaan met je leerreis.',
        'goToLogin': 'Ga naar Inloggen',
        'autoRedirecting': 'Automatisch doorsturen over',
        'seconds': 'seconden...',


        // Login/Signup

        // slasptext login/signup
        welcomeAboard: "Welkom aan boord!",
        createSomethingCool: "Maak iets tofs ✨",
        devJourneyStarts: "Jouw ontwikkelreis begint hier",
        smallStepsBigBuilds: "Kleine stappen, grote projecten",
        designCodeRepeat: "Ontwerp. Codeer. Herhaal.",
        developedByBroodje56: "Ontwikkeld door Broodje56",
        developedByJoren: "Ontwikkeld door Joren",
        joinDiscord: "Doe mee op Discord",
        programmingEqualsLife: "Programmeren = leven",
        keepPushingForward: "Blijf vooruitgaan",
        codeYourDreams: "Codeer je dromen",
        debuggingIsFun: "Debuggen is leuk",
        eatSleepCodeRepeat: "Eet, slaap, codeer, herhaal",
        thinkTwiceCodeOnce: "Denk twee keer, codeer één keer",
        helloWorld: "Hallo Wereld!",
        brainExeStopped: "Brain.exe is gestopt",
        codeLikeABoss: "Codeer als een baas",
        syntaxNeverSleeps: "Syntax slaapt nooit",
        fromIdeasToApps: "Van ideeën naar apps",
        firstBugIsFriend: "Je eerste bug is een vriend",
        ctrlSProgress: "CTRL + S je voortgang",
        keepCalmCodeOn: "Blijf kalm en codeer door",
        oneLineAtATime: "Eén regel tegelijk",
        compileYourDreams: "Compileer je dromen",
        futureDevInProgress: "Toekomstige dev in ontwikkeling",
        readySetDeploy: "Klaar, set, deploy!",
        helloFutureProgrammer: "Hallo, toekomstige programmeur!",
        error404: "Fout 404: Bestand niet gevonden",
        learningNeverStops: "Leren stopt nooit",
        codingPlusMusic: "Coderen + Muziek = ❤️",
        'emailVerified': '✅ E-mail geverifieerd!',
        'verifySuccessMessage': 'Je account is succesvol bevestigd. Je kunt nu inloggen om verder te gaan met je leerreis.',
        'goToLogin': 'Ga naar Inloggen',
        'autoRedirecting': 'Automatisch doorsturen over',
        'seconds': 'seconden...',

    }
};

// Language handling functions
function updatePageLanguage(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName.toLowerCase() === 'input') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Language selector functionality
function initializeLanguageSelector() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLang = document.getElementById('current-lang');

    if (!langBtn || !langDropdown || !currentLang) return;

    // Set initial language
    let currentLanguage = localStorage.getItem('language') || 'en';
    currentLang.textContent = currentLanguage === 'en' ? 'English' : 'Nederlands';

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langDropdown.contains(e.target) && !langBtn.contains(e.target)) {
            langDropdown.classList.remove('show');
        }
    });

    // Language selection
    langDropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = e.target.dataset.lang;
            localStorage.setItem('language', lang);
            currentLang.textContent = lang === 'en' ? 'English' : 'Nederlands';
            langDropdown.classList.remove('show');
            updatePageLanguage(lang);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageSelector();
    // Initialize with stored language
    const storedLang = localStorage.getItem('language') || 'en';
    updatePageLanguage(storedLang);

    // Initialize feather icons after language update
    if (window.feather) {
        feather.replace();
    }
});
