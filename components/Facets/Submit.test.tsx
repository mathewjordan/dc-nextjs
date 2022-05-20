import { fireEvent, render, screen } from "@/test-utils";
import FacetsSubmit from "@/components/Facets/Submit";

const mockFn = jest.fn();

describe("Submit component", () => {
  function renderHelper() {
    return render(<FacetsSubmit setIsModalOpen={mockFn} />);
  }

  it("renders the component", () => {
    renderHelper();
    expect(screen.getByTestId("facets-submit"));
  });

  it("renders the submit button, which calls its callback to close the modal window", () => {
    renderHelper();
    const btn = screen.getByTestId("submit-button");
    fireEvent.click(btn);
    expect(mockFn).toHaveBeenCalledWith(false);
  });
});
