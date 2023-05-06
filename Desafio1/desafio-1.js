class ProductManager{
    constructor() {
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son requeridos");
        } else{
            const duplicateCode = this.products.find((product) => product.code === code);
            if (duplicateCode) {
                console.log(`El codigo ${code} ya existe`);
            } else{
                const product ={
                    id: this.#nuevoId() + 1,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
                this.products.push(product)
            }
        }
    }

    #nuevoId(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id;
        })
        return maxId
    }

    element(id){
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id){
        !this.element(id) ? console.log("not found") : console.log(this.element(id));
    }

}

const productos = new ProductManager()

console.log(productos.getProducts());


productos.addProduct("titulo1","descripcion1", 1000 , "imagen1", "abc123", 4)
productos.addProduct("titulo2","descripcion2", 1250 , "imagen2", "abc1234", 8)
productos.addProduct("titulo3","descripcion3", 1500 , "imagen3", "abc1234", 3)
productos.addProduct("titulo4","descripcion4", 1750 , "imagen4", "abc12345" )


console.log(productos.getProducts())

productos.getProductById(3)
productos.getProductById(2)



