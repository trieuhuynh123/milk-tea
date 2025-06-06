import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Order, OrderStatus } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/order-detail.entity';

@Injectable()
export class OrderRepo {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,
  ) {}

  create(orderData: Partial<Order>): Order {
    return this.repo.create(orderData);
  }

  async save(order: Order): Promise<Order> {
    return this.repo.save(order);
  }

  async findOne(id: number): Promise<Order> {
    return this.repo.findOne({
      where: { id },
      relations: ['orderDetails', 'store', 'orderDetails.product', 'user'],
    });
  }

  async findAll(): Promise<Order[]> {
    return this.repo.find({ relations: ['orderDetails', 'user'] });
  }

  async findByUser(userId: number): Promise<Order[]> {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['orderDetails', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByStore(storeId: number): Promise<Order[]> {
    return this.repo.find({
      where: { store: { id: storeId } },
      relations: ['orderDetails', 'orderDetails.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateData: Partial<Order>): Promise<Order> {
    await this.repo.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async deleteAll(userId: number): Promise<void> {
    // await this.orderDetailRepo.delete({});
    await this.repo.delete({ user: { id: userId } });
  }

  async getOrdersBetweenDates(
    startDate: string,
    endDate: string,
  ): Promise<Order[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1); // cộng thêm 1 ngày
    return this.repo.find({
      where: {
        createdAt: Between(start, end),
        status: OrderStatus.DELIVERED, // chỉ lấy đơn đã giao
      },
    });
  }
  async getTop5ProductsBetweenDates(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1); // cộng thêm 1 ngày
    return this.orderDetailRepo
      .createQueryBuilder('orderDetail')
      .leftJoin('orderDetail.order', 'order')
      .leftJoin('orderDetail.product', 'product')
      .select('product.id', 'productId')
      .addSelect('product.name', 'productName')
      .addSelect('SUM(orderDetail.quantity)', 'totalQuantity')
      .where('order.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('order.status = :status', { status: 'delivered' })
      .groupBy('product.id')
      .addGroupBy('product.name')
      .orderBy('SUM(orderDetail.quantity)', 'DESC')
      .limit(5)
      .getRawMany();
  }
}
