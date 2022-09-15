import { injectable } from "tsyringe";
import { User } from "../schemas/User";

interface CreateUserDTO {
  email: string;
  socket_id: string;
  avatar: string;
  name: string;
}

@injectable()
export class CreateUserService {
  async execute({ avatar, name, email, socket_id }: CreateUserDTO) {
    const userAlreadyExists = await User.findOne({ email }).exec();

    if (userAlreadyExists) {
      const user = await User.findOneAndUpdate(
        {
          _id: userAlreadyExists._id,
        },
        {
          $set: { socket_id, avatar, name },
        },
        {
          new: true,
        }
      );

      return user;
    } else {
      const user = await User.create({
        name: name,
        email: email,
        socket_id: socket_id,
        avatar: avatar,
      });

      return user;
    }
  }
}
