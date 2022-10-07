import { Injectable, NotFoundException } from '@nestjs/common';
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
         const found = this.boards.find(boards => boards.id=== parseInt(id));
        
         if(!found) {
            throw new NotFoundException(`${id} 게시물이 없습니다.`);
         }

         return found;
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

    deleteBoard(id:string){
        const found = this.getBoardById(id);
        
        this.boards = this.boards.filter( board => board.id !== found.id);
    }

    updateBoardStatus(id:string, boardStatus:BoardStatus):Board{
        const board = this.getBoardById(id);
        board.status = boardStatus;
        return board;
    }
}
