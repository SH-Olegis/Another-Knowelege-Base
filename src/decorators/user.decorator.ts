import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const context = ctx.switchToHttp().getRequest();
  // Пользователь из jwt.strategy или local.strategy
  return context.user;
});
