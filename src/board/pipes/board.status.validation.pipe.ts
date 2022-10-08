import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.Model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly boardOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: string, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.boardOption.indexOf(status);
    return index !== -1;
  }
}
