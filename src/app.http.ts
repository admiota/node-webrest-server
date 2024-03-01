import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    
    /*res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>URL: ${req.url}</h1>`);
    res.end();*/
    
    /*const data = { name: 'John doe', age: 30, city: 'New York' };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));*/
    
    console.log(req.url);
    if (req.url === '/') {
        const indexHtml = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexHtml);
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }else if(req.url?.endsWith('.css')){
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
});

server.listen(8080, () => {
    
});