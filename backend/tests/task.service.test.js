"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../src/services/task.service");
const prisma_1 = __importDefault(require("../src/utils/prisma"));
let userId;
let taskId;
describe("Task Service", () => {
    beforeAll(async () => {
        const user = await prisma_1.default.user.create({
            data: {
                name: "Task User",
                email: `taskuser${Date.now()}@example.com`,
                password: "hashed",
            },
        });
        userId = user.id;
    });
    it("should create a task", async () => {
        const task = await (0, task_service_1.createTask)(userId, {
            title: "Test Task",
            description: "Test",
            dueDate: new Date().toISOString(),
            priority: "LOW",
            status: "TODO",
            assignedToId: userId,
        });
        taskId = task.id;
        expect(task.title).toBe("Test Task");
    });
    it("should not allow non-creator to delete task", async () => {
        await expect((0, task_service_1.deleteTask)(taskId, "random-id")).rejects.toThrow();
    });
    afterAll(async () => {
        await prisma_1.default.$disconnect();
    });
});
