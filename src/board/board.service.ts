import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.Model';
import { CreateBoardDto } from './dto/createBoard.dto';

@Injectable()
export class BoardService {

    private boards:Board[] = [];
    private sequence:number = 0;

    getAllboards():Board[]{
        return this.boards;
    }

    getBoardById(id:string):Board{
        return this.boards.find(boards=> boards.id=== parseInt(id));
    }

    createBoard(createBoardDto:CreateBoardDto):Board{
        const {title, content} = createBoardDto;
        this.sequence++;
        const board :Board= {
            id:this.sequence,
            title,
            content,
            status:BoardStatus.PUBLIC,
        };

        this.boards.push(board);
        return board;
    }
}
