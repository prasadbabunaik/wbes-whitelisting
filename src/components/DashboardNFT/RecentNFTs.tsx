"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { recentNFTsData } from "@common/data/dashboardNFT";
import { topCollectionData } from "@common/data/dashboardNFT";
import { popularCreatorsData } from "@common/data/dashboardNFT";
import Image from "next/image";

// Import Images
// Flag icons
const usFlag = "/images/flags/us.svg";
const russiaFlag = "/images/flags/russia.svg";
const spainFlag = "/images/flags/spain.svg";
const italyFlag = "/images/flags/italy.svg";
const germanyFlag = "/images/flags/germany.svg";
const chinaFlag = "/images/flags/china.svg";
const japanFlag = "/images/flags/jp.svg";
const koreaFlag = "/images/flags/kr.svg";
const indiaFlag = "/images/flags/in.svg";
const brazilFlag = "/images/flags/br.svg";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Vector Map
import { VectorMap } from "@south-paw/react-vector-maps";
import world from "@common/world.svg.json";
import Link from "next/link";
import {
  SorttingData,
  sortElementsById,
} from "@components/Common/SorttingData";

interface recentNFTsType {
  id: number;
  img: string;
  title: string;
  category: string;
  icon: string;
  volume: string;
  hours: number;
  creators: string;
  items: string;
  textColor?: boolean;
}

const RecentNFTs = () => {
  const [recentNFT, setRecentNFT] = useState<any>(recentNFTsData);
  const [recentNFTDrop, setRecentNFTDrop] = useState<string>("Popular");

  const handleSorting = (value: string) => {
    setRecentNFTDrop(value);
    if (value === "Popular") {
      SorttingData({
        data: recentNFTsData,
        item: "title",
        setState: setRecentNFT,
      });
    } else if (value === "Newest") {
      sortElementsById({
        data: recentNFTsData,
        item: "volume",
        setState: setRecentNFT,
      });
    } else {
      SorttingData({
        data: recentNFTsData,
        item: "category",
        setState: setRecentNFT,
      });
    }
  };
  return (
    <React.Fragment>
      <Row>
        <Col xxl={6}>
          <Card>
            <CardHeader className="align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Recent NFTs</h4>
              <div className="flex-shrink-0">
                <UncontrolledDropdown className="card-header-dropdown">
                  <DropdownToggle
                    tag="a"
                    className="text-reset dropdown-btn"
                    role="button"
                  >
                    <span className="fw-semibold text-uppercase fs-12">
                      Sort by:{" "}
                    </span>
                    <span className="text-muted">
                      {recentNFTDrop}{" "}
                      <i className="mdi mdi-chevron-down ms-1"></i>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem
                      to="#"
                      onClick={() => handleSorting("Popular")}
                    >
                      Popular
                    </DropdownItem>
                    <DropdownItem
                      to="#"
                      onClick={() => handleSorting("Newest")}
                    >
                      Newest
                    </DropdownItem>
                    <DropdownItem
                      to="#"
                      onClick={() => handleSorting("Oldest")}
                    >
                      Oldest
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </CardHeader>
            <CardBody>
              <div className="table-responsive table-card">
                <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                  <thead className="text-muted bg-light-subtle">
                    <tr>
                      <th>Collection</th>
                      <th>Volume</th>
                      <th>24h %</th>
                      <th>Creators</th>
                      <th>Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(recentNFT || []).map(
                      (item: recentNFTsType, key: number) => (
                        <tr key={key}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="me-2">
                                <Image
                                  src={item.img}
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="avatar-xs rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-1">
                                  <Link href="/apps-nft-item-details">
                                    {item.title}
                                  </Link>
                                </h6>
                                <p className="text-muted mb-0">
                                  {" "}
                                  {item.category}{" "}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <Image
                              src={item.icon}
                              width={20}
                              height={20}
                              className="avatar-xxs me-2"
                              alt=""
                            />
                            {item.volume}
                          </td>
                          <td>
                            <span
                              className={
                                item.textColor
                                  ? "text-danger mb-0"
                                  : "text-success mb-0"
                              }
                            >
                              <i
                                className={
                                  item.textColor
                                    ? "mdi mdi-trending-down align-middle me-1"
                                    : "mdi mdi-trending-up align-middle me-1"
                                }
                              ></i>
                              {item.hours}
                            </span>
                          </td>
                          <td>{item.creators}</td>
                          <td>{item.items}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xxl={3} lg={6}>
          <Card className="card-height-100">
            <CardHeader className="align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">
                Worldwide Top Creators
              </h4>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-soft-primary btn-sm material-shadow-none"
                >
                  Export Report
                </button>
              </div>
            </CardHeader>
            <CardBody>
              <div id="world_map_line_markers" className="custom-vector-map">
                <VectorMap {...world} />
              </div>
              {/* <Vector value="world_mill" /> */}
              {/* <div id="creators-by-locations" data-colors='["--vz-gray-200", "--vz-success", "--vz-primary"]' style={{ height: "265px" }} dir="ltr"></div> */}
              <div className="mt-1">
                <p className="mb-1">
                  <Image
                    src={usFlag}
                    alt=""
                    width={15}
                    height={15}
                    className="rounded me-2"
                  />{" "}
                  United States <span className="float-end">27%</span>
                </p>
                <p className="mb-1">
                  <Image
                    src={russiaFlag}
                    alt=""
                    width={15}
                    height={15}
                    className="rounded me-2"
                  />{" "}
                  Russia <span className="float-end">18%</span>
                </p>
                <p className="mb-1">
                  <Image
                    src={spainFlag}
                    alt=""
                    width={15}
                    height={15}
                    className="rounded me-2"
                  />{" "}
                  Spain <span className="float-end">14%</span>
                </p>
                <p className="mb-1">
                  <Image
                    src={italyFlag}
                    alt=""
                    width={15}
                    height={15}
                    className="rounded me-2"
                  />{" "}
                  Italy <span className="float-end">10%</span>
                </p>
                <p className="mb-0">
                  <Image
                    src={germanyFlag}
                    alt=""
                    width={15}
                    height={15}
                    className="rounded me-2"
                  />{" "}
                  Germany <span className="float-end">10%</span>
                </p>
                <p className="mb-0">
                  <Image
                    src={chinaFlag}
                    alt=""
                    width={15}
                    height={15}
                    className="rounded me-2"
                  />{" "}
                  China <span className="float-end">10%</span>
                </p>
                <p className="mb-0">
                  <Image
                    src={indiaFlag}
                    alt=""
                    width={15}
                    height={15}
                    className="rounded me-2"
                  />{" "}
                  India <span className="float-end">10%</span>
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xxl={3} lg={6}>
          <Card>
            <CardHeader className="d-flex align-items-center">
              <h6 className="card-title flex-grow-1 mb-0">Top Collections</h6>
              <Link
                href="/apps-nft-collections"
                type="button"
                className="btn btn-soft-primary btn-sm flex-shrink-0 material-shadow-none"
              >
                See All <i className="ri-arrow-right-line align-bottom"></i>
              </Link>
            </CardHeader>
            <CardBody>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="mySwiper swiper collection-slider"
              >
                <div className="swiper-wrapper">
                  {topCollectionData.map((item, key) => (
                    <SwiperSlide key={key}>
                      <div className="dash-collection overflow-hidden rounded-top position-relative">
                        <Image
                          src={item.img}
                          alt=""
                          width={220}
                          height={220}
                          className="object-fit-cover w-100"
                        />
                        <div className="content position-absolute bottom-0 m-2 p-2 start-0 end-0 rounded d-flex align-items-center">
                          <div className="flex-grow-1">
                            <Link href="#">
                              <h5 className="text-white fs-16 mb-1">
                                {item.category}
                              </h5>
                            </Link>
                            <p className="text-white text-opacity-75 mb-0">
                              {item.items} Items
                            </p>
                          </div>
                          <div className="avatar-xxs">
                            <div className="avatar-title bg-white rounded-circle">
                              <Link href="#" className="link-success">
                                <i className="ri-arrow-right-line"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="d-flex align-items-center">
              <h5 className="card-title flex-grow-1 mb-0">Popular Creators</h5>
              <Link
                href="/apps-nft-creators"
                type="button"
                className="btn btn-soft-primary btn-sm flex-shrink-0 material-shadow-none"
              >
                See All <i className="ri-arrow-right-line align-bottom"></i>
              </Link>
            </CardHeader>
            <CardBody>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="mySwiper swiper collection-slider"
              >
                <div className="swiper-wrapper">
                  {popularCreatorsData.map((item, key) => (
                    <SwiperSlide key={key}>
                      <div className="d-flex">
                        <div className="flex-shink-0">
                          <Image
                            src={item.img}
                            alt=""
                            width={40}
                            height={40}
                            className="avatar-sm object-fit-cover rounded"
                          />
                        </div>
                        <div className="ms-3 flex-grow-1">
                          <Link href="/pages-profile">
                            <h5 className="mb-1">{item.author}</h5>
                          </Link>
                          <p className="text-muted mb-0">
                            <i className="mdi mdi-ethereum text-primary fs-14"></i>{" "}
                            {item.price}
                          </p>
                        </div>
                        <div>
                          <UncontrolledDropdown className="float-end">
                            <DropdownToggle
                              tag="a"
                              className="btn btn-ghost-primary btn-icon dropdown"
                              role="button"
                            >
                              <i className="ri-more-fill align-middle fs-16"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem to="#">View</DropdownItem>
                              <DropdownItem to="#">Share</DropdownItem>
                              <DropdownItem to="#">Report</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RecentNFTs;
