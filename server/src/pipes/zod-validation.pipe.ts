import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import { ZodError, ZodSchema } from 'zod';
  import { fromZodError } from 'zod-validation-error'; // You need to install this
  
  @Injectable()
  export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}
  
    transform(value: unknown, metadata: ArgumentMetadata) {
      try {
        return this.schema.parse(value);
      } catch (error: unknown) {
        // Zod errors need proper formatting
        if (error instanceof ZodError) {
          // Format Zod errors for better readability
          const formattedError = fromZodError(error);
          throw new BadRequestException({
            message: 'Validation failed',
            errors: formattedError.details || formattedError.message,
          });
        }
        throw new BadRequestException('Validation failed');
      }
    }
  }