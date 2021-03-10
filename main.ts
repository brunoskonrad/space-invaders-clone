import { Game } from "./src/Game";

const game = new Game();

const startStopButton = document.querySelector<HTMLButtonElement>(
  "[data-start-pause]"
);
startStopButton.addEventListener("click", () => {
  if (game.isRunning) {
    game.stop();
    startStopButton.innerText = "Start";
  } else {
    game.start();
    startStopButton.innerText = "Pause";
  }
});
startStopButton.click();
