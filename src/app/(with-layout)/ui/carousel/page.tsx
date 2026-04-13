"use client";
import React from "react";
import "./carousel-custom.css";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

// Import Content
import UiContent from "@components/Common/UiContent";
//import Components
import BreadCrumb from "@components/Common/BreadCrumb";
import PreviewCardHeader from "@components/Common/PreviewCardHeader";
import Slide from "./carousel-types/slide";
import Slidewithcontrol from "./carousel-types/slidewithcontrol";
import Slidewithindicator from "./carousel-types/slidewithindicator";
import Slidewithcaption from "./carousel-types/slidewithcaption";
import CrossFadeAnimation from "./carousel-types/crossfadeAnimation";
import IndividualInterval from "./carousel-types/individualInterval";
import DisableTouch from "./carousel-types/disableTouch";
import SlideDark from "./carousel-types/slideDark";
import {
  SlideOnlyExample,
  WithControlExample,
  WithIndicatorExample,
  WithCaptionExample,
  CrossFadeExample,
  InduvidualIntervalExample,
  DisableTouchExample,
  DarkVariantExample,
} from "./UiCarouselCode";

const UiCarousel = () => {
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Carousel" pageTitle="Base UI" />
          <Row>
            <Col xl={6}>
              <Card>
                <PreviewCardHeader title="Slides Only" />
                <CardBody>
                  <div className="live-preview">
                    <Slide />
                  </div>
                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <SlideOnlyExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card>
                <PreviewCardHeader title="With Controls" />
                <CardBody>
                  <div className="live-preview">
                    <Slidewithcontrol />
                  </div>
                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "375px" }}
                    >
                      <code>
                        <WithControlExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <PreviewCardHeader title="with Indicators" />

                <CardBody>
                  <div className="live-preview">
                    <Slidewithindicator />
                  </div>

                  <div className="d-none code-view">
                    <pre
                      className="language-markup"
                      style={{ height: "375px" }}
                    >
                      <code>
                        <WithIndicatorExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <PreviewCardHeader title="with Captions" />
                <CardBody>
                  <div className="live-preview">
                    <Slidewithcaption />
                  </div>
                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <WithCaptionExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <PreviewCardHeader title="Crossfade Animation" />
                <CardBody>
                  <div className="live-preview">
                    <CrossFadeAnimation />
                  </div>

                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <CrossFadeExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <PreviewCardHeader title="Individual carousel-item Interval" />

                <CardBody>
                  <div className="live-preview">
                    <IndividualInterval />
                  </div>

                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <InduvidualIntervalExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              <Card>
                <PreviewCardHeader title="Disable Touch Swiping" />
                <CardBody>
                  <div className="live-preview">
                    <DisableTouch />
                  </div>
                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <DisableTouchExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={6}>
              <Card>
                <PreviewCardHeader title="Dark Variant" />
                <CardBody>
                  <div className="live-preview">
                    <SlideDark />
                  </div>
                  <div className="d-none code-view">
                    <pre className="language-markup">
                      <code>
                        <DarkVariantExample />
                      </code>
                    </pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiCarousel;
