CREATE TABLE pais (
	idpais SERIAL PRIMARY KEY, 
	nome CHARACTER VARYING(100) NOT NULL
);

INSERT INTO pais(idpais, nome) VALUES(1, 'BRASIL');

CREATE TABLE estado (
	idestado SERIAL PRIMARY KEY,
	idpais INTEGER NOT NULL REFERENCES pais(idpais) ON DELETE CASCADE,
	nome CHARACTER VARYING(100) NOT NULL
);	

INSERT INTO estado(idestado, idpais, nome) VALUES(1, 1, 'PARANÁ');

CREATE TABLE cidade (
	idcidade SERIAL PRIMARY KEY,
	idestado INTEGER NOT NULL REFERENCES estado(idestado) ON DELETE CASCADE,
	nome CHARACTER VARYING(100) NOT NULL
);

INSERT INTO cidade(idcidade, idestado, nome) VALUES(1, 1, 'DOIS VIZINHOS');
INSERT INTO cidade(idcidade, idestado, nome) VALUES(2, 1, 'FRANCISCO BELTRÃO');
INSERT INTO cidade(idcidade, idestado, nome) VALUES(3, 1, 'PATO BRANCO');

CREATE TABLE endereco (
	idendereco SERIAL PRIMARY KEY,
	idcidade INTEGER NOT NULL REFERENCES cidade(idcidade),
	logradouro VARCHAR(255) NOT NULL,
	bairro VARCHAR(100),
	cep VARCHAR(20),
	numero VARCHAR(20)
);

CREATE TABLE empresa (
	idempresa SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	fantasia VARCHAR(100),
	cnpj VARCHAR(20) UNIQUE NOT NULL,
	tipo CHAR(1) NOT NULL CHECK (tipo IN ('O','A'))
);

CREATE TABLE usuario (
	idusuario SERIAL PRIMARY KEY,
	idempresa INTEGER NOT NULL REFERENCES empresa(idempresa),
	tipo CHAR(1) NOT NULL CHECK (tipo IN ('A','O','P')),
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	senha VARCHAR(100) NOT NULL,
	telefone VARCHAR(50),
	foto TEXT
);

CREATE TABLE evento (
	idevento SERIAL PRIMARY KEY,
	idempresa INTEGER NOT NULL REFERENCES empresa(idempresa),
	idendereco INTEGER NOT NULL REFERENCES endereco(idendereco),
	idusuariocriacao INTEGER NOT NULL REFERENCES usuario(idusuario),
	nome VARCHAR(100) NOT NULL,
	status CHAR(1) NOT NULL CHECK (status IN ('A','P','R')),
	descricao TEXT,
	imagem TEXT,
	datahorainicio TIMESTAMP NOT NULL,
	datahorafim TIMESTAMP
);