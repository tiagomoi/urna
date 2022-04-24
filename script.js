// controla a tela da urna 

let seuVoto = document.querySelector('.d1-1-1 spam');
let cargo = document.querySelector('.d1-2 spam');
let descricao = document.querySelector('.d1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-rigth');
let numeros = document.querySelector('.d1-3');

//vamos criar as variaveis de controle de ambiente
let etapaAtual = 0; //controla o inicio do programa
let numero = ''; //exibe os numeros digitados
let votobranco = false;//trabalha com o voto em branco
let votos = [];


const urna= document.querySelector('.urna');
urna.addEventListener('click', () => iniciaModal('modalp'));

function comecarEtapa() {
    let etapa = etapas[etapaAtual]; //inicio do programa start
    
    let numeroHtml = '';
    numero = '';
    votobranco = false;

    for(let i=0;i<etapa.numeros;i++){ //contador para receber os num e fazer piscar
        if(i === 0){
            numeroHtml += ' <div class="numero pisca"></div>'; 
        }else {
        numeroHtml += ' <div class="numero"></div>';
        }
    }

    seuVoto.style.display = 'none'; // mostra o conteudo do voto
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = ''; // mostra a descrição do candidato
    aviso.style.display = 'none';//mostra o aviso
    lateral.innerHTML = '';//mostra oconteúdo da foto lateral
    numeros.innerHTML = numeroHtml;//exibe numeros
}
function atualizaInterface(){ // funçao para atualizar a tela 
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    }); 
    if(candidato.length > 0) {
        candidato = candidato[0]; //pega o campo candidato
        seuVoto.style.display = 'block'; //mostra o voto
        aviso.style.display = 'block';//mostra o aviso
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;//mostra a descrição 
        
        let fotosHtml = ''; // mostra as fotos
        for(let i in candidato.fotos){
            if(candidato.fotos[i].url.small){
                fotosHtml += `<div class="d1-image1 small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }else{
            fotosHtml += `<div class="d1-image1"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
                }
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVoto.style.display = 'block'; //mostra o voto
        aviso.style.display = 'block';//mostra o aviso
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO<div/>';
    }
    
}
    //controla o teclado
    function clicou(n) {
        let elnumero = document.querySelector('.numero.pisca'); //faz o num piscar
            if (elnumero !== null){
                elnumero.innerHTML = n;
                numero = `${numero}${n}`;

                elnumero.classList.remove('pisca');
                    if(elnumero.nextElementSibling !== null){
                        elnumero.nextElementSibling.classList.add('pisca');
                    }else {
                        atualizaInterface();
                    }
            }
    }

    function branco(){ // voto em branco
            numero = '';
            votobranco= true;
            seuVoto.style.display = 'block'; //mostra o voto
            aviso.style.display = 'block';//mostra o aviso
            numeros.innerHTML ='';
            descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO<div/>'
            lateral.innerHTML = ''; // remove o conteudo da lateral foto    
    }

    function corrige(){ // botao corrige
        comecarEtapa();
    }
    function confirma(){ // botao confirma
        
        let etapa = etapas[etapaAtual];

        let votoConfirmado = false; //etapa de confirmação do voto
        
        if(votobranco === true){
            votoConfirmado = true;
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: 'branco'
            });
        } else if(numero.length === etapa.numeros){
            votoConfirmado = true;
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            });
        }        
        if(votoConfirmado){ 
            etapaAtual++;
            if(etapas[etapaAtual] !== undefined){
                comecarEtapa();
            } else {
                document.querySelector('.tela').innerHTML='<div class="aviso--gigante pisca">Fim<div/>';
                console.log(votos);
            }
        }
        const button = document.querySelector('button')
        button.addEventListener('click', function(){
            const audio = document.querySelector('audio')
            audio.play()
        })   
    }

    comecarEtapa();
    function iniciaModal(modalid){
        if (localStorage.fechaModal !== modalid){
            const modal = document.getElementById(modalid);
            if(modal){
            modal.classList.add('mostrar');
            modal.addEventListener('click', (e) =>{
                if(e.target.id == modalid || e.target.className == 'fechar') {
                    modal.classList.remove('mostrar');
                    localStorage.fechaModal = modalid;
                }
            });
        }
        }
    }