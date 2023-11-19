package org.example;

import org.example.enumList.TipoConta;
import org.example.model.Conta;
import org.example.model.Usuario;
import org.example.repository.ContaRepository;
import org.example.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ContaControllerTest {
    private static final String API_CONTAS = "/contas";
    @Autowired
    private TestRestTemplate testRestTemplate;
    @Autowired
    private ContaRepository usuarioRepository;
    public <T> ResponseEntity<T> postSignup(Object request, Class<T> responseType) {
        return testRestTemplate.postForEntity(API_CONTAS, request, responseType);
    }

    @Test
    public void post_quandoEValido_retorneOk(){
        Conta conta = criarContaValida();
        ResponseEntity<Object> response = postSignup(conta, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
    private Usuario criarUsuarioValido() {
        Usuario user = new Usuario();
        user.setUsername("test-user");
        user.setNome("test-display");
        user.setSenha("P4ssword");
        return user;
    }
    private Conta criarContaValida() {
        Conta conta = new Conta();
        conta.setUsuario(criarUsuarioValido());
        conta.setAgencia("dasdsad");
        conta.setNumero("12312312");
        conta.setSaldo(2.0);
        conta.setBanco("dasdasdasd");
        conta.setTipoConta(TipoConta.ContaCorrente);
        return conta;
    }
}
