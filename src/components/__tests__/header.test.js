import React from "react"
import { render } from "@testing-library/react"
import { UserProvider } from "../../contexts/UserContext"
import Header from "../header/"

const routes = ["/", "/about", "/contact"]

describe("Header component", () => {
  it("Renders correctly", () => {
    const tree = render(
      <UserProvider>
        <Header location="/" routes={routes} />
      </UserProvider>
    )
    expect(tree).toMatchSnapshot()
  })
})
