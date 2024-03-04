import { TodoDatasourceImplementation } from './../../infrastructure/datasource/todo.datasource.impl';
import { CreateTodoDto } from './../../domain/dtos/todos/create-todo.dto';
//import { prisma } from '../../../prisma/data/postgres/index';
import { Request, Response } from "express"
import { UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

//DEFINIMOS AQUÍ EL PRISMA EXPORTADO



const todoDatasourceImplementation = new TodoDatasourceImplementation();
export class TodosController {
    constructor(
        private readonly todoRepository:TodoRepository
    ) {
    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    }

    public getTodoById = async(req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID is not a number` });

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    public createTodo = async (req: Request, res: Response) => {
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });
 
        try {
            const createdTodo = await this.todoRepository.create(createTodoDto);
            res.json(createdTodo);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    public updateTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body,id});
        try {
            const updatedTodo = this.todoRepository.updateById(updateTodoDto)
            res.json(updatedTodo);
        } catch (error) {
            res.status(400).json(error);
        }
    }


    public deleteTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        try {
            const deletedTodo = this.todoRepository.deleteById(id);
            res.json(deletedTodo);
        } catch (error) {
            res.json(error);
        }
    } 
}