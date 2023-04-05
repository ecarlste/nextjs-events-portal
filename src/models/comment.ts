import { ObjectId } from 'mongodb';

export default interface Comment {
  _id?: ObjectId;
  email: string;
  name: string;
  text: string;
  eventId: string;
}
