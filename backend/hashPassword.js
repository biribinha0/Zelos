import bcrypt from 'bcryptjs';

export async function generateHashedPassword(senha) {
  const password = senha; // Substitua pela senha que você deseja hashear
  try {
    // Gerar o salt
    const salt = await bcrypt.genSalt(10);

    // Hashear a senha com o salt
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Senha Hasheada:', hashedPassword);
    return(hashedPassword);
    process.exit(0); // Encerra o processo após exibir o hash
  } catch (error) {
    console.error('Erro ao hashear a senha:', error);
    return error
    process.exit(1); // Encerra o processo com código de erro
  }
}

