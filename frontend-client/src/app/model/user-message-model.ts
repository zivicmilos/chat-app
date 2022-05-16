import { User } from "./user-model";

export class UserMessage {
    constructor(
        public receiver: User,
        public sender: User,
        public date: Date,
        public subject: String,
        public content: String
    ) {}
  }