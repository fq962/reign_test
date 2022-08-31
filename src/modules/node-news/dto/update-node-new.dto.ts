import { PartialType } from '@nestjs/mapped-types';
import { CreateNodeNewDto } from './create-node-new.dto';

export class UpdateNodeNewDto extends PartialType(CreateNodeNewDto) {}
