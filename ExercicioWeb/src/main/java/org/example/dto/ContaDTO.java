package org.example.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.example.enumList.TipoConta;
import org.example.model.Usuario;
import org.springframework.beans.factory.annotation.Value;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContaDTO {

    private Long id;
    @NotNull
    private String numero;
    @NotNull
    private String agencia;
    @NotNull
    private String banco;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoConta tipoConta;
    private Usuario usuario;
    @NotNull
    private double saldo;
}
