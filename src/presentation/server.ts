import express, { Router } from 'express';
import path from 'path';
import { AppRoutes } from './routes';

interface Options{
    port: number,
    public_path: string
}

export class Server{
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    constructor(options: Options) {
        const { port,public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
    }

    async start() {
        //* MIDDLEWARES
        this.app.use(express.json());

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        //this.app.get('/ruta',(req,res)=>{})
        this.app.use(AppRoutes.routes);

        //* SPA
        this.app.get('*', (req, res) => {
            const pathIndex = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(pathIndex);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}