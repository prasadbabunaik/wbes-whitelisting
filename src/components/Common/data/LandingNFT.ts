// Wallets
const metamask = "/images/nft/wallet/metamask.png";
const coinbase = "/images/nft/wallet/coinbase.png";
const binance = "/images/nft/wallet/binance.png";

// Features
const wallet = "/images/nft/wallet.png";
const money = "/images/nft/money.png";
const add = "/images/nft/add.png";
const sell = "/images/nft/sell.png";

// Avatars
const avatar02 = "/images/users/avatar-2.jpg";
const avatar05 = "/images/users/avatar-5.jpg";
const avatar08 = "/images/users/avatar-8.jpg";
const avatar09 = "/images/users/avatar-9.jpg";
const avatar10 = "/images/users/avatar-10.jpg";

// NFTs
const img01 = "/images/nft/img-01.jpg";
const img02 = "/images/nft/img-02.jpg";
const img03 = "/images/nft/img-03.jpg";
const img5 = "/images/nft/gif/img-5.gif";
const img05 = "/images/nft/img-05.jpg";
const img06 = "/images/nft/img-06.jpg";

const connectData = [
  {
    img: metamask,
    title: "Metamask",
    textContent:
      "MetaMask is a popular cryptocurrency wallet known for its ease of use, availability on both desktops.",
  },
  {
    img: coinbase,
    title: "Coinbase Wallet",
    textContent:
      "Coinbase Wallet is a self-custody wallet that gives you complete control of your crypto for your Wallet.",
    bgColor: true,
  },
  {
    img: binance,
    title: "Binance",
    textContent:
      "Binance is considered a safe exchange that allows user account protection via the use of Two Authentication.",
  },
];

const discoverItemsData = [
  {
    id: 1,
    cardImg: avatar02,
    author: "Nancy Martino",
    title: "Owners",
    img: img05,
    likes: "19.29k",
    price: "97.8 ETH",
    category: "Patterns arts & culture",
  },
  {
    id: 2,
    cardImg: avatar09,
    author: "Henry Baird",
    title: "Creators",
    img: img03,
    likes: "31.64k",
    price: "475.23 ETH",
    category: "Evolved Reality",
    isIcon: true,
  },
  {
    id: 3,
    cardImg: avatar10,
    author: "Diana Kohler",
    title: "Owners",
    img: "https://img.themesbrand.com/velzon/images/img-1.gif",
    likes: "8.34k",
    price: "701.38 ETH",
    category: "Long-tailed macaque",
  },
];

const featuresData = [
  {
    img: wallet,
    title: "Set up your wallet",
    textConent: "You have to choose whether to use a hot wallet a cold wallet.",
  },
  {
    img: money,
    title: "Create your collection",
    textConent: "Create a collection in Opensea and give it a proper art.",
  },
  {
    img: add,
    title: "Add your NFT's",
    textConent: "Go to your profile icon and top right corner creation page.",
  },
  {
    img: sell,
    title: "Sell Your NFT's",
    textConent: "Create a collection in Opensea and give Add items and art.",
  },
];

const productData = [
  {
    id: 1,
    img: img03,
    likes: "19.29k",
    title: "Creative Filtered Portrait",
    category: "Photography",
    highest: "75.3ETH",
    price: "67.36 ETH",
    isClass: "artwork crypto-card 3d-style",
    categories: "artwork",
  },
  {
    id: 2,
    img: img02,
    likes: "23.63k",
    title: "The Chirstoper",
    category: "Music",
    highest: "412.30ETH",
    price: "394.7 ETH",
    isClass: "music crypto-card games",
    categories: "crypto-card",
  },
  {
    id: 3,
    img: "https://img.themesbrand.com/velzon/images/img-4.gif",
    likes: "15.93k",
    title: "Evolved Reality",
    category: "Video",
    highest: "2.75ETH",
    price: "3.167 ETH",
    isClass: "artwork music games",
    categories: "artwork",
  },
  {
    id: 4,
    img: img01,
    likes: "14.85k",
    title: "Abstract Face Painting",
    category: "Collectibles",
    highest: "122.34ETH",
    price: "97.8 ETH",
    isClass: "crypto-card 3d-style",
    categories: "3d-style",
  },
  {
    id: 5,
    img: img05,
    likes: "64.10k",
    title: "Long-tailed Macaque",
    category: "Artwork",
    highest: "874.01ETH",
    price: "745.14 ETH",
    isClass: "games music 3d-style",
    categories: "music",
  },
  {
    id: 6,
    img: img06,
    likes: "36.42k",
    title: "Robotic Body Art",
    category: "Artwork",
    highest: "41.658 ETH",
    price: "34.81 ETH",
    isClass: "artwork music crypto-card",
    categories: "games",
  },
];

const topCreatorData = [
  {
    id: 1,
    img: img01,
    title: "Timothy Smith",
    price: "4,754 ETH",
  },
  {
    id: 2,
    img: avatar05,
    title: "Alexis Clarke",
    price: "81,369 ETH",
  },
  {
    id: 3,
    img: img06,
    title: "Glen Matney",
    price: "13,156 ETH",
  },
  {
    id: 4,
    img: img5,
    title: "Herbert Stokes",
    price: "34,754 ETH",
  },
  {
    id: 5,
    img: avatar08,
    title: "Michael Morris",
    price: "13,841 ETH",
  },
  {
    id: 6,
    img: img02,
    title: "James Morris",
    price: "63,710 ETH",
  },
];

export {
  connectData,
  discoverItemsData,
  featuresData,
  productData,
  topCreatorData,
};
