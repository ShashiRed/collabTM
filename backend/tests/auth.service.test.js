"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../src/services/auth.service");
const prisma_1 = __importDefault(require("../src/utils/prisma"));
describe("Auth Service", () => {
    afterAll(async () => {
        await prisma_1.default.$disconnect();
    });
    it("should create a new user", async () => {
        const user = await (0, auth_service_1.registerUser)("Test User", `test${Date.now()}@example.com`, "password123");
        expect(user.user.email).toContain("test");
    });
    it("should not allow duplicate emails", async () => {
        const email = `duplicate${Date.now()}@example.com`;
        await (0, auth_service_1.registerUser)("Test", email, "password123");
        await expect((0, auth_service_1.registerUser)("Test", email, "password123")).rejects.toThrow();
    });
});
