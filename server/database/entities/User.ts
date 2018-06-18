import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

//must specify entity name to work with minify correctly.
@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
