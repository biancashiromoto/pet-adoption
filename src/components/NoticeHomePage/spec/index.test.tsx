import { fireEvent, render, screen } from "@testing-library/react";
import NoticeHomePage from "..";
import { ContextProps } from "@/context/index.types";
import { Context } from "@/context";

describe("NoticeHomePage component", () => {
  const setDontShowHomePageNoticeAgain = vi.fn();
  beforeEach(() =>
    render(
      <Context.Provider
        value={
          {
            setDontShowHomePageNoticeAgain,
            dontShowHomePageNoticeAgain: false,
          } as unknown as ContextProps
        }
      >
        <NoticeHomePage />
      </Context.Provider>
    )
  );

  it("should be correctly rendered", () => {
    expect(screen.getByTestId("notice").textContent).toMatch(
      /this website is a demo created for learning and development purposes/i
    );
    expect(screen.getByRole("link").getAttribute("href")).toBe(
      "https://github.com/biancashiromoto/pet-adoption/blob/main/README.md"
    );
  });

  it("should call setDontShowHomePageNoticeAgain when checkbox is checked", () => {
    fireEvent.click(screen.getByRole("checkbox"));
    expect(setDontShowHomePageNoticeAgain).toHaveBeenCalledTimes(1);
  });
});
