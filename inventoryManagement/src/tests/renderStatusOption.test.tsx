import { render, screen } from "@testing-library/react";
import renderStatusOption from "../utils/Status";

describe("renderStatusOption", () => {
  it("renders Completed with green dot", () => {
    const { container } = render(renderStatusOption("Completed"));
    expect(screen.getByText("Completed")).toBeInTheDocument();

    const dot = container.querySelector("span"); // ✅ the colored dot is the first <span>
    expect(dot).toHaveStyle("background-color: #7AC14D");
  });

  it("renders In Progress with light green dot", () => {
    const { container } = render(renderStatusOption("In Progress"));
    expect(screen.getByText("In Progress")).toBeInTheDocument();

    const dot = container.querySelector("span");
    expect(dot).toHaveStyle("background-color: #D7E9B9");
  });

  it("renders On Hold with yellow dot", () => {
    const { container } = render(renderStatusOption("On Hold"));
    expect(screen.getByText("On Hold")).toBeInTheDocument();

    const dot = container.querySelector("span");
    expect(dot).toHaveStyle("background-color: #ECDE7C");
  });
});
