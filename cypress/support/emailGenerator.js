// Función para generar una cadena aleatoria
function generateRandomString(length) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Función para generar un correo electrónico aleatorio
function generateRandomEmail() {
  const randomString = generateRandomString(8);
  return `odin_${randomString}@example.com`;
}

module.exports = generateRandomEmail;