import { Field, Option } from "../types/field";
import { MoneyValue } from "../types/item";

export type MoneyFieldValue = string | number | MoneyValue | null | undefined;

export const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  ARS: "$",
  BRL: "R$",
  MXN: "$",
  CLP: "$",
};

export const normalizeCurrencyOption = (option: Option) => {
  return option && option.text && option.value
    ? option
    : { text: option[0], value: option[0] };
};

export const getDefaultCurrency = (field: Field, options: Option[]) => {
  if (typeof field.defaultValue === "string" && field.defaultValue) {
    return field.defaultValue;
  }

  return options[0]?.value ?? "USD";
};

export const getMoneyValue = (
  value: MoneyFieldValue,
  defaultCurrency: string
): MoneyValue => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return {
      value: value.value ?? "",
      currency: value.currency || defaultCurrency,
    };
  }

  return {
    value: typeof value === "string" || typeof value === "number" ? value : "",
    currency: defaultCurrency,
  };
};

export const getCurrencySymbol = (currency: string) => {
  // Extraemos solo el código de la moneda (por ejemplo, 'USD' o 'ARS')
  const currencyCode = currency.replace(/[^A-Za-z]/g, '').toUpperCase();
  return currencySymbols[currencyCode] ?? currency;
};

export const getLocaleSeparators = (locale?: string) => {
  const resolvedLocale =
    locale ??
    (typeof Intl !== "undefined" 
      ? Intl.DateTimeFormat().resolvedOptions().locale 
      : "en-US");

  const parts = new Intl.NumberFormat(resolvedLocale).formatToParts(1234567.89);

  return {
    thousandSeparator: parts.find((p) => p.type === "group")?.value ?? ",",
    decimalSeparator: parts.find((p) => p.type === "decimal")?.value ?? ".",
  };
};
