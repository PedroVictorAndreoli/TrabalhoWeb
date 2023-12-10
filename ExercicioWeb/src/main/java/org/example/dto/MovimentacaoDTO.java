package org.example.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.enumList.SituacaoMovimentacao;
import org.example.enumList.TipoMovimentacao;
import org.example.model.Conta;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovimentacaoDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @NotNull
    private ContaDTO conta;
    @NotNull
    private double valor;
    @NotNull
    private LocalDate dataMovimentacao;
    @NotNull
    private String categoria;
    private String descricao;
    private Conta contaDestino;
    @NotNull
    @Enumerated(EnumType.STRING)
    private SituacaoMovimentacao situacaoMovimentacao;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipoMovimentacao;
}
