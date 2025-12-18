import { createTask, deleteTask } from "../src/services/task.service";
import prisma from "../src/utils/prisma";

let userId: string;
let taskId: string;

describe("Task Service", () => {
  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        name: "Task User",
        email: `taskuser${Date.now()}@example.com`,
        password: "hashed",
      },
    });
    userId = user.id;
  });

  it("should create a task", async () => {
    const task = await createTask(userId, {
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
    await expect(deleteTask(taskId, "random-id")).rejects.toThrow();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
