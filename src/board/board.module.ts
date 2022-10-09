import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
