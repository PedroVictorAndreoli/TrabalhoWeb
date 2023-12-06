package org.example.Service.Impl;

import org.example.model.Conta;
import org.example.model.Usuario;
import org.example.repository.ContaRepository;
import org.example.repository.UsuarioRepository;
import org.example.Service.IMovimentacaoService;
import org.example.model.Movimentacao;
import org.example.repository.MovimentacaoRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovimentacaoService extends CrudService<Movimentacao, Long>
        implements IMovimentacaoService{

    private final MovimentacaoRepository movimentacaoRepository;
    private final UsuarioRepository usuarioRepository;

    private final ContaRepository contaRepository;

    public MovimentacaoService(MovimentacaoRepository movimentacaoRepository, UsuarioRepository usuarioRepository, ContaRepository contaRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
        this.usuarioRepository = usuarioRepository;
        this.contaRepository = contaRepository;
    }
    protected void movimentaSaldoConta(Movimentacao movimentacao){
        Conta conta =  contaRepository.findContaById(movimentacao.getConta().getId());
        if(movimentacao.getTipoMovimentacao().toString().equals("TransferenciaContasSaida") || movimentacao.getTipoMovimentacao().toString().equals("Despesa"))
            conta.setSaldo(conta.getSaldo() - movimentacao.getValor());
        else if(movimentacao.getTipoMovimentacao().toString().equals("TransferenciaContasEntrada") || movimentacao.getTipoMovimentacao().toString().equals("Receita"))
            conta.setSaldo(conta.getSaldo() + movimentacao.getValor());
        contaRepository.save(conta);
    }

    @Override
    public Movimentacao save(Movimentacao entity) throws Exception {
        movimentaSaldoConta(entity);
        return super.save(entity);
    }

    @Override
    protected JpaRepository<Movimentacao, Long> getRepository() {
        return movimentacaoRepository;
    }

    @Override
    public List<Movimentacao> findAll(){
        Usuario user = usuarioRepository.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        List<Conta> contas = contaRepository.findContaByUsuario(user);
        List<Movimentacao> movimentacaos = new ArrayList<>();
        contas.forEach(conta -> {
            movimentacaoRepository.findMovimentacaoByConta(conta).forEach(movimentacao -> {
                movimentacaos.add(movimentacao);
            });
        });
        //return contaRepository.findAll().stream().filter(conta -> conta.getUsuario() == user).collect(Collectors.toList());
        return movimentacaos;
    }

    @Override
    public void delete(Long id) {
        contaRepository.findContaById(id);
        contaRepository.deleteById(id);
    }
}
