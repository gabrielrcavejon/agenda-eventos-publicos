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

INSERT INTO endereco (idcidade, logradouro, bairro, cep, numero)
VALUES (1, 'Rua das Flores', 'Centro', '80000-000', '123');

INSERT INTO endereco (idcidade, logradouro, bairro, cep, numero)
VALUES (2, 'Avenida Brasil', 'Jardim América', '80500-200', '450');

INSERT INTO endereco (idcidade, logradouro, bairro, cep, numero)
VALUES (3, 'Rua XV de Novembro', 'Batel', '80420-150', '789');

INSERT INTO endereco (idcidade, logradouro, bairro, cep, numero)
VALUES (1, 'Travessa dos Pioneiros', 'Água Verde', '80610-300', '55');

INSERT INTO endereco (idcidade, logradouro, bairro, cep, numero)
VALUES (3, 'Rua Curitiba', 'Rebouças', '80230-020', '999');

CREATE TABLE empresa (
	idempresa SERIAL PRIMARY KEY,
	idendereco INTEGER NOT NULL REFERENCES endereco(idendereco),
	nome VARCHAR(100) NOT NULL,
	fantasia VARCHAR(100),
	cnpj VARCHAR(20) UNIQUE NOT NULL,
	tipo CHAR(1) NOT NULL CHECK (tipo IN ('O','A'))
);

INSERT INTO empresa (nome, fantasia, cnpj, tipo, idendereco)
VALUES ('PREFEITURA MUNICIPAL', 'Prefeitura', '12345678000190', 'O', 3);

INSERT INTO empresa (nome, fantasia, cnpj, tipo, idendereco)
VALUES ('BANCO BANQUEIRO TOP', 'BankTop', '98765432000155', 'A', 2);

INSERT INTO empresa (nome, fantasia, cnpj, tipo, idendereco)
VALUES ('JOCE FERRAGENS', 'Joce Ferragens', '45678912000111', 'O', 1);


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

CREATE TABLE tema (
  idtema SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

INSERT INTO tema (nome) VALUES
('Tecnologia'),
('Esportes'),
('Música'),
('Gastronomia'),
('Negócios'),
('Educação'),
('Empreendedorismo'),
('Arte'),
('Startup'),
('Saúde e Bem-estar');

CREATE TABLE evento_tema (
  idevento INT NOT NULL REFERENCES evento(idevento) ON DELETE CASCADE,
  idtema INT NOT NULL REFERENCES tema(idtema) ON DELETE CASCADE,
  PRIMARY KEY (idevento, idtema)
);

INSERT INTO usuario (idempresa, tipo, nome, email, senha, telefone, foto)
VALUES (2, 'O', 'Gabriel Rodrigo Cavejon', 'gabriel.cavejon@hotmail.com', '$2b$10$hRk.0cQ7BX4mLOPkd2GD1utODZDHj6mEmsiNy3Tf6jsyXnfWOXtsW', '41999990000', NULL);

INSERT INTO usuario (idempresa, tipo, nome, email, senha, telefone, foto)
VALUES (3, 'O', 'Jocemar Rodrigues Duarte', 'jocemar@example.com', '$2b$10$hRk.0cQ7BX4mLOPkd2GD1utODZDHj6mEmsiNy3Tf6jsyXnfWOXtsW', '41988887777', NULL);

INSERT INTO usuario (idempresa, tipo, nome, email, senha, telefone, foto)
VALUES (1, 'A', 'Laura Silvestrin Eschembach', 'laura@hotmail.com', '$2b$10$hRk.0cQ7BX4mLOPkd2GD1utODZDHj6mEmsiNy3Tf6jsyXnfWOXtsW', '41977776666', NULL);

