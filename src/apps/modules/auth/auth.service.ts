import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/apps/models/user.model';
import { JWTService } from 'src/core/modules/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private user: typeof User,
    private jwtService: JWTService,
    private configServce: ConfigService
  ) {}

  async findOne(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.user.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: User;
    createdTime: number;
    expiresIn: string | undefined;
  }> {
    const user = await this.user.create({ email, password });
    const payload = { sub: user.id, email: user.email };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.configServce.get<string>('jwt.ttl'),
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
      createdTime: Math.floor(new Date().getTime() / 1000),
      expiresIn: this.configServce.get<string>('jwt.ttl'),
    };
  }
}
