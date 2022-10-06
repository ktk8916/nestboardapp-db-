import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.Model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoard.dto';

@Controller('board')
export class BoardController {

    constructor(private boardService:BoardService){}

    @Get()
    getAllBoard():Board[]{
        return this.boardService.getAllboards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id:string):Board{
        return this.boardService.getBoardById(id);
    }

    @Post()
    createBoard(
        @Body()createBoardDto:CreateBoardDto):Board{
        return this.boardService.createBoard(createBoardDto);
    }
}
