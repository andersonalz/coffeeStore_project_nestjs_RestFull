import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  // HttpCode,
  // HttpStatus,
  // Res,
  Patch,
  Delete,
  // Query,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
// import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll() {
    return this.coffeeService.findAll();
  }

  @Get('/flavor')
  findAllFlavor() {
    return this.coffeeService.findAllFlavor();
  }

  @Get('/flavor/:id')
  findOneFlavor(@Param() params) {
    return this.coffeeService.findOneFlavor(params.id);
  }
  // @Get('coffees/pagination')
  // findAllWithPagination(@Query() pagination) {
  //   const { limit, offset } = pagination;
  //   return `this route return all coffees with limit ${limit} and offset ${offset}`;
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.findOne(id);
  }

  // @Post()
  // createCoffee(@Body('name') name: string) {
  //     return name;
  // }

  @Post()
  //   @HttpCode(HttpStatus.OK)
  // createCoffee(@Body() body , @Res() response) {
  // response.status(200).send(body);
  createCoffee(@Body() createCoffee: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffee);
  }

  @Patch(':id')
  update(@Body() updateCoffee: UpdateCoffeeDto, @Param() param) {
    return this.coffeeService.update(+param.id, updateCoffee);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.coffeeService.delete(+params.id);
  }
}
