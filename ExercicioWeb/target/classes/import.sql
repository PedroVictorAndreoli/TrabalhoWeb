INSERT INTO usuario(nome, username, senha) VALUES ('Admin', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO usuario(nome, username, senha) VALUES ('Test', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO conta(usuario_id, numero, agencia,banco,tipo_Conta,saldo) VALUES ('1', 'test','dsadasd','sdasdsda','ContaCorrente',0);
INSERT INTO conta(usuario_id, numero, agencia,banco,tipo_Conta,saldo) VALUES ('2', 'test','dsadasd','sdasdsda','ContaCorrente',0);
INSERT INTO movimentacao(conta_id, valor, data_movimentacao,categoria,descricao,situacao_movimentacao,tipo_movimentacao) VALUES ('1', 2.00,'2012-09-17','sdasdsda','Cdasda','Pendente','Receita');
INSERT INTO movimentacao(conta_id, valor, data_movimentacao,categoria,descricao,situacao_movimentacao,tipo_movimentacao) VALUES ('2', 2.00,'2012-09-17','sdasdsda','Cdasda','Pendente','Receita');

