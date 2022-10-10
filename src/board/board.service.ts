import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.Model';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoard(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Not found board id : ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number) {
    const retult = await this.boardRepository.delete(id);
    if (retult.affected === 0) {
      throw new NotFoundException(`Not found board id : ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.boardRepository.save(board);
    return board;
  }
}

//   private boards: Board[] = [];
//   private sequence: number = 0;

//   getAllboards(): Board[] {
//     return this.boards;
//   }

//   getBoardById(id: string): Board {
//     const found = this.boards.find((boards) => boards.id === parseInt(id));

//     if (!found) {
//       throw new NotFoundException(`${id} 게시물이 없습니다.`);
//     }

//     return found;
//   }

//   createBoard(createBoardDto: CreateBoardDto): Board {
//     const { title, content } = createBoardDto;
//     this.sequence++;
//     const board: Board = {
//       id: this.sequence,
//       title,
//       content,
//       status: BoardStatus.PUBLIC,
//     };

//     this.boards.push(board);
//     return board;
//   }

//   deleteBoard(id: string) {
//     const found = this.getBoardById(id);

//     this.boards = this.boards.filter((board) => board.id !== found.id);
//   }

//   updateBoardStatus(id: string, boardStatus: BoardStatus): Board {
//     const board = this.getBoardById(id);
//     board.status = boardStatus;
//     return board;
//   }
//}
