import { Translations } from "./nl";

export const en: Translations = {
  // Navigation
  nav: {
    home: "Home",
    about: "About & Goals",
    grounds: "Grounds",
    map: "Map",
    scarves: "Scarf Collection",
    contact: "Contact",
  },

  // Site Header & Footer
  header: {
    brandSubtitle: "Football",
    toggleTheme: "Toggle theme",
    toggleLang: "Switch language",
    openMenu: "Open menu",
  },
  footer: {
    tagline:
      "Personal travel logs of stadium visits and scarf collection across Europe.",
    copyright: "All rights reserved.",
    privacy: "Built with Next.js & Tailwind CSS.",
  },

  // Home Page
  home: {
    heroEyebrow: "WELCOME TO SAZEJE FOOTBALL",
    heroTitle: "Football Travels & Scarf Collection",
    heroSubtitle:
      "Personal travelogues of stadium visits across Europe. Follow the journey, read the stories behind every stand, and discover which ground is next on the list.",
    heroCtaGrounds: "Explore Grounds",
    heroCtaScarves: "Scarf Collection",
    statsGrounds: "Grounds Visited",
    statsCountries: "Countries Visited",
    statsScarves: "Scarves Collected",
    recentGroundsTitle: "Recent Grounds",
    recentGroundsSubtitle: "Latest visited stadiums and match logs",
    viewAllGrounds: "View All Grounds →",
    featuredScarvesTitle: "Featured Scarves",
    featuredScarvesSubtitle: "A selection from the scarf collection",
    viewAllScarves: "View Full Collection →",
  },

  // About Page
  about: {
    heroEyebrow: "ABOUT & GOALS",
    heroTitle: "About SaZeJe Football",
    heroSubtitle:
      "Background story behind the passion for football trips, groundhopping, and collecting scarves.",
    bioTitle: "The Story",
    bioParagraph1:
      "SaZeJe Football originated from a passionate love for pure football atmosphere in and around European stadiums. What started as a few spontaneous trips across borders evolved into a structured passion for groundhopping and collecting.",
    bioParagraph2:
      "Every stadium visit brings unique stories — from floodlights to fan culture. As a lasting memory, I collect an official scarf from every ground or city visited.",
    goalsTitle: "Personal Goals",
    goalsSubtitle:
      "My objectives and milestones for stadium visits and collections.",
    statusInProgress: "In Progress",
    statusCompleted: "Completed",
    target: "Target",
    current: "Current Status",
    detailsHeading: "Details & Status",
    backToGoals: "← Back to About & Goals",
    originalContentNotice:
      "Note: The descriptions below are written in the author's original Dutch language.",
  },

  // Grounds Page
  grounds: {
    heroEyebrow: "DATABASE",
    heroTitle: "Grounds Database",
    heroSubtitle:
      "The complete database of visited stadiums — filter by country, competition, or club.",
    filterCountry: "Country",
    filterCompetition: "Competition",
    filterClub: "Club",
    filterSort: "Sort By",
    allCountries: "All countries",
    allCompetitions: "All competitions",
    allClubs: "All clubs",
    sortDateDesc: "Date (Newest first)",
    sortDateAsc: "Date (Oldest first)",
    sortNameAsc: "Name (A-Z)",
    empty: "No grounds found matching these filters.",
    loading: "Loading grounds...",
    ticketStub: "Ticket Stub Log",
    visitDate: "Visit Date",
    capacity: "Capacity",
    match: "Match",
    matchResult: "Result",
    rating: "Rating",
    storyHeading: "Match Report & Story",
    galleryHeading: "Photo Gallery",
    backToGrounds: "← Back to Grounds",
    viewDetails: "View details",
  },

  // Scarves Page
  scarves: {
    heroEyebrow: "COLLECTION",
    heroTitle: "Scarf Collection",
    heroSubtitle:
      "Collection of official and secondhand football scarves from around the world.",
    categoryNewTitle: "New Scarves",
    categoryNewDesc:
      "Scarves bought directly during match visits, club stores, and official team shops.",
    categorySecondhandTitle: "Secondhand Scarves",
    categorySecondhandDesc:
      "Special finds, traded scarves, and vintage discoveries obtained from collectors.",
    selectCountryTitle: "Select a Country",
    selectCountrySubtitle:
      "Choose a country to browse scarves by league and club",
    filterSearch: "Search",
    filterSearchPlaceholder: "Search by club or scarf type...",
    filterClub: "Club",
    allClubs: "All clubs",
    empty: "No scarves found in this selection.",
    loading: "Loading scarves...",
    officialLog: "OFFICIAL SCARF ENTRY LOG",
    stadium: "Stadium",
    founded: "Founded",
    trophies: "Honours",
    funFact: "Did You Know?",
    purchaseDate: "Purchase Date",
    prevPage: "← Previous",
    nextPage: "Next →",
    pageOf: "Page {current} of {total}",
    backToScarves: "← Choose another country",
  },

  // Map Page
  map: {
    heroEyebrow: "INTERACTIVE",
    heroTitle: "Stadium Map Europe",
    heroSubtitle: "Overview of all visited stadiums on the interactive map.",
    loadingMap: "Loading stadium map...",
    popupVisitDate: "Visited:",
    popupMatch: "Match:",
    popupViewGround: "View Stadium →",
  },

  // Contact Page
  contact: {
    heroEyebrow: "CONTACT",
    heroTitle: "Get in Touch",
    heroSubtitle:
      "Have a question, ground tip, or scarf swap proposal? Send a message.",
    labelName: "Name",
    namePlaceholder: "Your full name",
    labelEmail: "Email Address",
    emailPlaceholder: "name@example.com",
    labelMessage: "Message",
    messagePlaceholder: "Write your message, question, or swap offer here...",
    submitButton: "Send Message",
    submittingButton: "Sending...",
    successTitle: "Message Received!",
    successMessage:
      "Thank you for your message. We will get back to you as soon as possible.",
    sendAnother: "Send another message",
    errorTitle: "Sending Failed",
    errorMessage:
      "An error occurred while sending your message. Please try again later.",
    mailtoNotice:
      "Note: Messages are sent directly to the SaZeJe Football management.",
  },

  // Common UI
  common: {
    originalDutchNotice:
      "Content text is displayed in the author's original Dutch.",
  },
};
