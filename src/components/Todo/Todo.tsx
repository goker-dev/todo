import React from "react";
import {TodoProvider} from "./TodoContext";
import {TaskForm} from "./TaskForm/TaskForm";
import {TaskList} from "./TaskList/TaskList";

export const Todo = () => <div data-testid="todo">
    <TodoProvider>
        <TaskForm/>
        <TaskList/>
    </TodoProvider>
</div>