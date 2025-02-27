import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  orderBy: {
    id: 'DESC',
  },
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatarUrl: string;

  @Column()
  clientId: string;
}
