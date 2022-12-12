import React, { useState, useRef, useEffect } from "react";
import Dice from "../../dicecomp/Comp2";
import DiceBet from "../../dicecomp/Comp3";
import DiceRoller from "../../dicecomp/Comp4";
import Counter from "../../dicecomp/Comp1";
import ScoreBoard from "../../dicecomp/Comp5";
import "./dashboard.scss";

function Dashboard() {
  const [balance, updateBalance] = useState(100);
  const [showdice, setShowdice] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [shouldResetGame, setShouldResetGame] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [bets, setBets] = useState([0, 0, 0, 0, 0, 0]);

  const rollerRef = useRef(null);

  const setGame = (isReset) => {
    setShowdice(false);
    setStartGame(false);
    setBets([0, 0, 0, 0, 0, 0]);
    setShowScore(false);
    if (isReset) {
      setScore(0);
      updateBalance(100);
      setShouldResetGame(false);
    }
  };
  useEffect(() => {
    if (balance < 0) {
      setShouldResetGame(true);
    }
  }, [balance]);

  const onSetBet = (i) => {
    if (!startGame || showdice || shouldResetGame) {
      return;
    }
    setBets((bets) => bets.map((bet, betId) => (i === betId ? bet + 1 : bet)));
  };
  const rollDice = () => {
    rollerRef.current.rollAll();
  };

  const onRollerStop = (num) => {
    const _score = bets.reduce((acc, bet, i) => {
      if (i === num - 1) {
        acc = acc + 2 * bet;
      } else {
        acc = acc - bet;
      }
      return acc;
    }, 0);
    setTimeout(() => {
      setShowScore(true);
      setScore(_score);
      updateBalance((balance) => balance + _score);
    }, 2000);
    setTimeout(() => {
      setGame();
    }, 7000);
  };

  const onStartGame = () => {
    setStartGame(true);
  };
  const onCounterEnd = () => {
    setShowdice(true);
    setStartGame(false);
    rollDice();
  };
  return (
    <div className="board-container">
      <div className="board">
        <div className="score-board">
          <div className="wallet">
            <div className="wallet-label">
              <span className="wallet-label-icon material-icons md-18">
                wallet
              </span>
              <div className="wallet-label-value">Wallet</div>
            </div>
            <div className="wallet-score">
              <div className="wallet-score-value">
                {balance > 0 ? balance : 0}
              </div>
              <div className="wallet-score-icon material-icons md-18">
                monetization_on
              </div>
            </div>
          </div>
          <div className="last">
            <div className="last-label">
              <span className="last-label-icon material-icons md-18">
                workspace_premium
              </span>
              <div className="last-label-value">Last Score</div>
            </div>
            <div className="last-score">
              <div className="last-score-value">{score}</div>
              <div className="last-score-icon material-icons md-18">
                monetization_on
              </div>
            </div>
          </div>
          <div className="last-win"></div>
        </div>
        <div className="play-board">
          {shouldResetGame && (
            <div className="reset-header">Insufficient funds reset</div>
          )}
          {showScore && <ScoreBoard score={score} />}
          {startGame && !showdice && (
            <div className="game-caution"> Quickly make a bet</div>
          )}
          {!showdice && !shouldResetGame && (
            <Counter startTimer={startGame} onTimerEnd={onCounterEnd} />
          )}
          <div style={{ display: showdice ? "initial" : "none" }}>
            <DiceRoller ref={rollerRef} onRollerStop={onRollerStop} />
          </div>
          <button
            style={{
              display:
                !startGame && !showdice && !shouldResetGame ? "initial" : "none"
            }}
            className="start-game"
            onClick={() => {
              onStartGame();
            }}
          >
            Start Game
          </button>

          <button
            style={{ display: shouldResetGame ? "initial" : "none" }}
            className="reset-game"
            onClick={() => {
              setGame(true);
            }}
          >
            Reset Game
          </button>
        </div>
        <div className="dice-board">
          <div className="dice-row">
            <Dice face={1} />
            <Dice face={2} />
            <Dice face={3} />
            <Dice face={4} />
            <Dice face={5} />
            <Dice face={6} />
          </div>
          <div className="bet-row">
            {bets.map((bet, id) => (
              <DiceBet
                bet={bet}
                isDisabled={!startGame || showdice || shouldResetGame}
                setBet={() => onSetBet(id)}
                key={id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
