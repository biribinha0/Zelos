//config/ldap.js
import passport from 'passport';
import LdapStrategy from 'passport-ldapauth';

const ldapOptions = {
  server: {
    url: 'ldap://10.189.87.7:389',
    bindDN: '', // tem que preencher, pedir para adm
    bindCredentials: '', // tem que preencher, pedir para adm
    searchBase: '', // tem que preencher, pedir para adm. se aluno ou=Alunos se funcionario ou=Funcionarios
    searchFilter: '(sAMAccountName={{username}})'
  }
};

passport.use(new LdapStrategy(ldapOptions, (user, done) => {
  if (!user) {
    return done(null, false, { message: 'Usuário não encontrado' });
  }
  return done(null, user);
}));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;