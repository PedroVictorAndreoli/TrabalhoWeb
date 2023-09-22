package org.example.repository;

import org.example.model.Conta;
import org.example.model.Movimentacao;
import org.example.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

    List<Movimentacao> findMovimentacaoByConta(Conta conta);
}
