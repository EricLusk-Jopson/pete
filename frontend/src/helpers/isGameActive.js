const isGameActive = (activeGame) => {
  if (!activeGame || !activeGame.startDate || !activeGame.endDate) {
    return;
  }
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const startDateMidnight = new Date(activeGame.startDate);
  const endDateMidnight = new Date(activeGame.endDate);
  return (
    startDateMidnight.getTime() <= today.getTime() &&
    endDateMidnight.getTime() >= today.getTime()
  );
};

export default isGameActive;
