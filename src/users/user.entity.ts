import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email :string;

    @Column()
    password:string


    @AfterInsert()
    logInsert(){ 
        console.log("when user insert ", this.id)
   }
    @AfterRemove()
    logRemove(){
        console.log("when user removed ", this.id)
   }
    @AfterUpdate()
    logUpdate(){
        console.log("when user updated ", this.id)
   }
}

 