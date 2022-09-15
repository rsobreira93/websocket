import { ObjectId } from "mongoose";
import { injectable } from "tsyringe";
import { ChatRoom } from "../schemas/ChatRoom";

@injectable()
export class GetChatRoomByUsersService {
  async execute(idUsers: ObjectId[]) {
    const rom = await ChatRoom.findOne({
      idUsers: {
        $all: idUsers,
      },
    }).exec();

    return rom;
  }
}
