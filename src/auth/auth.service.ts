import { Injectable, InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/auth-dto';
import {Auth} from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}


  async createUser(createAuthDto: CreateAuthDto): Promise<Auth> {
    try {
      const { email,password } = createAuthDto;
      const auth = this.authRepository.create({
        email,
        password
      });
      return await this.authRepository.save(auth);
    } catch (error) {
      throw new InternalServerErrorException('Error creating New User.');
    }
  }

  async validateUser(createAuthDto: CreateAuthDto): Promise<Auth> {
    try {
      const { email,password } = createAuthDto;
      const cart = await this.authRepository.findOne(
        {
          where: { email: email,password:password }, 
        }
      );
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        else{
            return cart;
        }
    } catch (error) {
      throw new InternalServerErrorException('No such user exist.');
    }
  }


}
