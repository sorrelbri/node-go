const generateRandomPassword = () => {
  const minLength = 8,
    maxLength = 16,
    minUTF = 33,
    maxUTF = 126;
  const randomize = (min, max) => Math.floor(Math.random() * (max - min) + min);
  return Array(randomize(minLength, maxLength))
    .fill(0)
    .map(() => String.fromCharCode(randomize(minUTF, maxUTF)))
    .join("");
};

const guestService = {
  currentGuest: 0,
  generateGuest() {
    // generate unique username
    const username = `Guest-${String(this.currentGuest++).padStart(6, 0)}`;
    // generate random "password"
    // this exists solely to add extra randomness to signed token and is not validated
    const password = generateRandomPassword();
    return { username, password };
  },
};

module.exports = guestService;
