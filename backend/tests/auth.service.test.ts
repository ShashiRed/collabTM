import { registerUser } from "../src/services/auth.service";
import prisma from "../src/utils/prisma";

describe("Auth Service", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a new user", async () => {
    const user = await registerUser(
      "Test User",
      `test${Date.now()}@example.com`,
      "password123"
    );

    expect(user.user.email).toContain("test");
  });

  it("should not allow duplicate emails", async () => {
    const email = `duplicate${Date.now()}@example.com`;
    await registerUser("Test", email, "password123");
    
    await expect(
      registerUser("Test", email, "password123")
    ).rejects.toThrow();
  });
});
