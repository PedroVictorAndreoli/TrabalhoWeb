package org.example.validator;

import org.example.model.Conta;
import org.example.repository.ContaRepository;
import org.springframework.stereotype.Service;

@Service
public class ContaValidator {

    private final ContaRepository contaRepository;
    private String mensagem;

    public ContaValidator(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }


    public boolean isValid(Conta conta){
        if (!contaRepository.existsContaByAgenciaAndNumero(conta.getAgencia(), conta.getNumero()))
            return true;
            else {
                mensagem = "Agencia com numero repitido";
                return false;
        }
    }

    public String getMensagem() {
        return mensagem;
    }
}
