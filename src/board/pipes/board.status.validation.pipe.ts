import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.Model";

export class BoardStatusValidationPipe implements PipeTransform{

    boardOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        return value;
    }

}