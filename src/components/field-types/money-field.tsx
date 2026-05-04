import React, { ChangeEvent, FC, useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { Field } from "../../types/field";
import { MoneyValue } from "../../types/item";
import {
  getCurrencySymbol,
  getDefaultCurrency,
  getLocaleSeparators,
  getMoneyValue,
  MoneyFieldValue,
  normalizeCurrencyOption,
} from "../../helpers/money";

interface Props {
  value: MoneyFieldValue;
  field: Field;
  onChange: (value: MoneyValue) => void;
}

const MoneyField: FC<Props> = ({ value, field, onChange }) => {
  const options = useMemo(
    () => field.options?.map(normalizeCurrencyOption) ?? [],
    [field.options]
  );

  const defaultCurrency = getDefaultCurrency(field, options);
  const moneyValue = getMoneyValue(value, defaultCurrency);

  const { thousandSeparator, decimalSeparator } = useMemo(
    () => getLocaleSeparators(),
    []
  );

  const currency = moneyValue.currency ?? defaultCurrency;
  const currencySymbol = getCurrencySymbol(currency);

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({
      value: moneyValue.value,
      currency: e.target.value,
    });
  };

  const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const raw = String(moneyValue.value ?? "");
    e.clipboardData.setData("text/plain", raw);
  };

  return (
    <div className="flex min-w-0 w-full items-center overflow-hidden rounded-md bg-white shadow-focus">
      <div className="flex flex-1 items-center justify-end px-2">
        <NumericFormat
          value={moneyValue.value ?? ""}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          allowNegative={false}
          className="min-w-0 flex-1 py-1.5 text-right outline-none bg-transparent"
          placeholder={`0${decimalSeparator}00`}
          onValueChange={(values) => {
            onChange({
              value: values.value,
              currency,
            });
          }}
          onCopy={handleCopy}
          // Agregamos el símbolo directamente en el formatter (prefix)
          prefix={currencySymbol + " "}
        />
      </div>

      <div className="flex shrink-0 items-center border-r border-gray-200 bg-gray-50">
        <select
          className="h-full max-w-[88px] bg-transparent px-1 py-1.5 text-sm text-gray-700 outline-none cursor-pointer"
          value={currency}
          onChange={handleCurrencyChange}
        >
          {options.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MoneyField;
