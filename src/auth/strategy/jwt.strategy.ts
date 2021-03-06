import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy , 'jwt'){

    constructor(
        private readonly configService : ConfigService,
        private readonly prismaService : PrismaService
    ) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get('JWT_SECRET_KEY')
        });
    }
    async validate(payload : any){
        const {sub} = payload;
        const user = this.prismaService.user.findUnique({
            where:{id:sub}
        });
        return user;
    }
}