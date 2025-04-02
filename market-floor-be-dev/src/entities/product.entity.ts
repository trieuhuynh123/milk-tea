import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { StoreProduct } from './store-product.entity';
import { Comment } from './comment.entity';
import { OrderDetail } from './order-detail.entity';

export interface IProductPrice {
  price: number;
  displayPrice: string;
  salePrice?: number;
  displaySalePrice?: string;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  upc: string;

  @Column()
  name: string;

  //price
  @Column({ type: 'jsonb' })
  price: IProductPrice;

  @Column({ default: false })
  isOnSale: boolean;

  @Column()
  fullDescription: string;

  @Column({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  nutritionInformations: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column({ type: 'jsonb', nullable: true })
  properties: { [key: string]: string | number | boolean };

  @Column({ type: 'jsonb', nullable: true })
  images: string[];

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: 0, name: 'buy_count' })
  buyCount: number;

  @OneToMany(() => StoreProduct, (storeProduct) => storeProduct.product)
  storeProducts: StoreProduct[];

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  @Column({ nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];
}
