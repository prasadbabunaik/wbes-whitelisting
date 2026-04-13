"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BackToTopButton from "@/components/BackToTopButton"; // Import the client component
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NftLandingPage = () => {
  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const scrollNavigation = () => {
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        setIsNavbarShrunk(true);
      } else {
        setIsNavbarShrunk(false);
      }
    };

    window.addEventListener("scroll", scrollNavigation);

    return () => {
      window.removeEventListener("scroll", scrollNavigation);
    };
  }, []);

  const products = [
    {
      id: 1,
      categories: ["artwork", "crypto-card", "3d-style"],
      img: "/images/nft/img-03.jpg",
      title: "Creative Filtered Portrait",
      category: "Photography",
      likes: "19.29k",
      highestBid: "75.3ETH",
      price: "67.36 ETH",
      detailsLink: "/apps-nft-item-details",
    },
    {
      id: 2,
      categories: ["music", "crypto-card", "games"],
      img: "/images/nft/img-02.jpg",
      title: "The Chirstoper",
      category: "Music",
      likes: "23.63k",
      highestBid: "412.30ETH",
      price: "394.7 ETH",
      detailsLink: "/apps-nft-item-details",
    },
    {
      id: 3,
      categories: ["artwork", "music", "games"],
      img: "https://img.themesbrand.com/velzon/images/img-4.gif",
      title: "Evolved Reality",
      category: "Video",
      likes: "15.93k",
      highestBid: "2.75ETH",
      price: "3.167 ETH",
      detailsLink: "/apps-nft-item-details",
    },
    {
      id: 4,
      categories: ["crypto-card", "3d-style"],
      img: "/images/nft/img-01.jpg",
      title: "Abstract Face Painting",
      category: "Collectibles",
      likes: "14.85k",
      highestBid: "122.34ETH",
      price: "97.8 ETH",
      detailsLink: "/apps-nft-item-details",
    },
    {
      id: 5,
      categories: ["games", "music", "3d-style"],
      img: "/images/nft/img-05.jpg",
      title: "Long-tailed Macaque",
      category: "Artwork",
      likes: "64.10k",
      highestBid: "874.01ETH",
      price: "745.14 ETH",
      detailsLink: "/apps-nft-item-details",
    },
    {
      id: 6,
      categories: ["artwork", "music", "crypto-card"],
      img: "/images/nft/img-06.jpg",
      title: "Robotic Body Art",
      category: "Artwork",
      likes: "36.42k",
      highestBid: "41.658 ETH",
      price: "34.81 ETH",
      detailsLink: "/apps-nft-item-details",
    },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter(product => product.categories.includes(activeFilter));

  return (
    <div className="layout-wrapper landing">
      <nav
        className={`navbar navbar-expand-lg navbar-landing navbar-light fixed-top ${
          isNavbarShrunk ? "is-sticky" : ""
        }`}
        id="navbar"
      >
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image
              src="/images/logo-dark.png"
              alt="Velzon Logo Dark"
              height={17}
              width={85}
              className="card-logo card-logo-dark"
            />
            <Image
              src="/images/logo-light.png"
              alt="Velzon Logo Light"
              height={17}
              width={85}
              className="card-logo card-logo-light"
            />
          </Link>
          <button
            className="navbar-toggler py-0 fs-20 text-body"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
              <li className="nav-item">
                <Link className="nav-link active" href="#hero">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#wallet">
                  Wallet
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#marketplace">
                  Marketplace
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#creators">
                  Creators
                </Link>
              </li>
            </ul>

            <div className="">
              <Link href="/apps-nft-wallet" className="btn btn-success">
                Wallet Connect
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-overlay bg-overlay-pattern"></div>
      {/* end navbar */}

      {/* start hero section */}
      <section className="section nft-hero" id="hero">
        <div className="bg-overlay"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-sm-10">
              <div className="text-center">
                <h1 className="display-4 fw-medium mb-4 lh-base text-white">
                  Discover Digital Art & Collect{" "}
                  <span className="text-success">NFT Marketplace</span>
                </h1>
                <p className="lead text-white-50 lh-base mb-4 pb-2">
                  Can artwork be NFT? NFTs (non-fungible tokens) are
                  one-of-a-kind digital assets. Given they're digital in nature,
                  can physical works of art be turned into NFTs?.
                </p>

                <div className="hstack gap-2 justify-content-center">
                  <Link href="/apps-nft-create" className="btn btn-primary">
                    Create Own{" "}
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                  <Link href="/apps-nft-explore" className="btn btn-danger">
                    Explore Now{" "}
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end hero section */}

      {/* start wallet */}
      <section className="section" id="wallet">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2 className="mb-3 fw-semibold lh-base">
                  Connect NFT Marketplace
                </h2>
                <p className="text-muted">
                  A non-fungible token is a non-interchangeable unit of data
                  stored on a blockchain, a form of digital ledger, that can be
                  sold and traded.
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card text-center border shadow-none material-shadow">
                <div className="card-body py-5 px-4">
                  <Image
                    src="/images/nft/wallet/metamask.png"
                    alt="Metamask Wallet Logo"
                    height={55}
                    width={55}
                    className="mb-3 pb-2"
                  />
                  <h5>Metamask</h5>
                  <p className="text-muted pb-1">
                    MetaMask is a popular cryptocurrency wallet known for its
                    ease of use, availability on both desktops.
                  </p>
                  <Link href="#!" className="btn btn-soft-info">
                    Connect Wallet
                  </Link>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="card text-center border shadow-none material-shadow">
                <div className="card-body py-5 px-4">
                  <Image
                    src="/images/nft/wallet/coinbase.png"
                    alt="Coinbase Wallet Logo"
                    height={55}
                    width={55}
                    className="mb-3 pb-2"
                  />
                  <h5>Coinbase Wallet</h5>
                  <p className="text-muted pb-1">
                    Coinbase Wallet is a self-custody wallet that gives you
                    complete control of your crypto for your Wallet.
                  </p>
                  <Link href="#!" className="btn btn-info">
                    Change Wallet
                  </Link>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-lg-4">
              <div className="card text-center border shadow-none material-shadow">
                <div className="card-body py-5 px-4">
                  <Image
                    src="/images/nft/wallet/binance.png"
                    alt="Binance Wallet Logo"
                    height={55}
                    width={55}
                    className="mb-3 pb-2"
                  />
                  <h5>Binance</h5>
                  <p className="text-muted pb-1">
                    Binance is considered a safe exchange that allows user
                    account protection via the use of Two Authentication.
                  </p>
                  <Link href="#!" className="btn btn-soft-info">
                    Connect Wallet
                  </Link>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end wallet */}

      {/* start marketplace */}
      <section className="section bg-light" id="marketplace">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2 className="mb-3 fw-semibold lh-base">Explore Products</h2>
                <p className="text-muted mb-4">
                  Collection widgets specialize in displaying many elements of
                  the same type, such as a collection of pictures from a
                  collection of articles.
                </p>
                <ul
                  className="nav nav-pills filter-btns justify-content-center"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link fw-medium ${
                        activeFilter === "all" ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setActiveFilter("all")}
                    >
                      All Items
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link fw-medium ${
                        activeFilter === "artwork" ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setActiveFilter("artwork")}
                    >
                      Artwork
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link fw-medium ${
                        activeFilter === "music" ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setActiveFilter("music")}
                    >
                      Music
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link fw-medium ${
                        activeFilter === "games" ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setActiveFilter("games")}
                    >
                      Games
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link fw-medium ${
                        activeFilter === "crypto-card" ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setActiveFilter("crypto-card")}
                    >
                      Crypto Card
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link fw-medium ${
                        activeFilter === "3d-style" ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setActiveFilter("3d-style")}
                    >
                      3d Style
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          <div className="row">
            {filteredProducts.map(product => (
              <div className="col-lg-4" key={product.id}>
                <div className="card explore-box card-animate">
                  <div className="bookmark-icon position-absolute top-0 end-0 p-2">
                    <button
                      type="button"
                      className="btn btn-icon active"
                      data-bs-toggle="button"
                      aria-pressed="true"
                    >
                      <i className="mdi mdi-cards-heart fs-16"></i>
                    </button>
                  </div>
                  <div className="explore-place-bid-img">
                    <Image
                      src={product.img}
                      alt={`${product.title} NFT`}
                      width={300}
                      height={300}
                      className="card-img-top explore-img"
                    />
                    <div className="bg-overlay"></div>
                    <div className="place-bid-btn">
                      <Link href="#!" className="btn btn-success">
                        <i className="ri-auction-fill align-bottom me-1"></i>{" "}
                        Place Bid
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="fw-medium mb-0 float-end">
                      <i className="mdi mdi-heart text-danger align-middle"></i>{" "}
                      {product.likes}
                    </p>
                    <h5 className="mb-1">
                      <Link href={product.detailsLink}>{product.title}</Link>
                    </h5>
                    <p className="text-muted mb-0">{product.category}</p>
                  </div>
                  <div className="card-footer border-top border-top-dashed">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 fs-14">
                        <i className="ri-price-tag-3-fill text-warning align-bottom me-1"></i>{" "}
                        Highest:{" "}
                        <span className="fw-medium">{product.highestBid}</span>
                      </div>
                      <h5 className="flex-shrink-0 fs-14 text-primary mb-0">
                        {product.price}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* end container */}
      </section>
      {/* end marketplace */}

      {/* start features */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2 className="mb-3 fw-semibold lh-base">
                  Create and Sell Your NFTs
                </h2>
                <p className="text-muted">
                  The process of creating an NFT may cost less than a dollar,
                  but the process of selling it can cost up to a thousand
                  dollars. For example, Allen Gannett, a software developer.
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}

          <div className="row">
            <div className="col-lg-3">
              <div className="card shadow-none">
                <div className="card-body">
                  <Image
                    src="/images/nft/wallet.png"
                    alt="Wallet Setup"
                    className="avatar-sm"
                    width={48}
                    height={48}
                  />
                  <h5 className="mt-4">Set up your wallet</h5>
                  <p className="text-muted fs-14">
                    You have to choose whether to use a hot wallet a cold
                    wallet.
                  </p>
                  <Link href="#!" className="link-success fs-14">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-bottom"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3">
              <div className="card shadow-none">
                <div className="card-body">
                  <Image
                    src="/images/nft/money.png"
                    alt="Create Collection"
                    className="avatar-sm"
                    width={48}
                    height={48}
                  />
                  <h5 className="mt-4">Create your collection</h5>
                  <p className="text-muted fs-14">
                    Create a collection in Opensea and give it a proper art.
                  </p>
                  <Link href="#!" className="link-success fs-14">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-bottom"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3">
              <div className="card shadow-none">
                <div className="card-body">
                  <Image
                    src="/images/nft/add.png"
                    alt="Add NFTs"
                    className="avatar-sm"
                    width={48}
                    height={48}
                  />
                  <h5 className="mt-4">Add your NFT's</h5>
                  <p className="text-muted fs-14">
                    Go to your profile icon and top right corner creation page.
                  </p>
                  <Link href="#!" className="link-success fs-14">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-bottom"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3">
              <div className="card shadow-none">
                <div className="card-body">
                  <Image
                    src="/images/nft/sell.png"
                    alt="Sell NFTs"
                    className="avatar-sm"
                    width={48}
                    height={48}
                  />
                  <h5 className="mt-4">Sell Your NFT's</h5>
                  <p className="text-muted fs-14">
                    Create a collection in Opensea and give Add items and art.
                  </p>
                  <Link href="#!" className="link-success fs-14">
                    Read More{" "}
                    <i className="ri-arrow-right-line align-bottom"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/* end container */}
      </section>
      {/* end features */}

      {/* start plan */}
      <section className="section bg-light" id="categories">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="text-center mb-5">
                <h2 className="mb-3 fw-semibold lh-base">
                  Trending All Categories
                </h2>
                <p className="text-muted">
                  The process of creating an NFT may cost less than a dollar,
                  but the process of selling it can cost up to a thousand
                  dollars. For example, Allen Gannett, a software developer.
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-lg-12">
              {/* Swiper */}
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
                modules={[Pagination, Autoplay]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="mySwiper pb-4"
              >
                <SwiperSlide>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-1 mb-3">
                        <div className="col-6">
                          <Image
                            src="/images/nft/img-06.jpg"
                            alt="Trending Artwork NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-2.gif"
                            alt="Trending Artwork Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mt-1"
                          />
                        </div>
                        {/*end col*/}
                        <div className="col-6">
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-5.gif"
                            alt="Trending Artwork Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mb-1"
                          />
                          <Image
                            src="/images/nft/img-03.jpg"
                            alt="Trending Artwork NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                      <Link href="#!" className="float-end">
                        {" "}
                        View All{" "}
                        <i className="ri-arrow-right-line align-bottom"></i>
                      </Link>
                      <h5 className="mb-0 fs-16">
                        <Link href="#!">
                          Artwork{" "}
                          <span className="badge bg-success-subtle text-success">
                            206
                          </span>
                        </Link>
                      </h5>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-1 mb-3">
                        <div className="col-6">
                          <Image
                            src="/images/nft/img-05.jpg"
                            alt="Trending Crypto Card NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-1.gif"
                            alt="Trending Crypto Card Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mt-1"
                          />
                        </div>
                        {/*end col*/}
                        <div className="col-6">
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-4.gif"
                            alt="Trending Crypto Card Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mb-1"
                          />
                          <Image
                            src="/images/nft/img-04.jpg"
                            alt="Trending Crypto Card NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                      <Link href="#!" className="float-end">
                        {" "}
                        View All{" "}
                        <i className="ri-arrow-right-line align-bottom"></i>
                      </Link>
                      <h5 className="mb-0 fs-16">
                        <Link href="#!">
                          Crypto Card{" "}
                          <span className="badge bg-success-subtle text-success">
                            743
                          </span>
                        </Link>
                      </h5>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-1 mb-3">
                        <div className="col-6">
                          <Image
                            src="/images/nft/img-02.jpg"
                            alt="Trending Music NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-3.gif"
                            alt="Trending Music Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mt-1"
                          />
                        </div>
                        {/*end col*/}
                        <div className="col-6">
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-1.gif"
                            alt="Trending Music Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mb-1"
                          />
                          <Image
                            src="/images/nft/img-01.jpg"
                            alt="Trending Music NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                      <Link href="#!" className="float-end">
                        {" "}
                        View All{" "}
                        <i className="ri-arrow-right-line align-bottom"></i>
                      </Link>
                      <h5 className="mb-0 fs-16">
                        <Link href="#!">
                          Music{" "}
                          <span className="badge bg-success-subtle text-success">
                            679
                          </span>
                        </Link>
                      </h5>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-1 mb-3">
                        <div className="col-6">
                          <Image
                            src="/images/nft/img-03.jpg"
                            alt="Trending Games NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-5.gif"
                            alt="Trending Games Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mt-1"
                          />
                        </div>
                        {/*end col*/}
                        <div className="col-6">
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-2.gif"
                            alt="Trending Games Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mb-1"
                          />
                          <Image
                            src="/images/nft/img-05.jpg"
                            alt="Trending Games NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                      <Link href="#!" className="float-end">
                        {" "}
                        View All{" "}
                        <i className="ri-arrow-right-line align-bottom"></i>
                      </Link>
                      <h5 className="mb-0 fs-16">
                        <Link href="#!">
                          Games{" "}
                          <span className="badge bg-success-subtle text-success">
                            341
                          </span>
                        </Link>
                      </h5>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-1 mb-3">
                        <div className="col-6">
                          <Image
                            src="/images/nft/img-02.jpg"
                            alt="Trending Photography NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-3.gif"
                            alt="Trending Photography Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mt-1"
                          />
                        </div>
                        {/*end col*/}
                        <div className="col-6">
                          <Image
                            src="https://img.themesbrand.com/velzon/images/img-1.gif"
                            alt="Trending Photography Animation"
                            width={300}
                            height={300}
                            className="img-fluid rounded mb-1"
                          />
                          <Image
                            src="/images/nft/img-01.jpg"
                            alt="Trending Photography NFT"
                            width={300}
                            height={300}
                            className="img-fluid rounded"
                          />
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                      <Link href="#!" className="float-end">
                        {" "}
                        View All{" "}
                        <i className="ri-arrow-right-line align-bottom"></i>
                      </Link>
                      <h5 className="mb-0 fs-16">
                        <Link href="#!">
                          Photography{" "}
                          <span className="badge bg-success-subtle text-success">
                            1452
                          </span>
                        </Link>
                      </h5>
                    </div>
                  </div>
                </SwiperSlide>
                <div className="swiper-pagination swiper-pagination-dark"></div>
              </Swiper>
            </div>
          </div>
        </div>
        {/* end container */}
      </section>
      {/* end plan */}

      {/* start Discover Items*/}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="d-flex align-items-center mb-5">
                <h2 className="mb-0 fw-semibold lh-base flex-grow-1">
                  Discover Items
                </h2>
                <Link href="/apps-nft-explore" className="btn btn-primary">
                  View All <i className="ri-arrow-right-line align-bottom"></i>
                </Link>
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-lg-4">
              <div className="card explore-box card-animate border">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src="/images/users/avatar-2.jpg"
                      alt="Nancy Martino Avatar"
                      className="avatar-xs rounded-circle"
                      width={50}
                      height={50}
                    />
                    <div className="ms-2 flex-grow-1">
                      <Link href="#!">
                        <h6 className="mb-0 fs-15">Nancy Martino</h6>
                      </Link>
                      <p className="mb-0 text-muted fs-13">Owners</p>
                    </div>
                    <div className="bookmark-icon">
                      <button
                        type="button"
                        className="btn btn-icon active"
                        data-bs-toggle="button"
                        aria-pressed="true"
                      >
                        <i className="mdi mdi-cards-heart fs-16"></i>
                      </button>
                    </div>
                  </div>
                  <div className="explore-place-bid-img overflow-hidden rounded">
                    <Image
                      src="/images/nft/img-05.jpg"
                      alt="Long-tailed Macaque NFT"
                      className="explore-img w-100"
                      width={300}
                      height={300}
                    />
                    <div className="bg-overlay"></div>
                    <div className="place-bid-btn">
                      <Link href="#!" className="btn btn-success">
                        <i className="ri-auction-fill align-bottom me-1"></i>{" "}
                        Place Bid
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="fw-medium mb-0 float-end">
                      <i className="mdi mdi-heart text-danger align-middle"></i>{" "}
                      19.29k
                    </p>
                    <h5 className="text-success">
                      <i className="mdi mdi-ethereum"></i> 97.8 ETH
                    </h5>
                    <h6 className="fs-16 mb-0">
                      <Link href="/apps-nft-item-details">
                        Patterns arts &amp; culture
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card explore-box card-animate border">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src="/images/users/avatar-9.jpg"
                      alt="Henry Baird Avatar"
                      className="avatar-xs rounded-circle"
                      width={50}
                      height={50}
                    />
                    <div className="ms-2 flex-grow-1">
                      <Link href="#!">
                        <h6 className="mb-0 fs-15">Henry Baird</h6>
                      </Link>
                      <p className="mb-0 text-muted fs-13">Creators</p>
                    </div>
                    <div className="bookmark-icon">
                      <button
                        type="button"
                        className="btn btn-icon"
                        data-bs-toggle="button"
                        aria-pressed="true"
                      >
                        <i className="mdi mdi-cards-heart fs-16"></i>
                      </button>
                    </div>
                  </div>
                  <div className="explore-place-bid-img overflow-hidden rounded">
                    <Image
                      src="/images/nft/img-03.jpg"
                      alt="Creative Filtered Portrait NFT"
                      className="explore-img w-100"
                      width={300}
                      height={300}
                    />
                    <div className="bg-overlay"></div>
                    <div className="place-bid-btn">
                      <Link href="#!" className="btn btn-success">
                        <i className="ri-auction-fill align-bottom me-1"></i>{" "}
                        Place Bid
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="fw-medium mb-0 float-end">
                      <i className="mdi mdi-heart text-danger align-middle"></i>{" "}
                      31.64k
                    </p>
                    <h5 className="text-success">
                      <i className="mdi mdi-ethereum"></i> 475.23 ETH
                    </h5>
                    <h6 className="fs-16 mb-0">
                      <Link href="/apps-nft-item-details">Evolved Reality</Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card explore-box card-animate border">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src="/images/users/avatar-10.jpg"
                      alt="Diana Kohler Avatar"
                      className="avatar-xs rounded-circle"
                      width={50}
                      height={50}
                    />
                    <div className="ms-2 flex-grow-1">
                      <Link href="#!">
                        <h6 className="mb-0 fs-15">Diana Kohler</h6>
                      </Link>
                      <p className="mb-0 text-muted fs-13">Owners</p>
                    </div>
                    <div className="bookmark-icon">
                      <button
                        type="button"
                        className="btn btn-icon active"
                        data-bs-toggle="button"
                        aria-pressed="true"
                      >
                        <i className="mdi mdi-cards-heart fs-16"></i>
                      </button>
                    </div>
                  </div>
                  <div className="explore-place-bid-img overflow-hidden rounded">
                    <Image
                      src="https://img.themesbrand.com/velzon/images/img-1.gif"
                      alt="Long-tailed Macaque NFT"
                      className="img-fluid explore-img"
                      width={300}
                      height={300}
                    />
                    <div className="bg-overlay"></div>
                    <div className="place-bid-btn">
                      <Link href="#!" className="btn btn-success">
                        <i className="ri-auction-fill align-bottom me-1"></i>{" "}
                        Place Bid
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="fw-medium mb-0 float-end">
                      <i className="mdi mdi-heart text-danger align-middle"></i>{" "}
                      8.34k
                    </p>
                    <h5 className="text-success">
                      <i className="mdi mdi-ethereum"></i> 701.38 ETH
                    </h5>
                    <h6 className="fs-16 mb-0">
                      <Link href="/apps-nft-item-details">
                        Long-tailed macaque
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end Discover Items*/}

      {/* start Work Process */}
      <section className="section bg-light" id="creators">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2 className="mb-3 fw-semibold lh-base">
                  Top Creator This Week
                </h2>
                <p className="text-muted">
                  NFTs are valuable because they verify the authenticity of a
                  non-fungible asset. This makes these assets unique and one of
                  a kind.
                </p>
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="flex-shink-0">
                      <Image
                        src="/images/nft/img-01.jpg"
                        alt="Timothy Smith NFT"
                        className="avatar-sm object-fit-cover rounded"
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <Link href="/pages/profile">
                        <h5 className="mb-1">Timothy Smith</h5>
                      </Link>
                      <p className="text-muted mb-0">
                        <i className="mdi mdi-ethereum text-primary fs-14"></i>{" "}
                        4,754 ETH
                      </p>
                    </div>
                    <div>
                      <div className="dropdown float-end">
                        <button
                          className="btn btn-ghost-primary btn-icon dropdown"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ri-more-fill align-middle fs-16"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <Link
                              className="dropdown-item view-item-btn"
                              href="javascript:void(0);"
                            >
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item edit-item-btn"
                              href="#!"
                              data-bs-toggle="modal"
                            >
                              Report
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="flex-shink-0">
                      <Image
                        src="/images/users/avatar-5.jpg"
                        alt="Alexis Clarke Avatar"
                        className="avatar-sm object-fit-cover rounded"
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <Link href="/pages/profile">
                        <h5 className="mb-1">Alexis Clarke</h5>
                      </Link>
                      <p className="text-muted mb-0">
                        <i className="mdi mdi-ethereum text-primary fs-14"></i>{" "}
                        81,369 ETH
                      </p>
                    </div>
                    <div>
                      <div className="dropdown float-end">
                        <button
                          className="btn btn-ghost-primary btn-icon dropdown"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ri-more-fill align-middle fs-16"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <Link
                              className="dropdown-item view-item-btn"
                              href="javascript:void(0);"
                            >
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item edit-item-btn"
                              href="#!"
                              data-bs-toggle="modal"
                            >
                              Report
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="flex-shink-0">
                      <Image
                        src="/images/nft/img-06.jpg"
                        alt="Glen Matney NFT"
                        className="avatar-sm object-fit-cover rounded"
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <Link href="/pages/profile">
                        <h5 className="mb-1">Glen Matney</h5>
                      </Link>
                      <p className="text-muted mb-0">
                        <i className="mdi mdi-ethereum text-primary fs-14"></i>{" "}
                        13,156 ETH
                      </p>
                    </div>
                    <div>
                      <div className="dropdown float-end">
                        <button
                          className="btn btn-ghost-primary btn-icon dropdown"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ri-more-fill align-middle fs-16"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <Link
                              className="dropdown-item view-item-btn"
                              href="javascript:void(0);"
                            >
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item edit-item-btn"
                              href="#!"
                              data-bs-toggle="modal"
                            >
                              Report
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="flex-shink-0">
                      <Image
                        src="https://img.themesbrand.com/velzon/images/img-5.gif"
                        alt="Herbert Stokes NFT"
                        className="avatar-sm object-fit-cover rounded"
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <Link href="/pages/profile">
                        <h5 className="mb-1">Herbert Stokes</h5>
                      </Link>
                      <p className="text-muted mb-0">
                        <i className="mdi mdi-ethereum text-primary fs-14"></i>{" "}
                        34,754 ETH
                      </p>
                    </div>
                    <div>
                      <div className="dropdown float-end">
                        <button
                          className="btn btn-ghost-primary btn-icon dropdown"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ri-more-fill align-middle fs-16"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <Link
                              className="dropdown-item view-item-btn"
                              href="javascript:void(0);"
                            >
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item edit-item-btn"
                              href="#!"
                              data-bs-toggle="modal"
                            >
                              Report
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="flex-shink-0">
                      <Image
                        src="/images/users/avatar-8.jpg"
                        alt="Michael Morris Avatar"
                        className="avatar-sm object-fit-cover rounded"
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <Link href="/pages/profile">
                        <h5 className="mb-1">Michael Morris</h5>
                      </Link>
                      <p className="text-muted mb-0">
                        <i className="mdi mdi-ethereum text-primary fs-14"></i>{" "}
                        13,841 ETH
                      </p>
                    </div>
                    <div>
                      <div className="dropdown float-end">
                        <button
                          className="btn btn-ghost-primary btn-icon dropdown"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ri-more-fill align-middle fs-16"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <Link
                              className="dropdown-item view-item-btn"
                              href="javascript:void(0);"
                            >
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item edit-item-btn"
                              href="#!"
                              data-bs-toggle="modal"
                            >
                              Report
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="flex-shink-0">
                      <Image
                        src="/images/nft/img-02.jpg"
                        alt="James Morris NFT"
                        className="avatar-sm object-fit-cover rounded"
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <Link href="/pages/profile">
                        <h5 className="mb-1">James Morris</h5>
                      </Link>
                      <p className="text-muted mb-0">
                        <i className="mdi mdi-ethereum text-primary fs-14"></i>{" "}
                        63,710 ETH
                      </p>
                    </div>
                    <div>
                      <div className="dropdown float-end">
                        <button
                          className="btn btn-ghost-primary btn-icon dropdown"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ri-more-fill align-middle fs-16"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <Link
                              className="dropdown-item view-item-btn"
                              href="javascript:void(0);"
                            >
                              Share
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item edit-item-btn"
                              href="#!"
                              data-bs-toggle="modal"
                            >
                              Report
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
        </div>
        {/* end container */}
      </section>
      {/* end Work Process */}

      {/* start cta */}
      <section className="py-5 bg-primary position-relative">
        <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-sm">
              <div>
                <h4 className="text-white mb-0 fw-semibold">
                  Create and Sell Your NFT's
                </h4>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-auto">
              <div>
                <Link
                  href="/apps-nft-create"
                  className="btn bg-gradient btn-danger me-2"
                >
                  Create NFT
                </Link>
                <Link
                  href="/apps-nft-explore"
                  className="btn bg-gradient btn-info"
                >
                  Discover More
                </Link>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </section>
      {/* end cta */}

      {/* Start footer */}
      <footer className="custom-footer bg-dark py-5 position-relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mt-4">
              <div>
                <div>
                  <Image
                    src="/images/logo-light.png"
                    alt="Velzon Logo Light"
                    height="17"
                    width={85}
                  />
                </div>
                <div className="mt-4">
                  <p>Premium Multipurpose Admin & Dashboard Template</p>
                  <p>
                    You can build any type of web application like eCommerce,
                    CRM, CMS, Project management apps, Admin Panels, etc using
                    Velzon.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-7 ms-lg-auto">
              <div className="row">
                <div className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Company</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="/pages/profile">About Us</Link>
                      </li>
                      <li>
                        <Link href="/pages/gallery">Gallery</Link>
                      </li>
                      <li>
                        <Link href="/apps-projects-overview">Projects</Link>
                      </li>
                      <li>
                        <Link href="/pages/timeline">Timeline</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Apps Pages</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="/pages/pricing">Calendar</Link>
                      </li>
                      <li>
                        <Link href="/apps/mailbox">Mailbox</Link>
                      </li>
                      <li>
                        <Link href="/apps-chat">Chat</Link>
                      </li>
                      <li>
                        <Link href="/apps-crm-deals">Deals</Link>
                      </li>
                      <li>
                        <Link href="/apps-tasks-kanban">Kanban Board</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Support</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="/pages/faqs">FAQ</Link>
                      </li>
                      <li>
                        <Link href="/pages/faqs">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center text-sm-start align-items-center mt-5">
            <div className="col-sm-6">
              <div>
                <p className="copy-rights mb-0">
                  <script>document.write(new Date().getFullYear())</script> ©
                  Velzon - Themesbrand
                </p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end mt-3 mt-sm-0">
                <ul className="list-inline mb-0 footer-social-link">
                  <li className="list-inline-item">
                    <Link
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-facebook-fill"></i>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-github-fill"></i>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-linkedin-fill"></i>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-google-fill"></i>
                      </div>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      href="javascript: void(0);"
                      className="avatar-xs d-block"
                    >
                      <div className="avatar-title rounded-circle">
                        <i className="ri-dribbble-line"></i>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* end footer */}

      {/*start back-to-top*/}
      <BackToTopButton />
      {/*end back-to-top*/}
    </div>
  );
};

export default NftLandingPage;
