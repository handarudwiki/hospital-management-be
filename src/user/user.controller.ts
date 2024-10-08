import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get_user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import toResponse from 'src/helpers/response';
import { toUserResponse } from './response/user.response';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtGuard)
  async me(@GetUser() user: any) {
    return toResponse('get current user successfully', toUserResponse(user));
  }
}
