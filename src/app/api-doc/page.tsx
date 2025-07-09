import { getApiDocs } from '@utils/swagger';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default async function SwaggerPage() {
  const spec = await getApiDocs();

  return (
    <div className='p-8'>
      <SwaggerUI spec={spec} />
    </div>
  );
}
