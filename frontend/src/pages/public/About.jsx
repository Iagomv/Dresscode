import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { COLORS, FONT_FAMILY, SPACING } from "../../constants/theme";
import AboutHeader from "../../components/public/about/AboutHeader";
import HistorySection from "../../components/public/about/HistorySection";
import MembershipTypeSection from "../../components/public/about/MembershipTypeSection";
import LocationSection from "../../components/public/about/LocationSection";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        color: COLORS.text,
        padding: `${SPACING.large} 0`,
      }}
    >
      <Container>
        <AboutHeader title={t("title")} intro={t("intro")} />

        <HistorySection t={t} />

        <MembershipTypeSection
          membershipText={t("membership")}
          typeText={t("type")}
        />
      </Container>

      <LocationSection
        name={t("location.name")}
        address={t("location.address")}
        founded={t("location.founded")}
      />
    </div>
  );
};

export default About;
