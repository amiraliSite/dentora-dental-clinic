export type Locale = "fa" | "tr" | "ar";
export type Direction = "rtl" | "ltr";

export interface Dictionary {
  dir: Direction;
  name: string;
  nav: {
    home: string;
    services: string;
    about: string;
    doctors: string;
    gallery: string;
    testimonials: string;
    faq: string;
    contact: string;
    book: string;
  };
  hero: {
    badge: string;
    titleA: string;
    titleB: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ratingValue: string;
    ratingLabel: string;
    callLabel: string;
    callSub: string;
    cardPatientsValue: string;
    cardPatientsLabel: string;
    cardExpValue: string;
    cardExpLabel: string;
    scroll: string;
  };
  stats: { items: { value: number; suffix: string; label: string }[] };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    features: { title: string; desc: string }[];
    expYears: string;
    expLabel: string;
  };
  doctors: {
    badge: string;
    title: string;
    subtitle: string;
    items: { name: string; role: string; desc: string }[];
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    captions: string[];
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    items: { name: string; role: string; text: string }[];
  };
  booking: {
    badge: string;
    title: string;
    subtitle: string;
    name: string;
    namePh: string;
    phone: string;
    phonePh: string;
    email: string;
    emailPh: string;
    service: string;
    servicePh: string;
    doctor: string;
    doctorAny: string;
    date: string;
    time: string;
    timePh: string;
    message: string;
    messagePh: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    errorTitle: string;
    errorDesc: string;
    bookedLabel: string;
    sideTitle: string;
    sideDesc: string;
    sidePoints: string[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    address: string;
    addressValue: string;
    phone: string;
    phoneValue: string;
    email: string;
    emailValue: string;
    hours: string;
    hoursValue: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
    builtWith: string;
  };
  common: {
    themeToggle: string;
    language: string;
    backToTop: string;
  };
}
