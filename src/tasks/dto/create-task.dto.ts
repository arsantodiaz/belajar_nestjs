import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Judul tidak boleh kosong' })
  title: string;

  @IsNotEmpty({ message: 'Description tidak boleh kosong' })
  description: string;
}
