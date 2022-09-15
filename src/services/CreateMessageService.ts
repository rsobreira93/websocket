import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";

interface CreateMessageDTO {
  to: string;
  text: string;
  roomId: string;
}

@injectable()
export class CreateMessageService {
  async execute({ roomId, text, to }: CreateMessageDTO) {
    const message = await Message.create({
      to,
      text,
      roomId,
    });

    return message;
  }
}
