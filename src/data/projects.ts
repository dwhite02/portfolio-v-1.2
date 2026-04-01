import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "mod-1",
    title: "Music Scale Finder",
    for: "Personal Project",
    about:
      "A full-stack web app that generates accurate musical scales (major, minor, harmonic, melodic, etc.) based on a user-selected note. The backend is a custom C# API handling the scale logic, while the React frontend visualizes results in a clean, responsive UI. This project highlights full-stack integration, algorithmic problem-solving, and responsive design tailored for musicians and learners.",
    tools: "C#, ASP.NET Core (REST API), React, Bootstrap, SCSS, Motion.js, Render",
    web: "https://find-a-scale.onrender.com/",
    github: "https://github.com/dwhite02/find-a-scale",
    img: "/search-music-v2.svg",
    alt: "Music Scale Search",
    accent: "#7EFB5B",   // lime primary
    accent2: "#7EFBCB",  // mint secondary
  },
  {
    id: "mod-2",
    title: "AniFlix",
    for: "Personal Project",
    about:
      "A mock anime streaming platform powered by the AniList GraphQL API. Designed to emulate the look and feel of modern media apps, it emphasizes UI/UX polish with custom hover states, trailers, and interactive cards. Built with React and TypeScript using Material-UI and Swiper.js to create dynamic carousels and responsive layouts.",
    tools: "React, TypeScript, Material-UI (MUI), Swiper.js, AniList GraphQL",
    web: "https://animeflixs.netlify.app/",
    github: "https://github.com/dwhite02/animetube-2.0",
    img: "/video.svg",
    alt: "Media Player icon",
    accent: "#7EFBCB",   // mint primary
    accent2: "#7EFB5B",  // lime secondary
  },
  {
    id: "mod-3",
    title: "Weathy",
    for: "Personal Project",
    about:
      "A responsive weather application that provides a 5-day forecast using live RESTful API data. Built with Vue 3 and Tailwind CSS, the app showcases data parsing, state management, and mobile-first design principles. It also demonstrates problem-solving in handling API data flow and edge cases for reliable user experiences across devices.",
    tools: "Vue 3, Tailwind CSS, JavaScript, RESTful API (OpenWeather)",
    web: "https://weathy-finder.netlify.app/",
    github: "https://github.com/dwhite02/weathy",
    img: "/weather.svg",
    alt: "Sun with weather icon",
    accent: "#7EFB5B",
    accent2: "#7EFBCB",
  },
  {
    id: "mod-4",
    title: "Rock Paper Scissors",
    for: "Personal Project",
    about:
      "A single-page online game reimagining the classic Rock-Paper-Scissors with multiple modes. Developed with VueJS and SASS, it demonstrates interactive game logic, state handling, and UI responsiveness. This project also allowed experimentation with component-based architecture and animations for smooth gameplay experiences.",
    tools: "VueJS, JavaScript, SCSS, Tailwind CSS",
    web: "https://rps-online-game.netlify.app/",
    github: "https://github.com/dwhite02/rock-paper-scissors",
    img: "/scissors.svg",
    alt: "Scissors icon",
    accent: "#7EFBCB",
    accent2: "#7EFB5B",
  },
  {
    id: "mod-5",
    title: "CD3",
    for: "Personal Project",
    about:
      "A digital presence concept for R&B artist Carrml Drop, designed to showcase his music, aesthetic, and story while fostering fan engagement. This site highlights a clean, music-driven layout with VueJS and Tailwind CSS, focusing on visual presentation and responsive performance for artist branding.",
    tools: "VueJS, JavaScript, Tailwind CSS, HTML/CSS",
    web: "https://carrmldrop.netlify.app/",
    github: "https://github.com/dwhite02/carrml-drop",
    img: "/cd.svg",
    alt: "CD Disc icon",
    accent: "#7EFB5B",
    accent2: "#7EFBCB",
  },
];