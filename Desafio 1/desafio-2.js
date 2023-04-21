const fs = require('fs')

class ProductManager {
    constructor(){
        this.path= "./productos.json";
        this.products= [];
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail,code, stock) => {
        try {

            ProductManager.id++

            const product ={
                id: ProductManager.id ,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        } catch (error) {
            console.log(error);
        }
    }

    getProducts= async() =>{
        try {
            const respuesta = await fs.promises.readFile(this.path, "utf-8");
            const respuestajs = JSON.parse(respuesta);
            console.log(respuestajs) ;
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            const respuesta2 = await fs.promises.readFile(this.path, "utf-8");
            const respuesta2js = JSON.parse(respuesta2);
            if(!respuesta2js.find((product) => product.id === id)){
                console.log("producto no encontrado"); 
            }else{
                const productId = (respuesta2js.find((product) => product.id === id));
                console.log(productId);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductById = async(id) =>{
        try {
            const respuesta3 = await fs.promises.readFile(this.path, "utf-8");
            const respuesta3js = JSON.parse(respuesta3);
            const productFilter = respuesta3js.filter((product) => product.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(productFilter));
            console.log("producto eliminado")
        } catch (error) {
            console.log(error);
        }
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductById(id);
        const productOld = await fs.promises.readFile(this.path, "utf-8");
        const productOldjs = JSON.parse(productOld);
        const productModif =[{ id, ...producto}, productOldjs]
        await fs.promises.writeFile(this.path, JSON.stringify(productModif));
    }
}

const productos = new ProductManager()

/*productos.addProduct("titulo1","descripcion1", 1000 , "imagen1", "abc123", 4)
productos.addProduct("titulo2","descripcion2", 1250 , "imagen2", "abc1234", 8)
productos.addProduct("titulo3","descripcion3", 1500 , "imagen3", "abc1235", 3)*/

//productos.getProducts()
//productos.getProductById(1)
//productos.deleteProductById(3)
productos.updateProducts({
    id: 2,
    title: 'titulo2',
    description: 'descripcion2',
    price: 1500,
    thumbnail: 'imagen2',
    code: 'abc1234',
    stock: 8
})




