export const moneyFormat = (value: any, digitos: number = 2, maxDigitos = 2) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digitos,
    maximumFractionDigits: digitos || maxDigitos,
    currency: "BRL",
  }).format(value);
