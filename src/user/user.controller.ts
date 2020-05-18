import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async createUser(@Body() userObj: User): Promise<User> {
        return this.userService.create(userObj);
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }
}
