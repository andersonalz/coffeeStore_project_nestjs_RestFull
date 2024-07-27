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
  ValidationPipe,
  UsePipes,
  // Query,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
// import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { isPublic } from '../common/decorators/public.decorator';
import { ParsIntPipe } from 'src/common/pipes/pars-int/pars-int.pipe';
import { Protocol } from 'src/common/decorators/protocole.decorator';
@UsePipes(ValidationPipe) // pass single pipe class or speared with comma for multiple pipe class
// @UsePipes(new ValidationPipe()) // we can pass instance of pipe class here but this syntax ues extra memory
@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}
  // @UsePipes(ValidationPipe) we can use pipe decorator for every route to set specific customize option   
  @Get()
  @isPublic()
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
  @isPublic()
  findOne(@Protocol() protocol:string , @Param('id' , ParsIntPipe) id: number) {
    // console.log("🚀 ~ findOne ~ protocol:", protocol) //show request protocol whit Protocol decorator created
    return this.coffeeService.findOne(id);
  }

  // @Post()
  // createCoffee(@Body('name') name: string) {
  //     return name;
  // }
  @isPublic()
  @Post()
  //   @HttpCode(HttpStatus.OK)
  // createCoffee(@Body() body , @Res() response) {
  // response.status(200).send(body);
  createCoffee(@Body() createCoffee: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffee);
  }

  @Patch(':id')
    // update(@Body(ValidationPipe) updateCoffee: UpdateCoffeeDto, @Param() param) {  //param scope pipes to filter data come from request 
    update(@Body() updateCoffee: UpdateCoffeeDto, @Param() param) {
    return this.coffeeService.update(+param.id, updateCoffee);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.coffeeService.delete(+params.id);
  }
}
