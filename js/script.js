//DECLARAÇÃO DE VARIAVEIS GLOBAIS
var largura = window.screen.width;
let lds=Number(largura/2)

//<576px
//≥576px
//≥768px
//≥992px
//≥1200px
//≥1400px
let trdl=650
let tlop=800

if (largura <576) {
  trdl=650
  tlop=800
}
if (largura >=576) {
  trdl=750
  tlop=900
}
if (largura >=768) {
  trdl=850
  tlop=1000
}
if (largura >=992) {
  trdl=950
  tlop=1100
}

if (largura >=1200) {
  trdl=1050
  tlop=1200
}
if (largura >=1400) {
  trdl=1150
  tlop=1300
}
//console.log("tela "+largura)

const personagem=window.document.querySelector("#personagem")
const direita=window.document.querySelector("#dir")
const esquerda=window.document.querySelector("#esq")

const s_esq=window.document.querySelector("#s-esq")
const s_dir=window.document.querySelector("#s-dir")

const t_ini=window.document.querySelector("#tinit")
const t_jog=window.document.querySelector("#jogo")
const t_gmo=window.document.querySelector("#tgmo")

let pdr=0
let i=0

//CARREGA SKIN DO PERSONAGEM
let ch= localStorage.getItem("per")

if(ch!=""){
personagem.style.background=`url('${ch}')`
personagem.style.backgroundSize='cover'
}

if(ch==""){
  personagem.style.backgroundColor="var(--cor1)"
}

//SOM DO DESLIZE DO PERSONAGEM
let slide=new Audio("./sounds/slide.mp3")

//FUNÇÃO PARA GERAR UM NÚMERO ALEATÓRIO ENT5RE DOIS NÚMEROS QUAISQUER
function rdn(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min) + min);
}

function dirD(){
	personagem.classList.remove("translate-middle")
	personagem.classList.remove("start-50")
	personagem.classList.remove("start-0")
	anime({
		  targets: '#personagem',
		  left: "calc(100% - 100px)",
		  duration: 80
		});
		
		slide.play()
}
function esqD(){
	personagem.classList.remove("translate-middle")
	personagem.classList.remove("start-50")
	personagem.classList.remove("end-0")
	anime({
		  targets: '#personagem',
		  left: "0%",
		  duration: 80
		});
		
		slide.play()
}

//EVENTO DE CLIQUE PARA O PERSONAGEM IR PARA A DOREITA
direita.addEventListener('click',dirD)

//EVENTO DE CLIQUE PARA O PERSONAGEM IR PARA A ESQUERDA
esquerda.addEventListener('click',esqD)

t_jog.addEventListener("touchend",(cg)=>{
	  let dls=Math.floor(cg['changedTouches']['0']['screenX'])
	  
	  if(dls<lds){
	    esqD()
	  }
	  else{
	    dirD()
	  }
	})

//FUNCÃO DE INICIO DO JOGO
loop=setInterval(function(){
	//console.log(trdl+" × "+tlop)
	let personagemD=+window.getComputedStyle(personagem).left.replace("px","")
		
		i+=2
		let score=document.querySelector("#score")
		score.innerText=`Score: ${i}`
		
		lado()
		
		if((pdr==2)&&(personagemD>lds)||(pdr==1)&&(personagemD<lds)){
			gmover();
		}
		
	 	//console.log("pd "+personagemD)
		
	},tlop)

//FUNCÃO DE FIM DE JOGO
function gmover(){
	localStorage.setItem("pontos",i)
	clearInterval(loop)
	window.location.replace("tfim.html")
	personagem.classList.add("top-50")
	personagem.classList.add("start-50")
	personagem.classList.add("translate-middle")
	personagem.classList.add("my-auto")
	
}
//FUNCÃO PARA APONTAR PARA ONDE O JOGADOR DEGE IR
function lado(){
	if(rdn(1,3)==2){
		s_esq.classList.remove("d-none")
		s_dir.classList.add("d-none")
		setTimeout(function(){
			pdr=2
			esquerda.style.backgroundColor=""
			direita.style.backgroundColor="#5B618A"
		},trdl)
	}else{
		s_dir.classList.remove("d-none")
		s_esq.classList.add("d-none")
		setTimeout(function(){
			pdr=1
			direita.style.backgroundColor=""
			esquerda.style.backgroundColor="#5B618A"
		},trdl)
	}
}