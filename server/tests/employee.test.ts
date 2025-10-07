import request from "supertest";
import app from "../src/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Employee API Endpoints", () => {
  let createdEmployeeId: number;

  // Clean up database before tests
  beforeAll(async () => {
    await prisma.employee.deleteMany({});
  });

  // Clean up after tests
  afterAll(async () => {
    await prisma.employee.deleteMany({});
    await prisma.$disconnect();
  });

  describe("POST /api/employees", () => {
    it("should create a new employee", async () => {
      const newEmployee = {
        name: "John Doe",
        email: "john.doe@example.com",
        position: "Software Engineer",
      };

      const response = await request(app)
        .post("/api/employees")
        .send(newEmployee)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.name).toBe(newEmployee.name);
      expect(response.body.data.email).toBe(newEmployee.email);
      expect(response.body.data.position).toBe(newEmployee.position);

      createdEmployeeId = response.body.data.id;
    });

    it("should return 400 for duplicate email", async () => {
      const duplicateEmployee = {
        name: "Jane Doe",
        email: "john.doe@example.com",
        position: "Product Manager",
      };

      const response = await request(app)
        .post("/api/employees")
        .send(duplicateEmployee)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Email already exists");
    });

    it("should return 400 for invalid email", async () => {
      const invalidEmployee = {
        name: "Invalid User",
        email: "invalid-email",
        position: "Designer",
      };

      const response = await request(app)
        .post("/api/employees")
        .send(invalidEmployee)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation error");
    });

    it("should return 400 for missing required fields", async () => {
      const incompleteEmployee = {
        name: "Incomplete User",
      };

      const response = await request(app)
        .post("/api/employees")
        .send(incompleteEmployee)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/employees", () => {
    it("should get all employees", async () => {
      const response = await request(app).get("/api/employees").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.count).toBeGreaterThan(0);
    });

    it("should search employees by name", async () => {
      const response = await request(app)
        .get("/api/employees?search=John")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].name).toContain("John");
    });
  });

  describe("GET /api/employees/:id", () => {
    it("should get employee by id", async () => {
      const response = await request(app)
        .get(`/api/employees/${createdEmployeeId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(createdEmployeeId);
    });

    it("should return 404 for non-existent employee", async () => {
      const response = await request(app)
        .get("/api/employees/99999")
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Employee not found");
    });
  });

  describe("PUT /api/employees/:id", () => {
    it("should update employee", async () => {
      const updatedData = {
        name: "John Updated",
        position: "Senior Software Engineer",
      };

      const response = await request(app)
        .put(`/api/employees/${createdEmployeeId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updatedData.name);
      expect(response.body.data.position).toBe(updatedData.position);
    });

    it("should return 404 for updating non-existent employee", async () => {
      const response = await request(app)
        .put("/api/employees/99999")
        .send({ name: "Test" })
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/employees/:id", () => {
    it("should delete employee", async () => {
      const response = await request(app)
        .delete(`/api/employees/${createdEmployeeId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Employee deleted successfully");
    });

    it("should return 404 for deleting non-existent employee", async () => {
      const response = await request(app)
        .delete("/api/employees/99999")
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe("Health Check", () => {
    it("should return server status", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body.status).toBe("OK");
    });
  });
});
