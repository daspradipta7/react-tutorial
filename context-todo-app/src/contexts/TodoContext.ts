import { createContext, useContext } from "react";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export interface TodoContextType {
    todos: Todo[];
    addTodo?: (object: Todo) => void;
    updateTodo?: (id: string, updatedTodo: Partial<Todo>) => void;
    deleteTodo?: (id: string) => void;
    toggleComplete?: (id: string) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
    const context = useContext(TodoContext);
  
    // Good practice: Throw an error if the hook is used outside its Provider
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
  
    return context;
}

export const TodoProvider = TodoContext.Provider