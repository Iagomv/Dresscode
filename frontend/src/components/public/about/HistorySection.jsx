import React from "react";
import { Row, Col } from "react-bootstrap";
import { COLORS, SPACING } from "../../../constants/theme";
import HistoryImage from "./HistoryImage";
import HistoryTimeline from "./HistoryTimeline";

const HistorySection = ({ t }) => {
  const mainImage = t("history.mainImage");
  const items = t("history.items", { returnObjects: true });
  const title = t("title");

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
            {title}
          </h2>
          <HistoryTimeline items={items} />
        </Col>
      </Row>
    </section>
  );
};

export default HistorySection;
