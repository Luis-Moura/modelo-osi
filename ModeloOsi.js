class Mensagem {
	constructor(conteudo) {
		this.conteudo = conteudo;
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function camada1_Fisica(msg) {
	await sleep(1000);
	console.log("Camada 1 (Física): " + msg.conteudo);
}

async function camada2_Enlace(msg) {
	await sleep(1000);
	msg.conteudo = "[Enlace]" + msg.conteudo;
	console.log("Camada 2 (Enlace): " + msg.conteudo);
	await camada1_Fisica(msg);
}

async function camada3_Rede(msg) {
	await sleep(1000);
	msg.conteudo = "[Rede]" + msg.conteudo;
	console.log("Camada 3 (Rede): " + msg.conteudo);
	await camada2_Enlace(msg);
}

async function camada4_Transporte(msg) {
	await sleep(1000);
	msg.conteudo = "[Transporte]" + msg.conteudo;
	console.log("Camada 4 (Transporte): " + msg.conteudo);
	await camada3_Rede(msg);
}

async function camada5_Sessao(msg) {
	await sleep(1000);
	msg.conteudo = "[Sessão]" + msg.conteudo;
	console.log("Camada 5 (Sessão): " + msg.conteudo);
	await camada4_Transporte(msg);
}

async function camada6_Apresentacao(msg) {
	await sleep(1000);
	msg.conteudo = "[Apresentação]" + msg.conteudo;
	console.log("Camada 6 (Apresentação): " + msg.conteudo);
	await camada5_Sessao(msg);
}

async function camada7_Aplicacao(msg) {
	await sleep(1000);
	msg.conteudo = "[Aplicação]" + msg.conteudo;
	console.log("Camada 7 (Aplicação): " + msg.conteudo);
	await camada6_Apresentacao(msg);
}

const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("Digite sua mensagem (máx 80 caracteres): ", async (entrada) => {
	if (entrada.length > 80) {
		entrada = entrada.substring(0, 80);
	}

	const msg = new Mensagem(entrada);
	await camada7_Aplicacao(msg);

	rl.close();
});
