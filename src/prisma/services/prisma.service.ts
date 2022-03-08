import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(configService : ConfigService) {
        super({
            datasources:{
                db:{
                    url:configService.get('DATABASE_URL')
                }
            },
            // log:['query', 'info', 'warn', 'error'],
        })
    }

    cleanDB(){
        this.product.deleteMany();
        this.user.deleteMany();
    }
}
