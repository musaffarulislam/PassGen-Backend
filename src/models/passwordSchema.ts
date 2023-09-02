import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISavedPassword extends Document {
  appName: string;
  userName: string;
  password: string;
}

export interface IPassword extends Document {
  userId: Types.ObjectId;
  savedPassword: ISavedPassword[];
}

const savedPasswordSchema: Schema<ISavedPassword> = new Schema({
  appName: String,
  userName: String,
  password: String,
});

const passwordSchema: Schema<IPassword> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  savedPassword: [savedPasswordSchema],
});

export default mongoose.model<IPassword>("Password", passwordSchema);
