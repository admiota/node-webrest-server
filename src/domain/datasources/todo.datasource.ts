import { UpdateTodoDto } from './../dtos/todos/update-todo.dto';
import { CreateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource{
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    //todo: Tenemos que añadir paginación
    abstract getAll(): Promise<TodoEntity[]>;
    
    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(updateTodoDto:UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(id: number): Promise<TodoEntity>;
}