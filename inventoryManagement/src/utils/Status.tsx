const renderStatusOption = (status: string) => {
  const colorMap: Record<string, string> = {
    Completed: "#7AC14D",
    "In Progress": "#D7E9B9",
    "On Hold": "#ECDE7C",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: colorMap[status],
        }}
      />
      {status}
    </div>
  );
};

export default renderStatusOption;
