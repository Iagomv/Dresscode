import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { FONT_FAMILY, COLORS, SPACING } from "../../constants/theme";

const Home = () => {
  const { t } = useTranslation("home");

  // Fetch sections as an array from translations, with fallback empty array
  const sections = t("sections", { returnObjects: true });
  const safeSections = Array.isArray(sections) ? sections : [];

  return (
    <div style={{ fontFamily: FONT_FAMILY, color: COLORS.text }}>
      {/* Hero Section */}
      <div
        style={{
          background: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), url(${t(
            "heroImage"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderBottom: `1px solid ${COLORS.border}`,
          position: "relative",
        }}
      >
        <div
          style={{
            padding: SPACING.large,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            border: `1px solid ${COLORS.border}`,
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          <h1
            className="display-5"
            style={{
              fontWeight: 400,
              letterSpacing: "1px",
              color: COLORS.primary,
              marginBottom: SPACING.medium,
            }}
          >
            {t("heroText")}
          </h1>
          <div
            style={{
              height: "2px",
              width: "80px",
              backgroundColor: COLORS.secondary,
              margin: `0 auto ${SPACING.medium}`,
            }}
          />
          <p
            className="lead"
            style={{
              fontWeight: 300,
              color: COLORS.primary,
            }}
          >
            {t("heroSubtext")}
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <Container className="my-5" style={{ maxWidth: "900px" }}>
        {safeSections.map((section, idx) => (
          <Row key={idx} className="mb-5 py-4">
            <Col md={{ span: 10, offset: 1 }}>
              <h2
                className="text-center mb-4"
                style={{
                  fontWeight: 400,
                  letterSpacing: "1px",
                  color: COLORS.primary,
                  position: "relative",
                  paddingBottom: SPACING.medium,
                }}
              >
                {section.title}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60px",
                    height: "2px",
                    backgroundColor: COLORS.secondary,
                  }}
                />
              </h2>
              <p
                className="text-center"
                style={{
                  lineHeight: "1.8",
                  fontSize: "1.1rem",
                  color: COLORS.text,
                }}
              >
                {section.content}
              </p>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Home;
