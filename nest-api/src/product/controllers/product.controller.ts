import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateUpdateProductDTO } from '../dto';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){ }

    @Get()
    async getAllProducts(){
        const products = await this.productService.getAllProducts()
        return products
    }

    @Get(':id')
    async getProductById(@Param() params){
        const id = params.id
        const product = await this.productService.getProductById(id)

        if(!product){
            throw new NotFoundException('Producto not found.')
        }

        return product
    }

    @Post()
    async createProduct(@Body() createProduct: CreateUpdateProductDTO) {
        try
        {
            const newProduct = await this.productService.postProduct(createProduct)
            return newProduct
        }
        catch(ex)
        {
            throw new InternalServerErrorException(ex.message)
        }        
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id){
        const result = await this.productService.deletProduct(id)

        return result
    }
}
