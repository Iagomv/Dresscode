const HistoryImage = ({ image }) => {
  if (!image) return null;
  return (
    <div
      style={{
        height: "400px",
        background: `url(${image}) center/cover`,
        borderRadius: "4px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default HistoryImage;
