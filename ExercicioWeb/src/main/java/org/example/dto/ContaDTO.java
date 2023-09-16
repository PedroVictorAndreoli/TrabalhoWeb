package org.example.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.example.enumList.TipoConta;
import org.example.model.Usuario;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContaDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    @Getter
    @Setter
    private UsuarioDTO usuario;
    @NotNull
    private String numero;
    @NotNull
    private String agencia;
    @NotNull
    private String banco;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoConta tipoConta;
}
