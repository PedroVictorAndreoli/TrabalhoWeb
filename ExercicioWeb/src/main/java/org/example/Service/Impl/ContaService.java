package org.example.Service.Impl;

import org.example.Service.IContaService;
import org.example.model.Conta;
import org.example.repository.ContaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContaService  extends CrudService<Conta, Long>
        implements IContaService{

    private final ContaRepository contaRepository;

    public ContaService(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }


    @Override
    protected JpaRepository<Conta, Long> getRepository() {
        return contaRepository;
    }

    public Conta findContaByAgenciaAndNumero(String agencia, String numero){
        List<Conta> contas = new ArrayList<>();
        contas = contaRepository.findAll();
        contas.stream().filter(conta1 -> conta1.getAgencia().equals(agencia) && conta1.getNumero().equals(numero)).findFirst().stream().toList();
        return contas.get(0);
    }
}
