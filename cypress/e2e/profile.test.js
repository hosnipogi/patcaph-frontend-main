/// <reference types="cypress" />

context("Profile", () => {
  // https://on.cypress.io/interacting-with-elements

  before(() => {
    cy.clearCookies()
    cy.visit("/login")
    cy.get("#email").type("test@12345.com")
    cy.get("#password").type("123123")
    cy.get(".text-lg").click()
  })

  after(() => {
    cy.clearCookies()
  })

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: () => {
        return true
      },
    })
  })

  it("Complete personal profile", () => {
    cy.get("#firstname").type("first")
    cy.get("#middlename").type("middle")
    cy.get("#surname").type("surname")
    cy.get("#address").type("home is where the heart is")
    cy.get("#contactNumber").type("123123")
    cy.get('[for="Male"] [type="radio"]')
      .not("[disabled]")
      .check()
      .should("be.checked")
    cy.get('[for="Single"] [type="radio"]')
      .not("[disabled]")
      .check()
      .should("be.checked")
    cy.get("#birthday").type("2000-07-20")
    cy.get("#birthplace").type("KSA")

    cy.get('[data-testid="profile__personal__button__next"').click() // next - employment
  })

  it("Complete employment profile", () => {
    cy.get("#batch").select("CAOCSP 2")
    cy.get("#batch").should("have.value", "CAOCSP 2")
    cy.get("#wiresign").type("1qwe") // simulate user entering a number and more than 2 characters
    cy.get("#wiresign").should("have.value", "qw")
    cy.get("#dateEmployed").type("January 1, 2021")
    cy.get("#licenseNumber").type(155123)
    cy.get("#ATCLicenseExpiry").type("Jan 20,2022")
    cy.get("#medicalLicenseExpiry").type("Jan 22, 2022")

    // // start facility input

    cy.get("[id='facility[0].facility']").select("ATS")
    cy.get("[id='facility[0].facility']").should("have.value", "ATS")
    cy.get("[id='facility[0].area']").select("CAAP Main")
    cy.get("[id='facility[0].area']").should("have.value", "CAAP Main")
    cy.get("[id='facility[0].from']").type("2020-07-20")
    cy.get("[id='facility[0].to']").type("2020-07-30")
    cy.get("[id='facility[0].designation']").select("ATMO Assistant")
    cy.get("[id='facility[0].designation']").should(
      "have.value",
      "ATMO Assistant"
    )

    cy.get("[data-testid='profile__employment__button__addmore']").click()

    cy.get("[id='facility[1].facility']").select("ACC")
    cy.get("[id='facility[1].facility']").should("have.value", "ACC")
    cy.get("[id='facility[1].area']").select("ATMC")
    cy.get("[id='facility[1].area']").should("have.value", "ATMC")
    cy.get("[id='facility[1].from']").type("2020-07-20")
    cy.get("[id='facility[1].to']").type("2020-07-30")
    cy.get("[id='facility[1].designation']").select("ATMO Assistant")
    cy.get("[id='facility[1].designation']").should(
      "have.value",
      "ATMO Assistant"
    )

    // cy.get("[data-testid='profile__employment__button__addmore']").click()

    // cy.get("[id='facility[2].facility']").select("APP")
    // cy.get("[id='facility[2].facility']").should("have.value", "APP")
    // cy.get("[id='facility[2].area']").select("ATMC")
    // cy.get("[id='facility[2].area']").should("have.value", "ATMC")
    // cy.get("[id='facility[2].from']").type("2020-07-20")
    // cy.get("[id='facility[2].to']").type("2020-07-30")
    // cy.get("[id='facility[2].designation']").select("ATMO Assistant")
    // cy.get("[id='facility[2].designation']").should(
    //   "have.value",
    //   "ATMO Assistant"
    // )

    cy.get('[data-testid="profile__employment__button__next"]').click()
  })

  it("Test picture upload", () => {
    cy.fixture("testPicture.jpg").as("logo")
    cy.get("input[type=file]").then(function (el) {
      // convert the logo base64 string to a blob
      const blob = Cypress.Blob.base64StringToBlob(this.logo, "image/jpeg")

      const file = new File([blob], "testPicture.jpg", { type: "image/jpeg" })
      const list = new DataTransfer()

      list.items.add(file)
      const myFileList = list.files

      el[0].files = myFileList
      el[0].dispatchEvent(new Event("change", { bubbles: true }))
    })
    cy.get('[data-testid="profile__photo__button__crop"]').click()
    // cy.scrollTo("bottom")
    cy.get('[data-testid="profile__photo__button_next"]').click({ force: true })
  })

  it("Successfully submit profile", () => {
    cy.get('button[type="submit"]').click()
  })
})
