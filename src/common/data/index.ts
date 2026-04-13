const carouselImages = [
  "/images/demos/default.png",
  "/images/demos/saas.png",
  "/images/demos/material.png",
  "/images/demos/minimal.png",
  "/images/demos/creative.png",
  "/images/demos/modern.png",
  "/images/demos/interactive.png",
];

const clientLogos = [
  "/images/clients/amazon.svg",
  "/images/clients/walmart.svg",
  "/images/clients/lenovo.svg",
  "/images/clients/paypal.svg",
  "/images/clients/shopify.svg",
  "/images/clients/verizon.svg",
];

const services = [
  {
    icon: "ri-pencil-ruler-2-line",
    title: "Creative Design",
    desc: "The creative design includes designs that are unique, effective and memorable.",
  },
  {
    icon: "ri-palette-line",
    title: "Unlimited Colors",
    desc: "The collection of rules and guidelines which designers use to communicate with users through appealing.",
  },
  {
    icon: "ri-lightbulb-flash-line",
    title: "Strategy Solutions",
    desc: "Business development firm that provides strategic planning, market research services and project.",
  },
  {
    icon: "ri-customer-service-line",
    title: "Awesome Support",
    desc: "Awesome Support is the most versatile and feature-rich support plugin for all version.",
  },
  {
    icon: "ri-stack-line",
    title: "Truly Multipurpose",
    desc: "You usually get a broad range of options to play with. This enables you to use a single theme across multiple.",
  },
  {
    icon: "ri-settings-2-line",
    title: "Easy to customize",
    desc: "Personalise your own website, no matter what theme and what customization options.",
  },
  {
    icon: "ri-slideshow-line",
    title: "Responsive & Clean Design",
    desc: "Responsive design is a graphic user interface (GUI) design approach used to create content.",
  },
  {
    icon: "ri-google-fill",
    title: "Google Font Collection",
    desc: "Google Fonts is a collection of 915 fonts, all available to use for free on your website.",
  },
  {
    icon: "ri-briefcase-5-line",
    title: "Top Industry Specialists",
    desc: "An industrial specialist works with industrial operations to ensure that manufacturing facilities work.",
  },
];

const plans = [
  {
    name: "Basic Plan",
    subtitle: "For Startup",
    icon: "ri-book-mark-line",
    month: 19,
    annual: 171,
    features: [
      { text: "Upto 3 Projects", ok: true },
      { text: "Upto 299 Customers", ok: true },
      { text: "Scalable Bandwidth", ok: true },
      { text: "5 FTP Login", ok: true },
      { text: "24/7 Support", ok: false },
      { text: "Unlimited Storage", ok: false },
      { text: "Domain", ok: false },
    ],
  },
  {
    name: "Pro Business",
    subtitle: "Professional plans",
    icon: "ri-medal-fill",
    month: 29,
    annual: 261,
    features: [
      { text: "Upto 15 Projects", ok: true },
      { text: "Unlimited Customers", ok: true },
      { text: "Scalable Bandwidth", ok: true },
      { text: "12 FTP Login", ok: true },
      { text: "24/7 Support", ok: true },
      { text: "Unlimited Storage", ok: false },
      { text: "Domain", ok: false },
    ],
    ribbon: "Popular",
  },
  {
    name: "Platinum Plan",
    subtitle: "Enterprise Businesses",
    icon: "ri-stack-fill",
    month: 39,
    annual: 351,
    features: [
      { text: "Unlimited Projects", ok: true },
      { text: "Unlimited Customers", ok: true },
      { text: "Scalable Bandwidth", ok: true },
      { text: "Unlimited FTP Login", ok: true },
      { text: "24/7 Support", ok: true },
      { text: "Unlimited Storage", ok: true },
      { text: "Domain", ok: true },
    ],
  },
];

const team = [
  {
    name: "Nancy Martino",
    role: "Team Leader",
    img: "/images/users/avatar-2.jpg",
  },
  {
    name: "Henry Baird",
    role: "Full Stack Developer",
    img: "/images/users/avatar-10.jpg",
  },
  {
    name: "Frank Hook",
    role: "Project Manager",
    img: "/images/users/avatar-3.jpg",
  },
  {
    name: "Donald Palmer",
    role: "UI/UX Designer",
    img: "/images/users/avatar-8.jpg",
  },
  {
    name: "Erica Kernan",
    role: "Web Designer",
    img: "/images/users/avatar-5.jpg",
  },
  {
    name: "Alexis Clarke",
    role: "Backend Developer",
    img: "/images/users/avatar-4.jpg",
  },
  {
    name: "Marie Ward",
    role: "Full Stack Developer",
    img: "/images/users/avatar-6.jpg",
  },
  {
    name: "Jack Gough",
    role: "React Js Developer",
    img: "/images/users/avatar-7.jpg",
  },
];

const wallets = [
  {
    img: "/images/nft/wallet/metamask.png",
    name: "Metamask",
    desc: "MetaMask is a popular cryptocurrency wallet known for its ease of use, availability on both desktops.",
    btn: { text: "Connect Wallet", class: "btn-soft-info" },
  },
  {
    img: "/images/nft/wallet/coinbase.png",
    name: "Coinbase Wallet",
    desc: "Coinbase Wallet is a self-custody wallet that gives you complete control of your crypto for your Wallet.",
    btn: { text: "Change Wallet", class: "btn-info" },
  },
  {
    img: "/images/nft/wallet/binance.png",
    name: "Binance",
    desc: "Binance is considered a safe exchange that allows user account protection via the use of Two Authentication.",
    btn: { text: "Connect Wallet", class: "btn-soft-info" },
  },
];

const marketplaceItems = [
  {
    img: "/images/nft/img-03.jpg",
    title: "Creative Filtered Portrait",
    category: "Photography",
    highest: "75.3ETH",
    price: "67.36 ETH",
    likes: "19.29k",
  },
  {
    img: "/images/nft/img-02.jpg",
    title: "The Chirstoper",
    category: "Music",
    highest: "412.30ETH",
    price: "394.7 ETH",
    likes: "23.63k",
  },
  {
    img: "https://img.themesbrand.com/velzon/images/img-4.gif",
    title: "Evolved Reality",
    category: "Video",
    highest: "2.75ETH",
    price: "3.167 ETH",
    likes: "15.93k",
  },
  {
    img: "/images/nft/img-01.jpg",
    title: "Abstract Face Painting",
    category: "Collectibles",
    highest: "122.34ETH",
    price: "97.8 ETH",
    likes: "14.85k",
  },
  {
    img: "/images/nft/img-05.jpg",
    title: "Long-tailed Macaque",
    category: "Artwork",
    highest: "874.01ETH",
    price: "745.14 ETH",
    likes: "64.10k",
  },
  {
    img: "/images/nft/img-06.jpg",
    title: "Robotic Body Art",
    category: "Artwork",
    highest: "41.658 ETH",
    price: "34.81 ETH",
    likes: "36.42k",
  },
];

const features = [
  {
    img: "/images/nft/wallet.png",
    title: "Set up your wallet",
    desc: "You have to choose whether to use a hot wallet a cold wallet.",
  },
  {
    img: "/images/nft/money.png",
    title: "Create your collection",
    desc: "Create a collection in Opensea and give it a proper art.",
  },
  {
    img: "/images/nft/add.png",
    title: "Add your NFT's",
    desc: "Go to your profile icon and top right corner creation page.",
  },
  {
    img: "/images/nft/sell.png",
    title: "Sell Your NFT's",
    desc: "Create a collection in Opensea and give Add items and art.",
  },
];

const discoverItems = [
  {
    userImg: "/images/users/avatar-2.jpg",
    userName: "Nancy Martino",
    userRole: "Owners",
    img: "/images/nft/img-05.jpg",
    likes: "19.29k",
    price: "97.8 ETH",
    title: "Patterns arts & culture",
  },
  {
    userImg: "/images/users/avatar-9.jpg",
    userName: "Henry Baird",
    userRole: "Creators",
    img: "/images/nft/img-03.jpg",
    likes: "31.64k",
    price: "475.23 ETH",
    title: "Evolved Reality",
  },
  {
    userImg: "/images/users/avatar-10.jpg",
    userName: "Diana Kohler",
    userRole: "Owners",
    img: "https://img.themesbrand.com/velzon/images/img-1.gif",
    likes: "8.34k",
    price: "701.38 ETH",
    title: "Long-tailed macaque",
  },
];

const creators = [
  {
    img: "/images/nft/img-01.jpg",
    name: "Timothy Smith",
    eth: "4,754 ETH",
  },
  {
    img: "/images/users/avatar-5.jpg",
    name: "Alexis Clarke",
    eth: "81,369 ETH",
  },
  {
    img: "/images/nft/img-06.jpg",
    name: "Glen Matney",
    eth: "13,156 ETH",
  },
  {
    img: "https://img.themesbrand.com/velzon/images/img-5.gif",
    name: "Herbert Stokes",
    eth: "34,754 ETH",
  },
  {
    img: "/images/users/avatar-8.jpg",
    name: "Michael Morris",
    eth: "13,841 ETH",
  },
  {
    img: "/images/nft/img-02.jpg",
    name: "James Morris",
    eth: "63,710 ETH",
  },
];

const jobCategories = [
  { icon: "ri-pencil-ruler-2-line", name: "IT & Software", jobs: 1543 },
  { icon: "ri-airplay-line", name: "Construction / Facilities", jobs: 3241 },
  { icon: "ri-bank-line", name: "Government", jobs: 876 },
  { icon: "ri-focus-2-line", name: "Marketing & Advertising", jobs: 465 },
  { icon: "ri-pencil-ruler-line", name: "Education & training", jobs: 105 },
  { icon: "ri-line-chart-line", name: "Digital Marketing", jobs: 377 },
  { icon: "ri-briefcase-2-line", name: "Catering & Tourism", jobs: 85 },
];

// Define widget audience metrics data
export const widgetsAudiences = [
  {
    subCounter: [{ counter: 3261, suffix: "", prefix: "" }],
    percentage: "+14.00 %",
    caption: "Total Visitors",
  },
  {
    subCounter: [{ counter: 6258, suffix: "", prefix: "" }],
    percentage: "+7.40 %",
    caption: "Page Views",
  },
  {
    subCounter: [{ counter: 3.6, suffix: "", prefix: "" }],
    caption: "Avg. Visit Duration",
  },
];

// Define widget portfolio data
export const widgetsPortfolio = [
  {
    img: "https://via.placeholder.com/30x30",
    label: "Bitcoin",
    coinName: "BTC",
    coinNameClass: "primary",
    coinVolume: "0.00584875",
    price: "+2.16%",
    priceClass: "success",
  },
  {
    img: "https://via.placeholder.com/30x30",
    label: "Ethereum",
    coinName: "ETH",
    coinNameClass: "info",
    coinVolume: "0.0215485",
    price: "-3.57%",
    priceClass: "danger",
  },
  {
    img: "https://via.placeholder.com/30x30",
    label: "Litecoin",
    coinName: "LTC",
    coinNameClass: "warning",
    coinVolume: "0.00325624",
    price: "+1.66%",
    priceClass: "success",
  },
];

// Tile boxes data
export const tileBoxs1 = [
  {
    id: 1,
    label: "Total Earnings",
    labelClass: "muted",
    percentage: "+16.24 %",
    percentageClass: "success",
    percentageIcon: "ri-arrow-right-up-line",
    counter: 559.25,
    decimals: 2,
    prefix: "$",
    suffix: "k",
    separator: ",",
    caption: "View net earnings",
    captionClass: "white-50",
    icon: "bx bx-dollar-circle",
    iconClass: "soft-success",
    color: "white",
    bgColor: "bg-success",
    counterClass: "text-white",
  },
  {
    id: 2,
    label: "Orders",
    labelClass: "muted",
    percentage: "-3.57 %",
    percentageClass: "danger",
    percentageIcon: "ri-arrow-right-down-line",
    counter: 36894,
    separator: ",",
    caption: "View all orders",
    captionClass: "white-50",
    icon: "bx bx-shopping-bag",
    iconClass: "soft-warning",
    color: "white",
    bgColor: "bg-info",
    counterClass: "text-white",
  },
  {
    id: 3,
    label: "Customers",
    labelClass: "muted",
    percentage: "+29.08 %",
    percentageClass: "success",
    percentageIcon: "ri-arrow-right-up-line",
    counter: 183.35,
    decimals: 2,
    prefix: "",
    suffix: "M",
    separator: ",",
    caption: "See details",
    captionClass: "white-50",
    icon: "bx bx-user-circle",
    iconClass: "soft-primary",
    color: "white",
    bgColor: "bg-primary",
    counterClass: "text-white",
  },
  {
    id: 4,
    label: "My Balance",
    labelClass: "muted",
    percentage: "+0.00 %",
    percentageClass: "muted",
    percentageIcon: "ri-arrow-right-up-line",
    counter: 165.89,
    decimals: 2,
    prefix: "$",
    suffix: "k",
    separator: ",",
    caption: "Withdraw money",
    captionClass: "white-50",
    icon: "bx bx-wallet",
    iconClass: "soft-danger",
    color: "white",
    bgColor: "bg-danger",
    counterClass: "text-white",
  },
];

// Define tileBoxs2 and other data that might be needed...

// Other widgets data
export const otherWidgets2 = [
  {
    id: 1,
    title: "Brand Logo Design - MD",
    subTitle: "Graphics Work",
    subItem: [
      {
        id: 1,
        icon: "mdi mdi-numeric-1-circle",
        iconClass: "success",
        label: "Completed",
      },
      {
        id: 2,
        icon: "mdi mdi-numeric-3-circle",
        iconClass: "info",
        label: "In Progress",
      },
      {
        id: 3,
        icon: "mdi mdi-numeric-2-circle",
        iconClass: "primary",
        label: "To Do",
      },
    ],
    progressBar: [
      { id: 1, bgColor: "bg-success", width: "30%" },
      { id: 2, bgColor: "bg-info", width: "50%" },
      { id: 3, width: "20%" },
    ],
  },
  {
    id: 2,
    title: "Redesign - Landing Page",
    subTitle: "UI/UX Design",
    subItem: [
      {
        id: 1,
        icon: "mdi mdi-numeric-3-circle",
        iconClass: "success",
        label: "Completed",
      },
      {
        id: 2,
        icon: "mdi mdi-numeric-0-circle",
        iconClass: "info",
        label: "In Progress",
      },
      {
        id: 3,
        icon: "mdi mdi-numeric-8-circle",
        iconClass: "primary",
        label: "To Do",
      },
    ],
    progressBar: [
      { id: 1, bgColor: "bg-success", width: "30%" },
      { id: 2, bgColor: "bg-info", width: "0%" },
      { id: 3, width: "70%" },
    ],
  },
  {
    id: 3,
    title: "Ecommerce App for Web",
    subTitle: "CRM Project",
    subItem: [
      {
        id: 1,
        icon: "mdi mdi-numeric-10-circle",
        iconClass: "success",
        label: "Completed",
      },
      {
        id: 2,
        icon: "mdi mdi-numeric-8-circle",
        iconClass: "info",
        label: "In Progress",
      },
      {
        id: 3,
        icon: "mdi mdi-numeric-2-circle",
        iconClass: "primary",
        label: "To Do",
      },
    ],
    progressBar: [
      { id: 1, bgColor: "bg-success", width: "60%" },
      { id: 2, bgColor: "bg-info", width: "25%" },
      { id: 3, width: "15%" },
    ],
  },
];

// Add country data
const usflag = "/images/flags/us.svg";

// Country interface
export interface Country {
  id: number;
  flagImg: string;
  countryName: string;
  countryCode: string;
}

// Define some sample country data
export const country: Country[] = [
  {
    id: 240,
    flagImg: usflag,
    countryName: "United States of America",
    countryCode: "+1",
  },
  {
    id: 241,
    flagImg: usflag,
    countryName: "Canada",
    countryCode: "+1",
  },
  {
    id: 242,
    flagImg: usflag,
    countryName: "United Kingdom",
    countryCode: "+44",
  },
  {
    id: 243,
    flagImg: usflag,
    countryName: "Australia",
    countryCode: "+61",
  },
  {
    id: 244,
    flagImg: usflag,
    countryName: "Germany",
    countryCode: "+49",
  },
];

// Export other data here if needed

export const cryptoSlider = [
  {
    img: "/images/svg/crypto-icons/btc.svg",
    label: "Bitcoin",
    price: "$1,000",
    change: "+0.00%",
    changeClass: "success",
    coinName: "BTC",
    series: [{ data: [10, 20, 15, 30, 20, 25, 18, 20, 25, 20, 30, 20] }],
    chartsColor: "#00B050",
  },
  {
    img: "/images/svg/crypto-icons/eth.svg",
    label: "Ethereum",
    price: "$500",
    change: "-0.00%",
    changeClass: "danger",
    coinName: "ETH",
    series: [{ data: [20, 10, 25, 15, 30, 20, 22, 25, 20, 30, 20, 18] }],
    chartsColor: "#FF0000",
  },
  {
    img: "/images/svg/crypto-icons/ltc.svg",
    label: "Litecoin",
    price: "$200",
    change: "+0.00%",
    changeClass: "success",
    coinName: "LTC",
    series: [{ data: [15, 25, 18, 20, 25, 20, 30, 20, 10, 20, 15, 30] }],
    chartsColor: "#00B050",
  },
  {
    img: "/images/svg/crypto-icons/xrp.svg",
    label: "Ripple",
    price: "$100",
    change: "-0.00%",
    changeClass: "danger",
    coinName: "XRP",
    series: [{ data: [30, 20, 25, 18, 20, 25, 20, 10, 20, 15, 30, 20] }],
    chartsColor: "#FF0000",
  },
  {
    img: "/images/svg/crypto-icons/dash.svg",
    label: "Dash",
    price: "$50",
    change: "+0.00%",
    changeClass: "success",
    coinName: "DASH",
    series: [{ data: [25, 18, 20, 25, 20, 30, 20, 10, 20, 15, 30, 20] }],
    chartsColor: "#00B050",
  },
];

const initialPricing = [
  {
    name: "Starter",
    price: { month: 19, annual: 171, annualOld: 228 },
    features: [
      { text: "3 Projects", ok: true },
      { text: "299 Customers", ok: true },
      { text: "Scalable Bandwidth", ok: true },
      { text: "5 FTP Login", ok: true },
      { text: "24/7 Support", ok: false },
      { text: "Unlimited Storage", ok: false },
      { text: "Domain", ok: false },
    ],
    desc: "The perfect way to get started and get used to our tools.",
    btn: { text: "Your Current Plan", class: "btn-danger disabled" },
  },
  {
    name: "Professional",
    price: { month: 29, annual: 261, annualOld: 348 },
    features: [
      { text: "8 Projects", ok: true },
      { text: "449 Customers", ok: true },
      { text: "Scalable Bandwidth", ok: true },
      { text: "7 FTP Login", ok: true },
      { text: "24/7 Support", ok: true },
      { text: "Unlimited Storage", ok: false },
      { text: "Domain", ok: false },
    ],
    desc: "Excellent for scalling teams to build culture. Special plan for professional business.",
    btn: { text: "Change Plan", class: "btn-info" },
  },
  {
    name: "Enterprise",
    price: { month: 39, annual: 351, annualOld: 468 },
    features: [
      { text: "15 Projects", ok: true },
      { text: "Unlimited Customers", ok: true },
      { text: "Scalable Bandwidth", ok: true },
      { text: "12 FTP Login", ok: true },
      { text: "24/7 Support", ok: true },
      { text: "35GB Storage", ok: true },
      { text: "Domain", ok: false },
    ],
    desc: "This plan is for those who have a team alredy and running a large business.",
    btn: { text: "Change Plan", class: "btn-info" },
    ribbon: "Popular",
  },
  {
    name: "Unlimited",
    price: { month: 49, annual: 441, annualOld: 588 },
    features: [
      { text: "Unlimited Projects", ok: true },
      { text: "Unlimited Customers", ok: true },
      { text: "Scalable Bandwidth", ok: true },
      { text: "Unlimited FTP Login", ok: true },
      { text: "24/7 Support", ok: true },
      { text: "Unlimited Storage", ok: true },
      { text: "Domain", ok: true },
    ],
    desc: "For most businesses that want to optimize web queries.",
    btn: { text: "Change Plan", class: "btn-info" },
  },
];

export {
  carouselImages,
  clientLogos,
  services,
  plans,
  team,
  wallets,
  marketplaceItems,
  features,
  discoverItems,
  creators,
  jobCategories,
  initialPricing,
};
