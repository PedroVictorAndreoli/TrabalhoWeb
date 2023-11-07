package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.example.enumList.TipoConta;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    @Getter
    @Setter
    private Usuario usuario;
    @NotNull
    private String numero;
    @NotNull
    private String agencia;
    @NotNull
    private String banco;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoConta tipoConta;
    @NotNull
    @Value("${some.key:0}")
    private double saldo;
}
