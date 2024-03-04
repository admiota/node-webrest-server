import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";
import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export class TodoDatasourceImplementation implements TodoDatasource{
    async create(createTodoDto: CreateTodoDto | undefined): Promise<TodoEntity> {
        const createdTodo = await prisma.todo.create({ data: createTodoDto! });
        return TodoEntity.fromObject({ createdTodo });
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map((todo) => TodoEntity.fromObject(todo));
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({ where: { id: id } });
        return TodoEntity.fromObject({todo});
    }

    async updateById(updateTodoDto: UpdateTodoDto | undefined): Promise<TodoEntity> {
        const updatedTodo = await prisma.todo.update(
            {
                where: { id: updateTodoDto?.id },
                data: updateTodoDto!.values
            }
        );
        return TodoEntity.fromObject({updatedTodo});
    }

    async deleteById(id: number): Promise<TodoEntity> {
        const deletedTodo = await prisma.todo.findFirst({ where: { id: id } });
        return TodoEntity.fromObject({deletedTodo});
    }
}