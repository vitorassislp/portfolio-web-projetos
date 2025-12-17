const formularioLogin = document.querySelector('form');
const campoUsuario = document.getElementById('nomeUsuario');
const campoSenha = document.getElementById('senha');
const linkEsqueciSenha = document.querySelector('.esqueci-senha');

function toggleDestaque(campo, adicionar) {
    if (adicionar) {
        campo.classList.add('campo-destaque-obrigatorio');
    } else {
        campo.classList.remove('campo-destaque-obrigatorio');
    }
}

formularioLogin.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const usuario = campoUsuario.value.trim();
    const senha = campoSenha.value.trim();    

    let camposValidos = true;

    if (usuario === '') {
        toggleDestaque(campoUsuario, true); 
        camposValidos = false;
    } else {
        toggleDestaque(campoUsuario, false); 
    }

    if (senha === '') {
        toggleDestaque(campoSenha, true);
        camposValidos = false;
    } else {
        toggleDestaque(campoSenha, false); 
    }

    if (!camposValidos) {
        alert('Por favor, preencha todos os campos (Usuário e Senha).');
        return;
    }
 

    const adminUsuario = 'admin@fortes.com.br';
    const adminSenha = '123456';
    const cooperacaoUsuario = 'cooperativas@fortes.com.br';
    const cooperacaoSenha = '123456';

    if (usuario === adminUsuario && senha === adminSenha) {
        window.location.href = '../admin/admin_dashboard.html';
    } else if (usuario === cooperacaoUsuario && senha === cooperacaoSenha) {
        window.location.href = '../cooperativa/cooperacao_dashboard.html';
    } else {
        alert('Credenciais inválidas. Por favor, tente novamente.');
        campoSenha.value = ''; 
        toggleDestaque(campoSenha, true); 
    }
});

linkEsqueciSenha.addEventListener('click', function(evento) {
    evento.preventDefault();
    alert('Funcionalidade de recuperação de senha. Por favor, verifique seu e-mail!');
});

campoUsuario.addEventListener('input', function() {
    toggleDestaque(campoUsuario, false);
});
campoUsuario.addEventListener('focus', function() {
    toggleDestaque(campoUsuario, false);
});
campoSenha.addEventListener('input', function() {
    toggleDestaque(campoSenha, false);
});
campoSenha.addEventListener('focus', function() {
    toggleDestaque(campoSenha, false);
});