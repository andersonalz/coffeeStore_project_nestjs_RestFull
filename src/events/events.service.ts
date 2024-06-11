import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity/event.entity';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: Repository<EventEntity>) {}

  findAll() {
    return this.eventRepository.find();
  }
}
