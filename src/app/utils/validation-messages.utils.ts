export class ValidationMessages {
  public maxLengthError(label: string, maxLength: number): string {
    return `${label} cannot be more than ${maxLength} characters long`;
  }

  public minLengthError(label: string, minLength: number): string {
    return `${label} cannot be less than ${minLength} characters long`;
  }

  public requiredError(label: string): string {
    return `${label} is a required field`;
  }
}
