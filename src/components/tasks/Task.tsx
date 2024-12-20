import { tasksTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { EditTask } from "./EditTask";
import { DeleteBtn } from "../lists/DeleteBtn";
// import { Checkbox } from "./Checkbox";

type TaskProps = {
  task: {
    name: string;
    userId: string;
    listId: string;
    description: string | null;
    createdOn: Date | null;
    lastUpdated: Date | null;
    taskId: string;
  };
};

export function Task({ task }: TaskProps) {
  async function updateTask(title: string) {
    "use server";
    await db
      .update(tasksTable)
      .set({ name: title })
      .where(eq(tasksTable.taskId, task.taskId));
    revalidatePath("/dashboard/lists");
  }
  async function deleteTask() {
    "use server";
    await db.delete(tasksTable).where(eq(tasksTable.taskId, task.taskId));
    revalidatePath("/dashboard/lists");
  }
  // async function completeTask(value: boolean) {
  //   "use server";
  //   await db
  //     .update(tasksTable)
  //     .set({ completed: value })
  //     .where(eq(tasksTable.taskId, task.taskId));
  //   revalidatePath("/dashboard/lists");
  // }
  return (
    <li className="flex justify-between">
      <EditTask name={task.name} updateTask={updateTask} />
      <DeleteBtn
        deleteFn={deleteTask}
        confirmationTxt="Are you sure you want to delete this task?"
        modalTitle="Delete Task"
      />
      {/* <Checkbox checked={checked} onChange={completeTask} /> */}
    </li>
  );
}
