// import { Injectable, Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { ConfigModule } from '@nestjs/config';
import coffeeConfig from './config/coffee.config';
// import { Connection } from 'typeorm';
// import { CoffeeBrand } from './coffee.constant'; //'Coffee_Brand'
// class MockCoffeeService {}
// class ConfigService {}
// class ConfigServiceDev {}
// class ConfigServicePro {}
// @Injectable()
// export class CoffeeBrand {
//   create() {
//     return ['buddy brew', 'nescafe', 'kona coffee'];
//   }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor]) , 
    ConfigModule.forFeature(coffeeConfig) // add coffeeConfig from coffee.config file for set namespace config file to this module. this technic is partial registration
  ],
  controllers: [CoffeeController],
  providers: [
    CoffeeService,
    // CoffeeBrand,
    // {provide: CoffeeService, useFactory: (coffeeBrand: CoffeeBrand) => coffeeBrand.create() , inject: [CoffeeBrand]},one advantage in use Factory you can inject providers with inject property
    // {
    //   provide: CoffeeBrand,
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //   // connection.query('SELECT * FROM coffee');
    //     const coffeeBrands = Promise.resolve(['nescafe', 'kona coffee']);
    //     return coffeeBrands;
    //   },
    //   inject: [Connection],
    // },
    // {provide: CoffeeService, useFactory: (configService: ConfigServiceDev) => ['buddy brew', 'nescafe', 'kona coffee']},
    // {provide: CoffeeService, useClass: process.env.NODE_ENV === 'develope' ? ConfigServiceDev : ConfigServicePro} use class syntax dynamic determine class with condition
    // {provide: 'Coffee_Brand', useValue:['buddy brew', 'nescafe', 'kona coffee']}, when use string or symbols
    // {provide: CoffeeService, useClass: new MockCoffeeService()} in this case we can create instance of class instead of nest container
    // {provide: CoffeeService, useClass: CoffeeService} complete version of short hand just use name class for provide
  ],
  // exports: [CoffeeService] the module in nestjs encapsulates the service and when we import service in other module we must exports it so that other module can use it
})
export class CoffeeModule {}
