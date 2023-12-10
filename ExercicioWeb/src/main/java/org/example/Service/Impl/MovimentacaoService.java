package org.example.Service.Impl;

import org.example.enumList.TipoMovimentacao;
import org.example.model.Conta;
import org.example.model.Usuario;
import org.example.repository.ContaRepository;
import org.example.repository.UsuarioRepository;
import org.example.Service.IMovimentacaoService;
import org.example.model.Movimentacao;
import org.example.repository.MovimentacaoRepository;
import org.example.repository.interfaces.ValorAndCategoriaMovimentacao;
import org.example.repository.interfaces.ValorMovimentacao;
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
        if((movimentacao.getTipoMovimentacao().toString().equals("TransferenciaContasSaida") || movimentacao.getTipoMovimentacao().toString().equals("Despesa"))&& movimentacao.getSituacaoMovimentacao().toString().equals("Pago"))
            conta.setSaldo(conta.getSaldo() - movimentacao.getValor());
        else if(movimentacao.getTipoMovimentacao().toString().equals("TransferenciaContasEntrada") || movimentacao.getTipoMovimentacao().toString().equals("Receita")&& movimentacao.getSituacaoMovimentacao().toString().equals("Pago"))
            conta.setSaldo(conta.getSaldo() + movimentacao.getValor());
        contaRepository.save(conta);
    }

    protected void movimentaSaldoConta(Movimentacao movimentacao,Conta conta1){
        Conta conta =  contaRepository.findContaById(conta1.getId());
        if(movimentacao.getTipoMovimentacao().toString().equals("TransferenciaContasSaida") && movimentacao.getSituacaoMovimentacao().toString().equals("Pago"))
            conta.setSaldo(conta.getSaldo() - movimentacao.getValor());
        else if(movimentacao.getTipoMovimentacao().toString().equals("TransferenciaContasEntrada") && movimentacao.getSituacaoMovimentacao().toString().equals("Pago"))
            conta.setSaldo(conta.getSaldo() + movimentacao.getValor());
        contaRepository.save(conta);
    }
    protected void movimentaSaldoContaDelete(Movimentacao movimentacao){
        Conta conta =  contaRepository.findContaById(movimentacao.getConta().getId());
        if(movimentacao.getTipoMovimentacao().toString().equals("TransferenciaContasSaida") || movimentacao.getTipoMovimentacao().toString().equals("Despesa")&& movimentacao.getSituacaoMovimentacao().toString().equals("Pago"))
            conta.setSaldo(conta.getSaldo() + movimentacao.getValor());
        else if(movimentacao.getTipoMovimentacao().toString().equals("TransferenciaContasEntrada") || movimentacao.getTipoMovimentacao().toString().equals("Receita")&& movimentacao.getSituacaoMovimentacao().toString().equals("Pago"))
            conta.setSaldo(conta.getSaldo() - movimentacao.getValor());
        contaRepository.save(conta);
    }
    @Override
    public Movimentacao save(Movimentacao entity) throws Exception {
        if (entity.getContaDestino() == null){
        movimentaSaldoConta(entity);
        }else{
            Movimentacao movimentacaoDestino = new Movimentacao();
            movimentacaoDestino.setDataMovimentacao(entity.getDataMovimentacao());
            if(entity.getTipoMovimentacao().toString().equals("TransferenciaContasSaida") )
                movimentacaoDestino.setTipoMovimentacao(TipoMovimentacao.TransferenciaContasEntrada);
            else
                movimentacaoDestino.setTipoMovimentacao(TipoMovimentacao.TransferenciaContasSaida);
            movimentacaoDestino.setSituacaoMovimentacao(entity.getSituacaoMovimentacao());
            movimentacaoDestino.setCategoria(entity.getCategoria());
            movimentacaoDestino.setDescricao(entity.getDescricao());
            movimentacaoDestino.setValor(entity.getValor());
            movimentacaoDestino.setConta(entity.getContaDestino());
            movimentacaoDestino.setContaDestino(entity.getConta());
            movimentaSaldoConta(entity);
            movimentaSaldoConta(entity,entity.getContaDestino());
            super.save(movimentacaoDestino);
        }
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
        movimentaSaldoContaDelete(movimentacaoRepository.findMovimentacaoById(id));
        movimentacaoRepository.deleteById(id);
    }
    public List<ValorAndCategoriaMovimentacao> findCategoriaMaisGasta(){
        Usuario user = usuarioRepository.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        return movimentacaoRepository.findValorAndCategoriaWhereSitucaoIsPagoGroupByCategoriaOrderByValor(user.getId());
    }

    public Double findPendente(){
        Usuario user = usuarioRepository.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (movimentacaoRepository.findValorWhereSituacaoIsPendenteEntrada(user.getId()) == null
                && movimentacaoRepository.findValorWhereSituacaoIsPendenteSaida(user.getId()) == null) {
            return 0.0;
        } else if (movimentacaoRepository.findValorWhereSituacaoIsPendenteEntrada(user.getId()) == null
                && movimentacaoRepository.findValorWhereSituacaoIsPendenteSaida(user.getId()) != null) {
            return -movimentacaoRepository.findValorWhereSituacaoIsPendenteSaida(user.getId());
        }else if (movimentacaoRepository.findValorWhereSituacaoIsPendenteSaida(user.getId()) ==null &&
                movimentacaoRepository.findValorWhereSituacaoIsPendenteEntrada(user.getId()) != null)  {
            return movimentacaoRepository.findValorWhereSituacaoIsPendenteEntrada(user.getId());
        }else
        return movimentacaoRepository.findValorWhereSituacaoIsPendenteEntrada(user.getId())
                - movimentacaoRepository.findValorWhereSituacaoIsPendenteSaida(user.getId());
    }

    public Double saldoFuturo(){
        Usuario user = usuarioRepository.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Double saldoTotal =contaRepository.findContaByUsuario(user).stream()
                .mapToDouble(Conta::getSaldo)
                .filter(saldo -> !Double.isNaN(saldo))
                .sum();
        return  saldoTotal + findPendente();
    }
}
