import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
@ObjectType()
export class UserDocument extends AbstractDocument {
  @Prop()
  @Field()
  email: string;
  
  @Prop()
  @Field()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
