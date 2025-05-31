import React from "react";
import { Row, Col } from "react-bootstrap";
import { COLORS, SPACING } from "../../../constants/theme";
import HistoryImage from "./HistoryImage";
import HistoryTimeline from "./HistoryTimeline";

const HistorySection = ({ history }) => {
  const { mainImage, items } = history;

  return (
    <section className="mb-5" style={{ position: "relative" }}>
      <Row className="g-4">
        <Col md={6} className="mt-5">
          <HistoryImage image={mainImage} />
        </Col>
        <Col md={6}>
          <h2
            style={{
              color: COLORS.secondary,
              borderBottom: `2px solid ${COLORS.border}`,
              paddingBottom: SPACING.small,
              marginBottom: SPACING.large,
            }}
          >
            Nuestra Historia
          </h2>
          <HistoryTimeline items={items} />
        </Col>
      </Row>
    </section>
  );
};

export default HistorySection;
