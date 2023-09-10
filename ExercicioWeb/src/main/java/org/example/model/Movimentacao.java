package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Conta conta;
    private double valor;
    private LocalDateTime data;
    private String categoria;
    private String descricao;
    private SituacaoMovimentacao situacaoMovimentacao;
    private TipoMovimentacao tipoMovimentacao;
}
