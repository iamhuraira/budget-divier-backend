import { UsersService } from './user.service';
import { UserSearch } from './schemas/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    searchUsers(query: string): Promise<UserSearch[]>;
}
