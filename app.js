const http = require('http');
const hostname = 'localhost';
const port = 3000;

/**callback de una funcion: '=> {}' se usan para
 * escribir codigo asíncronico,
 */
const server = http.createServer((req, res) => {
	//res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hola Mundo\n');
});

server.listen(port, () => {
	console.log(`Servidor corriendo en: http://localhost:${port}/`);
});
