const request = require('supertest');
const url = "http://localhost:3000";

describe("Test all my routes", () => {
    let id;

    // TEST FOR POST
    test('should insert a doc into collection', async () => {
        const payload = {
            username: "String",
            password: "String",
            firstName: "String",
            lastName: "String",
            email: "String",
            phone: "String",
            address: "String",
            birthdate: "String"
        };

        const res = await request(url).post("/customer").send(payload).expect(201);

        // Add console.log to debug the response and payload
        console.log("Response from POST request:", res.status, res.body);
        id = res.body.id; // Make sure to access the correct property

        console.log("Generated ID:", id);
    });

    // GET ALL TESTS
    test("Should get all customers from the collection", async () => {
        const res = await request(url).get("/customer").expect(200);

        // Add console.log to debug the response
        console.log("Response from GET all request:", res.status, res.body);
    });

    // GET SINGLE TEST
    test("Should get a customer from the collection", async () => {
        // Replace 'id' with the actual ID you want to retrieve
        const customerId = id; // Use the 'id' you obtained from the POST request

        const res = await request(url).get(`/customer/${customerId}`).expect(200);

        // Add console.log to debug the response
        console.log("Response from GET single request:", res.status, res.body);
    });

    // DELETE
    test("Should remove a doc from the collection", async () => {
        console.log("Deleting document with ID:", id);

        const res = await request(url).delete("/customer/" + id).expect(204);

        // Add console.log to verify that the delete request was successful
        console.log("Response from DELETE request:", res.status, res.body);
    });
});
