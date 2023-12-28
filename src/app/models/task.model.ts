export interface Task {
  id: string;
  title: string;
  completed: boolean;
}
// create a partial type of Task
export type UpdateTask = Partial<Task>;
