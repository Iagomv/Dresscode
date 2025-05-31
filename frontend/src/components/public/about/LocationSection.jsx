import React from "react";
import { COLORS, SPACING } from "../../../constants/theme";

const LocationSection = ({ name, address, founded }) => (
  <section className="mb-5">
    <div
      style={{
        padding: SPACING.large,
        backgroundColor: COLORS.background,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "4px",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          color: COLORS.secondary,
          marginBottom: SPACING.medium,
        }}
      >
        {name}
      </h3>
      <p style={{ marginBottom: SPACING.small }}>{address}</p>
      <div
        style={{
          color: COLORS.primary,
          fontWeight: "500",
        }}
      >
        Fundado en {founded}
      </div>
    </div>
  </section>
);

export default LocationSection;
