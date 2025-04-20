const categoryColorMap: Record<string, string> = {
  "Sidewalk Shed": "#62B44A",
  Scaffold: "#ECDE7C",
  Shoring: "#925FE2",
};

export const renderCategoryOption = (category: string) => (
  <div
    style={{
      background: categoryColorMap[category],
      padding: "4px 8px",
      borderRadius: 4,
      color: "#fff",
    }}
  >
    {category}
  </div>
);

export default categoryColorMap;
