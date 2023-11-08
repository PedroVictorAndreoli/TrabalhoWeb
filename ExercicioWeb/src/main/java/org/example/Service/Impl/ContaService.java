package org.example.Service.Impl;

import jakarta.persistence.Convert;
import org.example.model.Usuario;
import org.example.repository.UsuarioRepository;
import org.example.Service.IContaService;
import org.example.model.Conta;
import org.example.repository.ContaRepository;
import org.example.shared.GenericResponse;
import org.example.validator.ContaValidator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContaService  extends CrudService<Conta, Long>
        implements IContaService{

    private final ContaRepository contaRepository;
    private final UsuarioRepository usuarioRepository;
    private ContaValidator contaValidator;

    public ContaService(ContaRepository contaRepository, UsuarioRepository usuarioRepository, ContaValidator contaValidator) {
        this.contaRepository = contaRepository;
        this.usuarioRepository = usuarioRepository;
        this.contaValidator = contaValidator;
    }



    @Override
    protected JpaRepository<Conta, Long> getRepository() {
        return contaRepository;
    }

    @Override
    public Conta save(Conta conta) throws Exception {
        Usuario user = usuarioRepository.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        conta.setUsuario(user);
            if (contaValidator.isValid(conta))
                return super.save(conta);
            else
                throw new Exception(contaValidator.getMensagem());
    }

   @Override
    public List<Conta> findAll(){
       Usuario user = usuarioRepository.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
       //return contaRepository.findAll().stream().filter(conta -> conta.getUsuario() == user).collect(Collectors.toList());
       return contaRepository.findContaByUsuario(user);
   }
}
