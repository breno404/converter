import { useCallback, useMemo, useState } from "react";
import "./App.css";
import calc from "./utils/calculate";

type BaseType = "Binário" | "Decimal" | "Hexadecimal";

function App() {
  const [src, setSrc] = useState<BaseType>("Binário");
  const [dest, setDest] = useState<BaseType>("Decimal");
  const [srcValue, setSrcValue] = useState<string>("0");
  const [destValue, setDestValue] = useState<string>("0");

  const formatedSrcValue = useMemo(() => {
    if (isNaN(+srcValue)) return srcValue;
    return (+srcValue).toLocaleString("pt-BR");
  }, [srcValue]);

  const formatedDestValue = useMemo(() => {
    if (isNaN(+destValue)) return destValue;
    return (+destValue).toLocaleString("pt-BR");
  }, [destValue]);

  const handleBinaryToDecimal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
      if (src !== "Binário") setSrc("Binário");
      if (dest !== "Decimal") setDest("Decimal");
    },
    [src, dest]
  );

  const handleBinaryToHexadecimal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
      if (src !== "Binário") setSrc("Binário");
      if (dest !== "Hexadecimal") setDest("Hexadecimal");
    },
    [src, dest]
  );

  const handleDecimalToBinary = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
      if (src !== "Decimal") setSrc("Decimal");
      if (dest !== "Binário") setDest("Binário");
    },
    [src, dest]
  );

  const handleDecimalToHexadecimal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
      if (src !== "Decimal") setSrc("Decimal");
      if (dest !== "Hexadecimal") setDest("Hexadecimal");
    },
    [src, dest]
  );

  const handleHexadecimalToBinary = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
      if (src !== "Hexadecimal") setSrc("Hexadecimal");
      if (dest !== "Binário") setDest("Binário");
    },
    [src, dest]
  );
  const handleHexadecimalToDecimal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
      if (src !== "Hexadecimal") setSrc("Hexadecimal");
      if (dest !== "Decimal") setDest("Decimal");
    },
    [src, dest]
  );

  const handleConverter = useCallback(() => {
    let cleanValue = srcValue;

    while (cleanValue.includes(".")) {
      cleanValue = cleanValue.replace(".", "");
    }
    cleanValue = cleanValue.replace(",", ".");

    if (src === "Binário" && dest === "Decimal")
      cleanValue = cleanValue.replace(".", "");
    setDestValue(calc.binaryToDecimal(+cleanValue).toLocaleString("pt-BR"));

    if (src === "Binário" && dest === "Hexadecimal") console.log(cleanValue);
    cleanValue = cleanValue.replace(".", "");
    setDestValue(calc.binaryToHexadecimal(+cleanValue));

    if (src === "Decimal" && dest === "Binário") {
      setDestValue(calc.decimalToBinary(+cleanValue).toString());
    }
    if (src === "Decimal" && dest === "Hexadecimal") {
      setDestValue(calc.decimalToHexadecimal(+cleanValue));
    }
    if (src === "Hexadecimal" && dest === "Binário") {
      setDestValue(calc.hexadecimalToBinary(cleanValue).toString());
    }
    if (src === "Hexadecimal" && dest === "Decimal") {
      setDestValue(calc.hexadecimalToDecimal(cleanValue).toString());
    }
  }, [src, dest, srcValue]);

  return (
    <>
      <div className="container">
        <h1>Conversor de bases numéricas</h1>
        {/* GRID DE BOTÕES PARA ESCOLHER A CONVERSÃO DESEJADA */}
        <section className="row grid col-3">
          <section className="flex">
            <button
              className="btn-converter-mode"
              type="button"
              onClick={handleBinaryToDecimal}
            >
              Binário para Decimal
            </button>
            <button
              className="btn-converter-mode"
              type="button"
              onClick={handleBinaryToHexadecimal}
            >
              Binário para Hexadecimal
            </button>
          </section>
          <section className="flex">
            <button
              className="btn-converter-mode"
              type="button"
              onClick={handleDecimalToBinary}
            >
              Decimal para Binário
            </button>
            <button
              className="btn-converter-mode"
              type="button"
              onClick={handleDecimalToHexadecimal}
            >
              Decimal para Hexadecimal
            </button>
          </section>
          <section className="flex">
            <button
              className="btn-converter-mode"
              type="button"
              onClick={handleHexadecimalToBinary}
            >
              Hexadecimal para Binário
            </button>
            <button
              className="btn-converter-mode"
              type="button"
              onClick={handleHexadecimalToDecimal}
            >
              Hexadecimal para Decimal
            </button>
          </section>
        </section>
        {/* FORMULÁRIO RESPONSÁVEL PELA ENTRADA DE DADOS PARA A CONVERSÃO */}
        <form className="row">
          <section className="form-control">
            <label className="label" htmlFor="">
              {src}
            </label>
            <input
              className="input"
              type="text"
              onChange={(e) => setSrcValue(e.target.value)}
              value={formatedSrcValue}
            />
          </section>
          <section className="form-control">
            <label className="label" htmlFor="">
              {dest}
            </label>
            <input
              className="input"
              type="text"
              disabled
              onChange={(e) => {
                setDestValue(e.target.value);
              }}
              value={formatedDestValue}
            />
          </section>
          <section className="row">
            <button
              className="btn-converter-submit"
              type="button"
              onClick={handleConverter}
            >
              Converter
            </button>
          </section>
        </form>
      </div>
    </>
  );
}

export default App;
