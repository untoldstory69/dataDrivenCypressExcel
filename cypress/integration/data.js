let rowsLength;
describe ('Data Driven Testing Using Excel FIle', () =>{
  before(() => {
     cy.task('readXlsx', { file: 'cypress/fixtures/excelData.xlsx', sheet: "Sheet1" }).then((rows) => {
        rowsLength = rows.length;
        cy.writeFile("cypress/fixtures/xlsxData.json", {rows})
      })
        cy.visit(Cypress.config('baseURL'));
      })
    it ('Data Driven: Register User', () => {
      cy.fixture('xlsxData').then((data) => {
         for ( let i = 0; i < rowsLength; i++) {
            cy.get('.btn-link').click();
            cy.url().should('include', '/register').then(()=>{
            cy.get('input[formcontrolname="firstName"]').type(data.rows[i].firstName);
            cy.get('input[formcontrolname="lastName"]').type(data.rows[i].lastName);
            cy.get('input[formcontrolname="username"]').type(data.rows[i].username);
            cy.get('input[formcontrolname="password"]').type(data.rows[i].password);
            cy.get('.btn-primary').click();
            cy.get('alert').should('have.text', data.rows[i].message);
          })
        }
      })     
     })
    })

