import { UpdateTodoDto } from './../dtos/todos/update-todo.dto';
import { CreateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository{
    abstract create(createTodoDto: CreateTodoDto | undefined): Promise<TodoEntity>;
    //todo: Tenemos que añadir paginación
    abstract getAll(): Promise<TodoEntity[]>;
    
    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(updateTodoDto:UpdateTodoDto|undefined): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>;
}