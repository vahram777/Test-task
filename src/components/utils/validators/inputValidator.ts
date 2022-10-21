interface Validators {
  min?: number;
  email?: boolean;
  required?: boolean
}

const LENGTH_ERROR = '+ characters';
const EMAIL_ERROR = 'Invalid email';
const REQUIRED_ERROR = 'Reuqired';

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validator = (validators: Validators, input: string): string => {
  return (
    validators.required && !input.trim() ? REQUIRED_ERROR
      : validators.min && input.length < validators.min ? validators.min + LENGTH_ERROR
        : validators.email && !input.match(validEmailRegex) ? EMAIL_ERROR
          : ''
  )
}