import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule,MailModule,MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
    }]),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    GoogleStrategy,
    MailService
    ]
})
export class AuthModule {}
