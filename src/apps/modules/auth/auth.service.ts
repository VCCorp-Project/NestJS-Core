import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/apps/models/user.model';
import { JWTService } from 'src/core/modules/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private user: typeof User,
    private jwtService: JWTService,
    private configServce: ConfigService,
  ) {}

  async authenticate(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
    createdTime: number;
    expiresIn: string | undefined;
  }> {
    const user = await this.user.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    // Create model instance from json data of user, to use method inside model class
    // instead of get model in sequelize
    const userModel = this.user.build(user?.toJSON());
    const check = await userModel.compare(password);
    if (!check) {
      throw new NotFoundException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configServce.get<string>('jwt.ttl'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configServce.get<string>('jwt.refresh_ttl'),
      }),
      createdTime: Math.floor(new Date().getTime() / 1000),
      expiresIn: this.configServce.get<string>('jwt.ttl'),
    };
  }

  async create(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
    createdTime: number;
    expiresIn: string | undefined;
  }> {
    const user = await this.user.create({ email, password });
    if (!user) {
      throw new BadRequestException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configServce.get<string>('jwt.ttl'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configServce.get<string>('jwt.refresh_ttl'),
      }),
      createdTime: Math.floor(new Date().getTime() / 1000),
      expiresIn: this.configServce.get<string>('jwt.ttl'),
    };
  }
}
