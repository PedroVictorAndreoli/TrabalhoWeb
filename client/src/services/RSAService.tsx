import React, { useEffect, useState } from 'react';
import * as forge from 'node-forge';

const RSAKeyGenerator: React.FC = () => {
    const [publicKey, setPublicKey] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');

    useEffect(() => {
        const generateRSAKeyPair = () => {
            const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

            const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
            const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

            setPublicKey(publicKeyPem);
            setPrivateKey(privateKeyPem);
        };

        generateRSAKeyPair();
    }, []);

    return (
        <div>
            <h2>Chave Pública:</h2>
            <pre>{publicKey}</pre>

            <h2>Chave Privada:</h2>
            <pre>{privateKey}</pre>
        </div>
    );
}

export default RSAKeyGenerator;