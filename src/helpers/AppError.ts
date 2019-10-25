class AppError<T> extends Error {
  private errors: Partial<Record<keyof T, string[]>> = {};
  public message: string = '';

  constructor(e, name = '') {
    super(e.message ? e.message : '');
    this.name = name;
    if (e) {
      this.resetWithErrors(e);
    }
  }

  setError = (key: keyof T, value: string) => {
    const array = this.errors[key] ? this.errors[key] : [];
    array!.push(value); // ! tells typescript value isn't undefined
    this.errors[key] = array;
  };

  getError = (key: keyof T): string => {
    return this.errors[key] ? this.errors[key]!.join('\n') : '';
  };

  resetError = (key: keyof T) => {
    this.errors[key] = [];
  };

  resetWithError = (key: keyof T, value: string) => {
    this.resetError(key);
    this.setError(key, value);
  };

  reset = () => {
    this.errors = {};
    this.message = '';
  };

  resetWithErrors = e => {
    this.errors = e.errors ? e.errors : {};
    this.message = e.message ? e.message : '';
  };
}

export default AppError;
