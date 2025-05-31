import { COLORS, SPACING } from "../../../constants/theme";
const AboutHeader = ({ title, intro }) => (
  <header className="text-center mb-5">
    <h1
      style={{
        color: COLORS.primary,
        fontSize: "2.5rem",
        letterSpacing: "1px",
        marginBottom: SPACING.medium,
      }}
    >
      {title}
    </h1>
    <p
      style={{
        fontSize: "1.1rem",
        lineHeight: "1.6",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {intro}
    </p>
  </header>
);

export default AboutHeader;
