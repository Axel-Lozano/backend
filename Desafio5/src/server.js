import express from 'express';
import { __dirname } from './path.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import route from './routes/route.js'
import ProductManager from './manager/productManager.js';
const productManager = new ProductManager("./products.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use("/realtimeproducts", route)
app.use("/", route)


const httpServer = app.listen(8080, ()=>{
    console.log('🚀 Server listening on port 8080');
});

const socketServer = new Server(httpServer)
socketServer.on('connection', async (socket)=>{
    let arrayProducts = await productManager.getAllProducts()
    socket.emit('arrayProducts', arrayProducts); 
    socket.on('newProduct', async (obj) => {
        try {
            await productManager.createProduct(obj) 
            arrayProducts = await productManager.getAllProducts()
            socket.emit('arrayProducts', arrayProducts);
        } catch (error) {
            socket.emit('error', error.message);
        }
    })        
    socket.on('deleteProductById', async (id) => {
        await productManager.deleteProductById(id)
        arrayProducts = await productManager.getAllProducts()
        socket.emit('arrayProducts', arrayProducts);
    })
});