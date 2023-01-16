export interface ITask {
    id: string;
    name: string;
    priority: 'urgent' | 'regular' | 'trivial';
}

export type TodoContextType = {
    list: ITask[];
    createTask: (task: ITask) => void;
    readTask: (id: string) => ITask;
    updateTask: (task: ITask) => void;
    deleteTask: (id: string) => boolean;
};