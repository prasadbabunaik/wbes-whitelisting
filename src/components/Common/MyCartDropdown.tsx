import React, { useState } from "react";
import {
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import Link from "next/link";
import Image from "next/image";

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
const img1 = "/images/products/img-1.png";
const img2 = "/images/products/img-2.png";
const img3 = "/images/products/img-3.png";
const img5 = "/images/products/img-5.png";
const img6 = "/images/products/img-6.png";

const MyCartDropdown = () => {
  const cartData = [
    {
      id: 1,
      img: img1,
      product: "Branded T-Shirts",
      quantity: 10,
      price: 32,
    },
    { id: 2, img: img2, product: "Bentwood Chair", quantity: 5, price: 18 },
    {
      id: 3,
      img: img3,
      product: "Borosil Paper Cup",
      quantity: 3,
      price: 250,
    },
    {
      id: 4,
      img: img6,
      product: "Gray Styled T-Shirt",
      quantity: 1,
      price: 1250,
    },
    {
      id: 5,
      img: img5,
      product: "Stillbird Helmet",
      quantity: 2,
      price: 495,
    },
  ];

  const [cartItem, setCartItem] = useState(cartData.length);

  // Dropdown is uncontrolled, update cart count on toggle

  const removeItem = (ele: HTMLElement | null): void => {
    if (ele) {
      const priceElement = ele
        .closest(".dropdown-item-cart")
        ?.querySelector(".cart-item-price");
      const subTotalElement = document.getElementById("cart-item-total");

      if (priceElement && subTotalElement) {
        const price = parseFloat(priceElement.innerHTML);
        const subTotal = parseFloat(subTotalElement.innerHTML);
        const newTotal = subTotal - price;

        subTotalElement.innerHTML = newTotal.toFixed(2);
      }

      ele.closest(".dropdown-item-cart")?.remove();

      const element = document.querySelectorAll(".dropdown-item-cart").length;
      const ecart = document.getElementById("empty-cart");

      if (ecart) {
        ecart.style.display = element === 0 ? "block" : "none";
      }

      setCartItem(element);
    }
  };

  return (
    <React.Fragment>
      <UncontrolledDropdown
        nav
        inNavbar
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          onClick={() => setCartItem(cartData.length)}
          type="button"
          tag="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        >
          <i className="bx bx-shopping-bag fs-22"></i>
          <span className="position-absolute cartitem-badge topbar-badge fs-10 translate-middle badge rounded-pill bg-info">
            {cartItem}
            <span className="visually-hidden">unread messages</span>
          </span>
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
          aria-labelledby="page-header-cart-dropdown"
        >
          <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fs-16 fw-semibold"> My Cart</h6>
              </Col>
              <div className="col-auto">
                <span className="badge bg-warning-subtle  text-warning fs-13">
                  <span className="cartitem-badge"> {cartItem} </span> items
                </span>
              </div>
            </Row>
          </div>
          <SimpleBar style={{ maxHeight: "300px" }}>
            <div className="p-2">
              <div
                className="text-center empty-cart"
                id="empty-cart"
                style={{ display: "none" }}
              >
                <div className="avatar-md mx-auto my-3">
                  <div className="avatar-title bg-info-subtle text-info fs-36 rounded-circle">
                    <i className="bx bx-cart"></i>
                  </div>
                </div>
                <h5 className="mb-3">Your Cart is Empty!</h5>
                <Link
                  href="/apps-ecommerce-products"
                  className="btn btn-success w-md mb-3"
                >
                  Shop Now
                </Link>
              </div>

              {cartData.map((item, key) => (
                <div
                  className="d-block dropdown-item text-wrap dropdown-item-cart px-3 py-2"
                  key={key}
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={item.img}
                      alt="product"
                      width={40}
                      height={40}
                      className="me-3 rounded-circle avatar-sm p-2 bg-light"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mt-0 mb-1 fs-14">
                        <Link
                          href="/apps-ecommerce-product-details"
                          className="text-reset"
                        >
                          {item.product}
                        </Link>
                      </h6>
                      <p className="mb-0 fs-12 text-muted">
                        Quantity:{" "}
                        <span>
                          {item.quantity} x ${item.price}
                        </span>
                      </p>
                    </div>
                    <div className="px-2">
                      <h5 className="m-0 fw-normal">
                        $
                        <span className="cart-item-price">
                          {item.quantity * item.price}
                        </span>
                      </h5>
                    </div>
                    <div className="ps-2">
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                        onClick={(e: any) => {
                          removeItem(e.target);
                        }}
                      >
                        <i className="ri-close-fill fs-16"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SimpleBar>
          <div
            className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border"
            id="checkout-elem"
          >
            <div className="d-flex justify-content-between align-items-center pb-3">
              <h5 className="m-0 text-muted">Total:</h5>
              <div className="px-2">
                <h5 className="m-0">
                  $<span id="cart-item-total">3400</span>
                </h5>
              </div>
            </div>

            <Link
              href="/apps-ecommerce-checkout"
              className="btn btn-success text-center w-100"
            >
              Checkout
            </Link>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );
};

export default MyCartDropdown;
