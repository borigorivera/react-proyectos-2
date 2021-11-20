import React, { useRef, useState } from 'react';
import './App.css';

const padTime = (tiempo) => tiempo.toString().padStart(2, '0');

export default function App() {
  const [tiempo, setTiempo] = useState(1);
  const [titulo, setTitulo] = useState('POMODORO!');
  const [estaCorriendo, setEstaCorriendo] = useState(false);
  const refIntervalo = useRef(null);

  const empezarTiempo = () => {
    if (estaCorriendo === true) return;
    setEstaCorriendo(true);
    setTitulo('estas haciendolo muy bien!');
    refIntervalo.current = setInterval(() => {
      setTiempo((tiempo) => {
        if (tiempo >= 1) return tiempo - 1;

        setEstaCorriendo(false);
        setTitulo('Has terminado! Felicidades!');
        return 0;
      });
    }, 1000);
  };

  const pausarTiempo = () => {
    if (estaCorriendo === false) return;
    clearInterval(refIntervalo.current);
    setTitulo('Vamos! continua!');
    setEstaCorriendo(false);
  };
  const reiniciarTiempo = () => {
    clearInterval(refIntervalo.current);
    setTiempo(25 * 60);
    setTitulo('POMODORO!');
    setEstaCorriendo(false);
  };

  const minutos = padTime(Math.floor(tiempo / 60));
  const segundos = padTime(tiempo - minutos * 60);
  return (
    <div className="app">
      <h2>{titulo}</h2>

      <div className="timer">
        <span>{minutos}</span>
        <span>:</span>
        <span>{segundos}</span>
      </div>

      <div className="buttons">
        <button onClick={empezarTiempo}>Empezar</button>
        <button onClick={pausarTiempo}>Pausar</button>
        <button onClick={reiniciarTiempo}>Reiniciar</button>
      </div>
    </div>
  );
}
