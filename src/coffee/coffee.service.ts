// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Coffee } from './entities/coffee.entity';
// import { CreateCoffeeDto } from './dto/create-coffee.dto';
// import { UpdateCoffeeDto } from './dto/update-coffee.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// @Injectable()
// export class CoffeeService {
//   constructor(
//     @InjectRepository(Coffee)
//     private readonly coffeeRepository: Repository<Coffee>;
//   ) {}
//   private coffee: Coffee[] = [];

//   findAll() {
//     return this.coffee;
//   }

//   findOne(id: number) {
//     const coffee = this.coffee.find((ele) => ele.id === id);
//     if (!coffee) {
//       throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
//     }
//     return coffee;
//   }

//   create(data: CreateCoffeeDto) {
//     this.coffee.push(data);
//     return data;
//   }

//   update(id: number, data: UpdateCoffeeDto) {
//     const coffee = this.coffee[id];
//     const keys = Object.keys(data);
//     for (let i = 0; i < keys.length; i++) {
//       const key = keys[i];
//       coffee[key] = data[key];
//     }
//     return coffee;
//   }

//   delete(id: number) {
//     const coffeeIndex = this.coffee.findIndex((ele) => ele.id === id);
//     this.coffee.splice(coffeeIndex, 1);
//   }
// }

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
// import { CreateFlavorDto } from './dto/create-flavor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';
// import { CoffeeBrand } from './coffee.constant';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly configService: ConfigService,
    @Inject(coffeeConfig.KEY)
    private readonly coffeeConfiguration: ConfigType<typeof coffeeConfig> //this syntax is safety type to get data from coffee.config file 
    // @Inject(CoffeeBrand) private readonly coffeeBrand: string[],
  ) {
    // console.log(CoffeeBrand);
    // this.configService.get('database.host' , 'localhost') // get data from app.config file 
    // this.configService.get<string>('DATABASE_HOST', '5432') // get data from .env file 
    // const coffeeConfig = this.configService.get('coffees.database.host'); // get data from coffee.config fil. this syntax maybe occur error because we still don't have type safety 
    // console.log(coffeeConfig) 
    // conole.log(coffeeConfiguration.database)
  }

  async findAll() {
    return await this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id,
      },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((flavor) => {
        return this.preloadFlavors(flavor);
      }),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return await this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    // preload method is used to create a new object with the given data
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((flavor) => {
          return this.preloadFlavors(flavor);
        }),
      ));
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`coffee with ${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async delete(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee); // not need error not found because was handel in findOne method
  }

  private async preloadFlavors(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: {
        name,
      },
    });
    if (!existingFlavor) {
      return this.flavorRepository.create({ name });
    }

    return existingFlavor;
  }

  async findAllFlavor() {
    return this.flavorRepository.find({
      relations: ['coffees'],
    });
  }

  async findOneFlavor(id) {
    return this.flavorRepository.findOne({
      where: {
        id,
      },
    });
  }

  // async createFlavor(flavoreDto: CreateFlavorDto) {

  // }
}
