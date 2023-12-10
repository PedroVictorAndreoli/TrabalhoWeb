package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.enumList.SituacaoMovimentacao;
import org.example.enumList.TipoMovimentacao;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movimentacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @NotNull
    @JoinColumn(name = "conta_id", referencedColumnName = "id")
    private Conta conta;
    @NotNull
    private double valor;
    @NotNull
    private LocalDate dataMovimentacao;
    @NotNull
    private String categoria;
    private String descricao;
    @ManyToOne
    @JoinColumn(name = "conta_destino_id", referencedColumnName = "id")
    private Conta contaDestino;
    @NotNull
    @Enumerated(EnumType.STRING)
    private SituacaoMovimentacao situacaoMovimentacao;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipoMovimentacao;


}
