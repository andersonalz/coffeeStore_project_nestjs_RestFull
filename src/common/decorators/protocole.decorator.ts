import { createParamDecorator , ExecutionContext } from "@nestjs/common";

export const Protocol = createParamDecorator(
    (defaultValue: string, ctx: ExecutionContext)=>{ // if we need pass value to custom decorator we can use defaultValue argument 
        const request = ctx.switchToHttp().getRequest();
        return request.protocol;
    }
)


