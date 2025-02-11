import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    await this.authService.findOne(email, password);
  }

  @Post('register')
  async register(
    @Body() { email, password }: RegisterDto,
    @Res() res: Response,
  ) {
    const { user, access_token, refresh_token, createdTime, expiresIn } =
      await this.authService.create(email, password);
    return res.status(HttpStatus.OK).json({
      data: {
        id: user.id,
        email: user.email,
        access_token,
        refresh_token,
        createdTime,
        expiresIn,
      },
      success: true,
      status: HttpStatus.OK,
      message: 'ok',
    });
  }
}
