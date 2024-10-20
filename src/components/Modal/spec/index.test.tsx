import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import Modal from "..";

describe('Modal component', () => {
  it('should be correctly rendered', () => {
    render(
      <Modal title="Title">
          <article>Content</article>
      </Modal>
    );

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  })
})