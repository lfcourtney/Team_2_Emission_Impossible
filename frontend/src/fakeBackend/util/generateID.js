let idCounter = 1;

export const generateId = () => idCounter++;

export const resetIdCounter = () => {
  idCounter = 1;
};