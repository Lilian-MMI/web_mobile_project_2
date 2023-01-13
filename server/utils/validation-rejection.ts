import { validateOrReject } from 'class-validator';

async function validateOrRejectInstance(classValidation, body) {
  Object.assign(classValidation, body);
  await validateOrReject(classValidation);
}

export default validateOrRejectInstance;
