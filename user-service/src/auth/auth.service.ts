import { Injectable } from '@nestjs/common';
import { JWTPayload } from './dto/jwt.payload';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(
    key: string,
    pass: string,
  ): Promise<User | null> {
    const user = await this.usersService.user({
      email: key,
    });
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JWTPayload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
