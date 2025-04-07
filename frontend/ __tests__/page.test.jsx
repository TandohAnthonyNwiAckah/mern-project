import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Page from '@/app/page'

describe("Page Component", () => {
  it("renders the 'Join Chat' link", () => {
    render(<Page />);
    
    const joinChatLink = screen.getByRole("link", { name: /join chat/i });
    expect(joinChatLink).toBeInTheDocument();
    expect(joinChatLink).toHaveAttribute("href", "/join");
  });
});