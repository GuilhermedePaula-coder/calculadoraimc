import Header from './components/Header'
import { useState, useEffect } from 'react'
import Resultado from './components/Resultado'
import "./css/estilo.css"

function App() {
  //HOOK- useState = Manipula o estado da variável
  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  //FUNÇÃO CALCULAR IMC
  const calcularImc = (e) => {
    e.preventDefault(); // impede reload da página

    // Validações
    if (!altura || altura <= 0 || altura > 3) {
      alert("Por favor, insira uma altura válida (ex: 1.80).");
      return;
    }

    if (!peso || peso <= 0 || peso > 500) {
      alert("Por favor, insira um peso válido (ex: 80).");
      return;
    }

    const imc = peso / (altura * altura);
    setResultado(imc.toFixed(2));
  };

  //HOOK useEffect - efeito colateral no mostrar resultado
  useEffect(() => {
    resultado > 0 ? setMostrarResultado(true) : setMostrarResultado(false);
  }, [resultado]);

  return (
    <div className="container">
      <div className="box">
        <Header />
        <form onSubmit={calcularImc}>
          <div>
            <label htmlFor="altura"><span>(Exemplo: 1.80)</span></label>
            <input
              type="number"
              id="altura"
              placeholder="Digite sua Altura"
              step="any"
              min="0"
              max="3"
              onBlur={({ target }) => setAltura(parseFloat(target.value))}
            />
          </div>

          <div>
            <label htmlFor="peso"><span>(Exemplo: 80)</span></label>
            <input
              type="number"
              id="peso"
              placeholder="Digite seu Peso"
              step="any"
              min="0"
              max="500"
              onBlur={({ target }) => setPeso(parseFloat(target.value))}
            />
          </div>

          <button type="submit">Calcular</button>
        </form>
      </div>

      {mostrarResultado && (
        <Resultado resultado={resultado} />
      )}
    </div>
  );
}

export default App;
