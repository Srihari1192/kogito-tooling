/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as buildEnv from "@kogito-tooling/build-env";

describe("DMN Runner Test", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:${buildEnv.onlineEditor.dev.port}/`);
  });

  it("Test DMN Runner on DMN sample", () => {
    // click Create new decision model button (new DMN)
    cy.get("[data-ouia-component-id='try-dmn-sample-button']").click();

    // wait until loading dialog disappears
    cy.loadEditor();

    // check editor logo
    cy.get("[class='pf-c-brand']").within(($logo) => {
      expect($logo.attr("src")).contain("dmn");
      expect($logo.attr("alt")).contain("dmn");
    });

    // start the DMN Runner
    cy.get("[data-ouia-component-id='dmn-guided-tour-skip-runner-start-button']").click();

    // fill in DMN Runner inputs panel
    cy.get("[data-testid='dmn-form']").within(($form) => {
      cy.get("input[name='Credit Score.FICO']").type("650");
      cy.get("input[name='Applicant Data.Age']").type("30");

      cy.get("[x-dmn-type*='Marital_Status'] button").click();
      cy.get("ul[name='Applicant Data.Marital Status'] button").contains("M").click();

      cy.get("input[name='Applicant Data.Existing Customer']").check();

      cy.get("input[name='Applicant Data.Monthly.Income']").type("3000");
      cy.get("input[name='Applicant Data.Monthly.Repayments']").type("120");
      cy.get("input[name='Applicant Data.Monthly.Expenses']").type("0");
      cy.get("input[name='Applicant Data.Monthly.Tax']").type("0");
      cy.get("input[name='Applicant Data.Monthly.Insurance']").type("0");

      cy.get("[x-dmn-type*='Product_Type'] button").click();
      cy.get("ul[name='Requested Product.Type'] button").contains("Standard Loan").click();

      cy.get("input[name='Requested Product.Rate']").type("1.5");
      cy.get("input[name='Requested Product.Term']").type("4");
      cy.get("input[name='Requested Product.Amount']").type("10000");
    });

    // check DMN Runner outputs panel
    cy.get("[data-testid='dmn-form-result']").within(($form) => {
      cy.get("article div:contains('Front End Ratio')").next().contains("Sufficient").should("be.visible");
      cy.get("article div:contains('Back End Ratio')").next().contains("Sufficient").should("be.visible");
      cy.get("article div:contains('Credit Score Rating')").next().contains("Fair").should("be.visible");
      cy.get("article div:contains('Loan Pre-Qualification')").next().should("contain.text", "Qualified");
    });
  });
});
