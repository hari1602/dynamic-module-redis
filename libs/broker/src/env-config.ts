import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import JoiUtil from '@app/utils/joi-util';
import { JoiConfig } from '@app/utils';

interface IRedisConfig {
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
}

export default registerAs('redis-config-namespace', (): IRedisConfig => {
  const configs: JoiConfig<IRedisConfig> = {
    REDIS_HOST: {
      value: process.env.REDIS_HOST,
      joi: Joi.string().required(),
    },
    REDIS_PASSWORD: {
      value: process.env.REDIS_PASSWORD,
      joi: Joi.string().required(),
    },
    REDIS_PORT: {
      value: process.env.REDIS_PORT,
      joi: Joi.number().required(),
    },
  };

  return JoiUtil.validate(configs);
});
