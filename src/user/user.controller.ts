import { Controller, Get, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UsersService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserSearch } from './schemas/user.schema'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Search User On User Name' })
  @ApiCreatedResponse({
    description: 'Search User Successfully',
  })
  @Get('search')
  async searchUsers(@Query('query') query: string): Promise<UserSearch[]> {
    return this.userService.searchUsers(query)
  }

  /* @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  } */
}
