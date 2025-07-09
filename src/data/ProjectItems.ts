interface Project {
    title: string,
    for: string,
    about: string,
    tools: string,
    web?: string,
    github: string,
    img: string,
    alt: string,
};

const imgPath: string = "/src/assets/";

export const projects: Project[] = [
    {
        title: "Music Scale Finder",
        for: "Personal Project",
        about: "A full-stack app that generates the correct musical scale (major, minor, etc.) based on a user-input note. Built with a C# API, React frontend, and Bootstrap for responsive design.",
        tools: "Backend: C#, ASP.NET Core | Frontend: React, Bootstrap | API: Custom RESTful API for scale logic",
        web: "https://find-a-scale.onrender.com/",
        github: "https://github.com/dwhite02/find-a-scale",
        img: `${imgPath}search-music-v2.svg`,
        alt: "Music Scale Search"
    },
    // {
    //     title: "Song Diary",
    //     for: "Personal Project",
    //     about: "Song Diary is a full-stack web application that allows users to keep a personal diary of songs they love. Users can add entries that include song details, descriptions, moods, and audio previews. The application utilizes a C# backend with ASP.NET Core and a React frontend, providing a seamless experience for users to manage their song entries.",
    //     tools: "Frontend: React, Material-UI | Backend: ASP.NET Core, Entity Framework Core | Database: PostgreSQL | API: Spotify API",
    //     // web: "https://weathy-finder.netlify.app/",
    //     github: "https://github.com/dwhite02/song-diary",
    //     img: `${imgPath}book-solid.svg`,
    //     alt: "Solid Book"
    // },

    {
        title: "Weathy",
        for: "Personal Project",
        about: "A weather app that displays a 5-day forecast using a RESTful API. Built with VueJS and Tailwind CSS, it features responsive design and effective API data integration, overcoming challenges in data flow and ensuring a seamless experience across devices.",
        tools: "HTML/CSS, Tailwind CSS, JavaScript, VueJS, RESTful API",
        web: "https://weathy-finder.netlify.app/",
        github: "https://github.com/dwhite02/weathy",
        img: `${imgPath}weather.svg`,
        alt: "Sun with weather icon"
    },
    {
        title: "Rock Paper Scissors",
        for: "Personal Project",
        about: "An online SPA game built with VueJS and SASS. Features multiple game modes and demonstrates dynamic game logic, navigating design complexities for smooth gameplay across devices.",
        tools: "HTML/CSS, Tailwind CSS, JavaScript, VueJS, SASS",
        web: "https://rps-online-game.netlify.app/",
        github: "https://github.com/dwhite02/rock-paper-scissors",
        img: `${imgPath}scissors.svg`,
        alt: "Media Player icon"
    },
    {
        title: "AnimeTube",
        for: "Personal Project",
        about: "A mock streaming site inspired by anime, fetching videos from the YouTube API. Focused on UI/UX design with responsive layouts using VueJS and Bootstrap, addressing challenges in video fetching and layout responsiveness.",
        tools: "HTML/CSS,  Tailwind CSS, JavaScript, VueJS, Bootstrap, jQuery, RESTful API",
        web: "https://animetube.netlify.app/",
        github: "https://github.com/dwhite02/animetube",
        img: `${imgPath}video.svg`,
        alt: "Media Player icon"
    },
    {
        title: "CD3",
        for: "Personal Project",
        about: "A comprehensive website concept for emerging R&B artist Carrml Drop, showcasing his music portfolio and fostering a strong online presence to connect with his growing fanbase",
        tools: "HTML/CSS,  Tailwind CSS, JavaScript, VueJS",
        web: "https://carrmldrop.netlify.app/",
        github: "https://github.com/dwhite02/carrml-drop",
        img: `${imgPath}cd.svg`,
        alt: "CD Disc icon"
    },
]