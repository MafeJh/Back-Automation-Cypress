// (GET, POST, PUT, DELETE) y todas las aserciones posibles.
const generateRandomEmail = require("../support/emailGenerator");
import data from "../fixtures/data-user";
import schema from "../fixtures/schema";

const email = generateRandomEmail();
const newEmail = generateRandomEmail();

describe("Request Demo", () => {
  it("Get list of users", () => {
    cy.request("GET", "https://gorest.co.in/public/v2/users").as("getUsers");

    cy.get("@getUsers").should((response) => {
      let id = response.body[0].id;
      console.log(response.body);
      expect(response.status).to.equal(200);
      expect(response.body[0]).to.have.property("id");

      expect(response.body[0].id).to.equals(id);
      //expect(response.body[0].name).to.equals('Sen. Kamalesh Ahuja')
    });
  });

  it("Create a new user", function () {
    cy.request("GET", "https://gorest.co.in/public/v2/users").as("getUsers");
    cy.get("@getUsers").then((response) => {
      let id = response.body[0].id;
      //cy.fixture('data-user').as('data');

      // Define el token de autorización
      const token =
        "f97d35c493841a18a49af229cc9deaf5bfecd9ab00db81e4d16fa887dc197a5e";

      // Realiza la solicitud con el token de autorización
      cy.request({
        method: "POST",
        url: "https://gorest.co.in/public/v2/users",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          id: id,
          name: "Odin",
          email: newEmail,
          gender: "male",
          status: "active",
        },
      }).as("user");

      // Realiza las afirmaciones después de recibir la respuesta
      cy.get("@user").should((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        const requestKeys = Object.keys(response.body);
        console.log(`Llaves del cuerpo del schema: ${requestKeys}`);

        // Extrae las claves del esquema (SCHEMA)
        const schemaKeys = Object.keys(schema);
        console.log(`Llaves del cuerpo del schema: ${schemaKeys}`);

        // Compara las claves de la solicitud con las del esquema
        expect(requestKeys).to.deep.equal(schemaKeys);

        // Imprime el cuerpo de la respuesta
        console.log(JSON.stringify(response.body));
      });
    });
  });

  it("Update an user by id", function () {
    cy.request("GET", "https://gorest.co.in/public/v2/users").as("getUsers");
    cy.get("@getUsers").then((response) => {
      let id = response.body[0].id;
      const token =
        "f97d35c493841a18a49af229cc9deaf5bfecd9ab00db81e4d16fa887dc197a5e";

      cy.request({
        method: "PUT",
        url: `https://gorest.co.in/public/v2/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: "Odin Jiménez",
          email: email,
          gender: "male",
          status: "active",
        },
      }).as("user");

      // Realiza las afirmaciones después de recibir la respuesta
      cy.get("@user").should((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal("Odin Jiménez");
      });
    });
  });

  it("Delete an user by id", function () {
    cy.request("GET", "https://gorest.co.in/public/v2/users").as("getUsers");
    cy.get("@getUsers").then((response) => {
      let id = response.body[0].id;
      const token =
        "f97d35c493841a18a49af229cc9deaf5bfecd9ab00db81e4d16fa887dc197a5e";

      cy.request({
        method: "DELETE",
        url: `https://gorest.co.in/public/v2/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).as("user");

      cy.get("@user").should((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });
});
