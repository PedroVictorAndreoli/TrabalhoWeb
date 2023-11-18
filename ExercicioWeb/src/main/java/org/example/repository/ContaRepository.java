package org.example.repository;

import org.example.model.Conta;
import org.example.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContaRepository extends JpaRepository<Conta, Long> {


    Boolean existsContaByAgenciaAndNumero(String agencia, String numero);
    Conta findContaById(Long id);
    List<Conta> findContaByUsuario(Usuario usuario);
}
