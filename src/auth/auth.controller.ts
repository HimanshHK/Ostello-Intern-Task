import { Controller, Post,Body,HttpStatus,Res } from '@nestjs/common';
import { ApiTags,ApiResponse,ApiBody  } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/auth-dto';
import {Auth} from './auth.entity';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User Created' }) 
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateAuthDto }) 
  async createAuth(@Body() createAuthDto: CreateAuthDto, @Res() response): Promise<void> {
    try {
      const createdAuth: Auth = await this.authService.createUser(createAuthDto);
      response.status(HttpStatus.CREATED).json(createdAuth);
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  @Post('/login')
  @ApiResponse({ status: 201, description: 'User Created' }) 
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateAuthDto }) 
  async authenticateUser(@Body() createAuthDto: CreateAuthDto, @Res() response): Promise<void> {
    try {
      const authResult: Auth = await this.authService.validateUser(createAuthDto);
      response.status(HttpStatus.OK).json(authResult);
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

}
