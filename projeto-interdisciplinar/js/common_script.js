document.addEventListener('DOMContentLoaded', function() {
    const abrirMenuBtn = document.getElementById('abrirMenuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeSideMenuBtn = document.querySelector('.close-side-menu');
    const botaoSair = document.querySelector('.side-menu-nav .botao-sair');

    function openSideMenu() {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSideMenu() {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (abrirMenuBtn) {
        abrirMenuBtn.addEventListener('click', openSideMenu);
    }
    if (closeSideMenuBtn) {
        closeSideMenuBtn.addEventListener('click', closeSideMenu);
    }
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeSideMenu);
    }

    if (botaoSair) {
        botaoSair.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = '../login/login.html';
        });
    }

    function toggleDestaque(campo, adicionar) {
        if (adicionar) {
            campo.classList.add('campo-destaque-obrigatorio');
        } else {
            campo.classList.remove('campo-destaque-obrigatorio');
        }
    }

    const formularioAgendamento = document.getElementById('formularioAgendamento');

    if (formularioAgendamento) {
        const campoNomeEmpresa = document.getElementById('nomeEmpresa');

        formularioAgendamento.addEventListener('submit', function(event) {
            if (campoNomeEmpresa.value.trim() === '') {
                event.preventDefault();
                toggleDestaque(campoNomeEmpresa, true);
                alert('O campo "Nome da empresa" é obrigatório.');
            } else {
                toggleDestaque(campoNomeEmpresa, false);
            }
        });

        campoNomeEmpresa.addEventListener('input', function() {
            toggleDestaque(campoNomeEmpresa, false);
        });
        campoNomeEmpresa.addEventListener('focus', function() {
            toggleDestaque(campoNomeEmpresa, false);
        });
    }

    const botaoConfirmarBusca = document.getElementById('botaoConfirmarBusca');
    const campoEnderecoBusca = document.getElementById('campoEnderecoBusca');

    if (botaoConfirmarBusca && campoEnderecoBusca) {
        botaoConfirmarBusca.addEventListener('click', function(event) {
            if (campoEnderecoBusca.value.trim() === '') {
                event.preventDefault();
                toggleDestaque(campoEnderecoBusca, true);
                alert('Por favor, digite um endereço para buscar.');
            } else {
                toggleDestaque(campoEnderecoBusca, false);
                alert('Buscando endereço: ' + campoEnderecoBusca.value);
            }
        });

        campoEnderecoBusca.addEventListener('input', function() {
            toggleDestaque(campoEnderecoBusca, false);
        });
        campoEnderecoBusca.addEventListener('focus', function() {
            toggleDestaque(campoEnderecoBusca, false);
        });
    }

    const formularioCadastroResiduo = document.querySelector('.formulario-cadastro');

    if (formularioCadastroResiduo) {
        const campoCnpj = document.getElementById('cnpj');
        
        formularioCadastroResiduo.addEventListener('submit', function(event) {
            if (campoCnpj.value.trim() === '') {
                event.preventDefault();
                toggleDestaque(campoCnpj, true);
                alert('O campo CNPJ é obrigatório.');
                return;
            } else {
                toggleDestaque(campoCnpj, false);
            }

            let formValido = true;

            const radioTiposResiduo = formularioCadastroResiduo.querySelectorAll('input[name="tipoResiduo"]');
            let tipoResiduoSelecionado = false;
            radioTiposResiduo.forEach(radio => {
                if (radio.checked) {
                    tipoResiduoSelecionado = true;
                }
            });

            if (!tipoResiduoSelecionado) {
                alert('Por favor, selecione pelo menos um tipo de resíduo.');
                formValido = false;
            }

            const itensResiduo = formularioCadastroResiduo.querySelectorAll('.item-residuo');
            itensResiduo.forEach(item => {
                const radio = item.querySelector('input[type="radio"]');
                const quantidadeInput = item.querySelector('input[type="text"]');

                if (radio && radio.checked) {
                    if (quantidadeInput.value.trim() === '' || isNaN(quantidadeInput.value.trim()) || parseFloat(quantidadeInput.value.trim()) <= 0) {
                        toggleDestaque(quantidadeInput, true);
                        alert('Por favor, insira uma quantidade válida para ' + item.querySelector('label').textContent + '.');
                        formValido = false;
                    } else {
                        toggleDestaque(quantidadeInput, false);
                    }
                } else if (radio && !radio.checked && quantidadeInput.value.trim() !== '') {
                    toggleDestaque(quantidadeInput, true);
                    alert('Por favor, selecione o tipo de resíduo para a quantidade informada.');
                    formValido = false;
                }
            });

            if (!formValido) {
                event.preventDefault();
            } else {
                alert('Formulário de Cadastro de Resíduo válido! CNPJ: ' + campoCnpj.value);
            }
        });

        campoCnpj.addEventListener('input', function() {
            toggleDestaque(campoCnpj, false);
        });
        campoCnpj.addEventListener('focus', function() {
            toggleDestaque(campoCnpj, false);
        });

        const inputsQuantidade = formularioCadastroResiduo.querySelectorAll('.item-residuo input[type="text"]');
        inputsQuantidade.forEach(input => {
            input.addEventListener('input', function() {
                toggleDestaque(input, false);
            });
            input.addEventListener('focus', function() {
                toggleDestaque(input, false);
            });
        });
    }
});