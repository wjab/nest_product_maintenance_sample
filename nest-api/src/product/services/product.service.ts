import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateUpdateProductDTO, ProductDTO } from '../dto';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async getAllProducts() : Promise<ProductDTO[]>{
        const products = await this.productRepository.find()

        return products
    }

    async getProductById(id: number): Promise<ProductDTO | null> {
        const product = await this.productRepository.findOne({ where: { id: id } })
        return product
    }

    async postProduct(createProductDto: CreateUpdateProductDTO) :  Promise<ProductDTO> {
        const newProduct = this.productRepository.create(createProductDto)
        const product = await this.productRepository.save(newProduct)
        return product
    }

    async putProduct(id: number, updatedProduct: CreateUpdateProductDTO): Promise<ProductDTO | null> {
        /// OPTION #1
        // const product = this.productRepository.create(updatedProduct)
        // const result = await this.productRepository.update({id : id}, updatedProduct);

        // if(!result.affected){
        //     return null
        // }

        // return await this.getProductById(id)

        /// OPTION #2
        const storedProduct = await this.getProductById(id)

        if(!storedProduct)
        {
            return null
        }

        Object.assign(updatedProduct, storedProduct)
        const product = await this.productRepository.save(updatedProduct)

        return product
    }

    async deletProduct(id: number): Promise<boolean> {
        const result = await this.productRepository.delete( { id: id } )
        return !!result.affected
    }

}
