import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.Model';
import { CreateBoardDto } from './dto/createBoard.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(
      Board,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, content } = createBoardDto;

    const board = this.create({
      title,
      content,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
