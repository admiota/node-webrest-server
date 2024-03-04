import { PrismaClient} from "@prisma/client";
import { CreateTodoDto } from './../../domain/dtos/todos/create-todo.dto';
//import { prisma } from '../../../prisma/data/postgres/index';
import { Request, Response } from "express"
import { UpdateTodoDto } from '../../domain/dtos';

//DEFINIMOS AQUÍ EL PRISMA EXPORTADO
const prismaExportado = new PrismaClient();


export class TodosController {
    public getTodos = async (req: Request, res: Response) => {
        
        const todos = await prismaExportado.todo.findMany();
        res.json(todos); 
    }

    public getTodoById = async(req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID is not a number` });

        const todo = await prismaExportado.todo.findFirst({ where: { id: id } });
        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id: ${id} not found.` });
    }

    public createTodo = async (req: Request, res: Response) => {
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });
 
        const todo = await prismaExportado.todo.create({data: createTodoDto!});

        res.json(todo);
    }

    public updateTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body,id});
        if (error) return res.status(400).json(error);
        
        const todo = await prismaExportado.todo.findFirst({where: { id: id }});
        if (!todo) return res.status(404).json({ error: `Todo with id: ${id} not found` });

        const updatedTodo = await prismaExportado.todo.update(
            {
                where: { id: id },
                data: updateTodoDto!.values
            }
        );
        res.json(updatedTodo);
    }


    public deleteTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = await prismaExportado.todo.findFirst({where: { id: id }});
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        const deletedTodo = await prismaExportado.todo.delete({ where: { id: id } });

        (deletedTodo)
            ? res.json(deletedTodo)
            : res.json({ error: `Todo with id ${id} not found` });
    } 
}