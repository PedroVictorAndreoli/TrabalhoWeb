package org.example.repository;

import org.example.model.Conta;
import org.example.model.Movimentacao;
import org.example.model.Usuario;
import org.example.repository.interfaces.ValorAndCategoriaMovimentacao;
import org.example.repository.interfaces.ValorMovimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

    List<Movimentacao> findMovimentacaoByConta(Conta conta);

    Movimentacao findMovimentacaoById(Long id);



    @Query(value =
            "SELECT SUM(M.VALOR) as VALOR, M.CATEGORIA as CATEGORIA FROM MOVIMENTACAO M " +
                    "INNER JOIN CONTA C ON C.ID = M.CONTA_ID " +
                    "WHERE  M.SITUACAO_MOVIMENTACAO = 'Pago' AND " +
                    "C.USUARIO_ID= :usuarioId "+
                    "GROUP BY CATEGORIA ORDER BY VALOR "
            , nativeQuery = true
    )
    List<ValorAndCategoriaMovimentacao> findValorAndCategoriaWhereSitucaoIsPagoGroupByCategoriaOrderByValor(Long usuarioId);

    @Query(value =
            "SELECT SUM(M.VALOR) as VALOR FROM MOVIMENTACAO M " +
                    "INNER JOIN CONTA C ON C.ID = M.CONTA_ID " +
                    "WHERE  M.SITUACAO_MOVIMENTACAO = 'Pendente' AND " +
                    "C.USUARIO_ID= :usuarioId AND " +
                    "(M.TIPO_MOVIMENTACAO = 'Despesa') "
            , nativeQuery = true
    )
    Double findValorWhereSituacaoIsPendenteSaida(Long usuarioId);

    @Query(value =
            "SELECT SUM(M.VALOR) as VALOR FROM MOVIMENTACAO M " +
                    "INNER JOIN CONTA C ON C.ID = M.CONTA_ID " +
                    "WHERE  M.SITUACAO_MOVIMENTACAO = 'Pendente' AND " +
                    "C.USUARIO_ID= :usuarioId AND " +
                    "(M.TIPO_MOVIMENTACAO = 'Receita') "
            , nativeQuery = true
    )
    Double findValorWhereSituacaoIsPendenteEntrada(Long usuarioId);

}
