import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My Next App API',
        version: '1.0.0',
        description: 'Swagger docs for App Router APIs',
      },
    },
  });

  return spec;
};
