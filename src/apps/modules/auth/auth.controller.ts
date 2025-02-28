import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res, UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDto, @Res() res: Response) {
    try {
      const { user, accessToken, refreshToken, createdTime, expiresIn } =
        await this.authService.authenticate(email, password);
      return {
        user: {
          id: user.id,
          email: user.email,
          access_token: accessToken,
          refresh_token: refreshToken,
          createdTime,
          expiresIn,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
    }
  }

  @Post('register')
  async register(
    @Body() { email, password }: RegisterDto,
    @Res() res: Response,
  ) {
    const { user, accessToken, refreshToken, createdTime, expiresIn } =
      await this.authService.create(email, password);
    return res.status(HttpStatus.OK).json({
      data: {
        id: user.id,
        email: user.email,
        access_token: accessToken,
        refresh_token: refreshToken,
        createdTime,
        expiresIn,
      },
      success: true,
      status: HttpStatus.OK,
      message: 'ok',
    });
  }
}
