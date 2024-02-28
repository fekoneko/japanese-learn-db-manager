interface InputErrorProps {
  errorType: any;
}
const InputError = ({ errorType }: InputErrorProps) => {
  if (!errorType) return null;

  if (errorType === "required")
    return (
      <p
        role="alert"
        className="rounded-lg bg-red-500 p-0.5 text-center text-sm text-white"
      >
        Это необходимое поле
      </p>
    );
  else if (errorType === "min" || errorType === "max")
    return (
      <p
        role="alert"
        className="rounded-lg bg-red-500 p-0.5 text-center text-sm text-white"
      >
        Значение вне допустимого диапозона
      </p>
    );
  else if (errorType === "minLength" || errorType === "maxLength")
    return (
      <p
        role="alert"
        className="rounded-lg bg-red-500 p-0.5 text-center text-sm text-white"
      >
        Недопустимая длина строки
      </p>
    );
  else
    return (
      <p
        role="alert"
        className="rounded-lg bg-red-500 p-0.5 text-center text-sm text-white"
      >
        Значение введено неверно
      </p>
    );
};
export default InputError;
