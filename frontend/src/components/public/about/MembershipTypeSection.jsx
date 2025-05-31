import React from "react";
import { Row, Col } from "react-bootstrap";
import { COLORS, SPACING } from "../../../constants/theme";

const MembershipTypeSection = ({ membershipText, typeText }) => (
  <section className="mb-5">
    <Row className="g-4">
      <Col md={6}>
        <div
          style={{
            padding: SPACING.large,
            backgroundColor: "#f8f7f5",
            borderRadius: "4px",
          }}
        >
          <h3
            style={{
              color: COLORS.secondary,
              marginBottom: SPACING.medium,
            }}
          >
            Membresía
          </h3>
          <p>{membershipText}</p>
        </div>
      </Col>
      <Col md={6}>
        <div
          style={{
            padding: SPACING.large,
            backgroundColor: "#f8f7f5",
            borderRadius: "4px",
          }}
        >
          <h3
            style={{
              color: COLORS.secondary,
              marginBottom: SPACING.medium,
            }}
          >
            Tipo de Entidad
          </h3>
          <p>{typeText}</p>
        </div>
      </Col>
    </Row>
  </section>
);

export default MembershipTypeSection;
