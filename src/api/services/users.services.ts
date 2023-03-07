import db from "@/db/models"
import { User } from "@/interfaces/user.interface";

class UserService {
    public users = db.Users;

    public async findAllUser(): Promise<User[]> {
        const allUser: User[] = await this.users.findAll();
        return allUser
    }
}

export default UserService;