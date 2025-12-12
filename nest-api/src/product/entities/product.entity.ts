import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 50, unique: true})
    code: string

    @Column({type: 'varchar', length: 255})
    description: string

    @Column({type: 'decimal', precision: 10, scale:2})
    price: number

    @Column({type: 'varchar', length: 255, default: null})
    imageUrl: string

}