const isGameFinished = (activeGame) => {
  if (!activeGame || !activeGame.startDate || !activeGame.endDate) {
    return;
  }
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const endDateMidnight = new Date(activeGame.endDate);
  return endDateMidnight.getTime() < today.getTime();
};

export default isGameFinished;
