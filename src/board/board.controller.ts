import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.Model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/board.status.validation.pipe';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // @Get()
  // getAllBoard():Board[]{
  //     return this.boardService.getAllboards();
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id')id:string){
  //     this.boardService.deleteBoard(id);
  // }

  // @Patch(':id')
  // updateBoardStatus(@Param('id')id:string, @Body('boardStatus', BoardStatusValidationPipe) boardStatus:BoardStatus){
  //     return this.boardService.updateBoardStatus(id, boardStatus);
  // }
}
