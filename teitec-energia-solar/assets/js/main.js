document.addEventListener('DOMContentLoaded', () => {
    /* ===========================================================
       1. MENU MOBILE
       =========================================================== */
    const btnMobile = document.getElementById('btn-mobile');
    const nav = document.getElementById('nav');
    const menuLinks = document.querySelectorAll('#menu a');

    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        nav.classList.toggle('active');
        const active = nav.classList.contains('active');
        event.currentTarget.setAttribute('aria-expanded', active);
        event.currentTarget.setAttribute('aria-label', active ? 'Fechar Menu' : 'Abrir Menu');
    }

    if (btnMobile) {
        btnMobile.addEventListener('click', toggleMenu);
        btnMobile.addEventListener('touchstart', toggleMenu);
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    /* ===========================================================
       2. CARREGAMENTO DE PROMOÇÕES (JSON)
       =========================================================== */
    async function carregarPromocoes() {
        const container = document.getElementById('promocoes-container');
        if (!container) return;

        try {
            const response = await fetch('data/promocoes.json');
            const data = await response.json();

            container.innerHTML = data.map(promo => `
                <article class="promo-card">
                    <div class="promo-img" style="background-image: url('${promo.imagem}')"></div>
                    <div class="promo-body">
                        <h3>${promo.titulo}</h3>
                        <p>${promo.descricao}</p>
                        <p class="promo-price">R$ ${promo.preco}</p>
                        <a href="https://wa.me/5528992910522?text=Olá, tenho interesse no ${promo.titulo}" class="btn-primary" target="_blank">Quero este Kit</a>
                    </div>
                </article>
            `).join('');
        } catch (error) {
            container.innerHTML = '<p>Consulte-nos para ofertas atualizadas.</p>';
        }
    }
    carregarPromocoes();

    /* ===========================================================
       3. LÓGICA DO FORMULÁRIO (PF vs PJ)
       =========================================================== */
    const radiosTipo = document.querySelectorAll('input[name="tipo-pessoa"]');
    
    // Blocos do Orçamento (Passo 1)
    const blocoIdentPF = document.getElementById('identificacao-pf');
    const blocoIdentPJ = document.getElementById('identificacao-pj');

    // Blocos do Financiamento (Passo 2)
    const blocoFinPF = document.getElementById('financeiro-pf');
    const blocoFinPJ = document.getElementById('financeiro-pj');

    // Função para alternar visibilidade
    function alternarTipoPessoa() {
        const tipoSelecionado = document.querySelector('input[name="tipo-pessoa"]:checked').value;

        if (tipoSelecionado === 'pf') {
            // Mostra PF, Esconde PJ
            blocoIdentPF.classList.remove('hidden-field');
            if(blocoFinPF) blocoFinPF.classList.remove('hidden-field');
            
            blocoIdentPJ.classList.add('hidden-field');
            if(blocoFinPJ) blocoFinPJ.classList.add('hidden-field');
            
            // Ajusta obrigatoriedade dos campos (HTML5 Validation)
            setRequired(blocoIdentPF, true);
            setRequired(blocoIdentPJ, false);
        } else {
            // Mostra PJ, Esconde PF
            blocoIdentPF.classList.add('hidden-field');
            if(blocoFinPF) blocoFinPF.classList.add('hidden-field');
            
            blocoIdentPJ.classList.remove('hidden-field');
            if(blocoFinPJ) blocoFinPJ.classList.remove('hidden-field');

            // Ajusta obrigatoriedade
            setRequired(blocoIdentPF, false);
            setRequired(blocoIdentPJ, true);
        }
    }

    // Auxiliar para adicionar/remover atributo 'required' nos inputs visíveis
    function setRequired(container, isRequired) {
        if(!container) return;
        const inputs = container.querySelectorAll('input');
        inputs.forEach(input => {
            if (isRequired) input.setAttribute('required', 'required');
            else input.removeAttribute('required');
        });
    }

    // Adiciona evento de mudança nos botões de rádio
    radiosTipo.forEach(radio => {
        radio.addEventListener('change', alternarTipoPessoa);
    });

    /* ===========================================================
       4. FLUXO DE ENVIO (Passo 1 -> Passo 2 -> WhatsApp)
       =========================================================== */
    const formOrcamento = document.getElementById('form-orcamento');
    const formFinanciamento = document.getElementById('form-financiamento');
    const orcamentoSection = document.getElementById('orcamento');
    const financiamentoSection = document.getElementById('financiamento');
    const btnPularFin = document.getElementById('btn-pular-fin');

    // --- ETAPA 1: Processar Orçamento Técnico ---
    if (formOrcamento) {
        formOrcamento.addEventListener('submit', (e) => {
            e.preventDefault();

            const tipo = document.querySelector('input[name="tipo-pessoa"]:checked').value;
            
            // Coleta dados específicos
            let dadosCliente = {};
            if (tipo === 'pf') {
                dadosCliente.nome = document.getElementById('nome-orc').value;
                dadosCliente.tipoTexto = "Pessoa Física";
            } else {
                dadosCliente.razao = document.getElementById('razao-social-orc').value;
                dadosCliente.cnpj = document.getElementById('cnpj-orc').value; // CNPJ agora no passo 1
                dadosCliente.responsavel = document.getElementById('responsavel-orc').value;
                dadosCliente.tipoTexto = "Pessoa Jurídica";
            }

            // Coleta dados comuns (incluindo Endereço Completo)
            const dadosComuns = {
                tipo: tipo,
                whatsapp: document.getElementById('whatsapp-orc').value,
                email: document.getElementById('email-orc').value,
                conta: document.getElementById('valor-conta').value,
                telhado: document.getElementById('tipo-telhado').value,
                // Endereço agora capturado no passo 1
                cep: document.getElementById('cep-orc').value,
                rua: document.getElementById('rua-orc').value,
                numero: document.getElementById('numero-orc').value,
                bairro: document.getElementById('bairro-orc').value,
                cidade: document.getElementById('cidade-orc').value,
                uf: document.getElementById('uf-orc').value
            };

            // Salva no navegador para o próximo passo
            const dadosCompletos = { ...dadosCliente, ...dadosComuns };
            sessionStorage.setItem('temp_orcamento', JSON.stringify(dadosCompletos));

            // Transição visual para a próxima etapa
            orcamentoSection.classList.add('hidden-step');
            financiamentoSection.classList.remove('hidden-step');
            
            // Preenche automaticamente o WhatsApp no passo 2 para agilizar
            if(document.getElementById('whatsapp-fin')) {
                document.getElementById('whatsapp-fin').value = dadosComuns.whatsapp;
            }

            window.scrollTo({ top: financiamentoSection.offsetTop - 100, behavior: 'smooth' });
        });
    }

    // --- ETAPA 2: Envio Completo (Crédito) ---
    if (formFinanciamento) {
        formFinanciamento.addEventListener('submit', (e) => {
            e.preventDefault();
            enviarWhatsApp(true); // true = com financiamento
        });
    }

    // --- Botão Pular (Enviar sem crédito) ---
    if (btnPularFin) {
        btnPularFin.addEventListener('click', () => {
            enviarWhatsApp(false); // false = apenas orçamento
        });
    }

    // Função Mestra de Envio
    function enviarWhatsApp(comFinanciamento) {
        const storageData = sessionStorage.getItem('temp_orcamento');
        if (!storageData) return; // Segurança

        const orc = JSON.parse(storageData);
        let texto = `*SOLICITAÇÃO TEITEC - ${orc.tipoTexto.toUpperCase()}*\n\n`;

        // Bloco 1: Dados do Cliente
        texto += `*--- 👤 DADOS DO CLIENTE ---*\n`;
        if (orc.tipo === 'pf') {
            texto += `*Nome:* ${orc.nome}\n`;
            
            // Dados sensíveis de PF (Apenas se pediu financiamento)
            if (comFinanciamento) {
                const cpf = document.getElementById('cpf-fin').value;
                const nasc = document.getElementById('nasc-fin').value;
                const mae = document.getElementById('nome-mae-fin').value;
                const rg = document.getElementById('rg-fin').value;
                const dataExp = document.getElementById('data-exp-fin').value;
                const ufRg = document.getElementById('uf-rg-fin').value;

                texto += `*CPF:* ${cpf}\n`;
                texto += `*Data Nasc:* ${formatarData(nasc)}\n`;
                texto += `*Nome da Mãe:* ${mae}\n`;
                texto += `*RG:* ${rg} (Exp: ${formatarData(dataExp)} / ${ufRg})\n`;
            }
        } else {
            // É PJ
            texto += `*Razão Social:* ${orc.razao}\n`;
            texto += `*CNPJ:* ${orc.cnpj}\n`; // CNPJ já vem do passo 1
            texto += `*Responsável:* ${orc.responsavel}\n`;
            
            // Dados sensíveis de PJ (Apenas se pediu financiamento)
            if (comFinanciamento) {
                const atividade = document.getElementById('atividade-fin').value;
                const fantasia = document.getElementById('nome-fantasia-fin').value;
                const faturamento = document.getElementById('faturamento-fin').value;
                const capital = document.getElementById('capital-social-fin').value;
                const fundacao = document.getElementById('fundacao-fin') ? document.getElementById('fundacao-fin').value : '';

                texto += `*Nome Fantasia:* ${fantasia}\n`;
                texto += `*Tempo Atividade:* ${atividade} meses\n`;
                if(fundacao) texto += `*Fundação:* ${formatarData(fundacao)}\n`;
                texto += `*Faturamento Anual:* R$ ${faturamento}\n`;
                texto += `*Capital Social:* R$ ${capital}\n`;
            }
        }

        // Bloco 2: Localização e Contato (Vem do Passo 1)
        texto += `\n*--- 📍 LOCAL E CONTATO ---*\n`;
        texto += `*Cidade:* ${orc.cidade} / ${orc.uf}\n`;
        texto += `*Endereço:* ${orc.rua}, ${orc.numero} - ${orc.bairro}\n`;
        texto += `*CEP:* ${orc.cep}\n`;
        texto += `*WhatsApp:* ${orc.whatsapp}\n`;
        texto += `*E-mail:* ${orc.email}\n`;

        // Bloco 3: Dados Técnicos
        texto += `\n*--- ⚡ DADOS TÉCNICOS ---*\n`;
        texto += `*Conta Média:* R$ ${orc.conta}\n`;
        texto += `*Tipo Telhado:* ${orc.telhado.toUpperCase()}\n`;

        // Rodapé da mensagem
        if (comFinanciamento) {
            texto += `\n📝 _Cliente solicitou análise de crédito completa._`;
        } else {
            texto += `\n⚠️ _Cliente optou por APENAS ORÇAMENTO (sem simulação de crédito)._`;
        }

        // Codifica e envia
        const numeroDestino = "5528992910522";
        const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(texto)}`;
        
        window.open(url, '_blank');
        
        // Limpa sessão após envio
        sessionStorage.removeItem('temp_orcamento');
    }

    // Formata data de YYYY-MM-DD para DD/MM/AAAA
    function formatarData(data) {
        if (!data) return "";
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    /* ===========================================================
       5. COMPORTAMENTO DO HEADER NO SCROLL
       =========================================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = '#fff';
        }
    });
});