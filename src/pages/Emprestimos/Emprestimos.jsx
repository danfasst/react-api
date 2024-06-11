import "./Emprestimo.css";
import axios from 'axios';
import { useState, useEffect, useInsertionEffect } from 'react';


function Emprestimos() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [livros, setLivros] = useState([]);

    function getEmprestimos() {
        axios.get("http://localhost:5073/emprestimos").then((resposta) => {
            setEmprestimos(resposta.data);
        });
    }

    function getUsuarios() {
        axios.get("http://localhost:5073/usuarios").then((resposta) => {
            setUsuarios(resposta.data);
        });
    }

    function getLivros() {
        axios.get("http://localhost:5073/livros").then((resposta) => {
            setLivros(resposta.data)
        });
    }

    function excluirEmprestimo(id) {
        axios.delete("http://localhost:5073/emprestimos/" + id)
            .then(() => {
                getEmprestimos();
            });
    }

    useEffect(getEmprestimos, []);
    useEffect(getUsuarios, []);
    useEffect(getLivros, []);

    return (
        <>
            <h1>Emprestimos</h1>
            <form action="">
                <input placeholder="Livro" type="text" id="livro" />
                <br />
                <input placeholder="Usuario" type="text" id="usuario" />
                <br />
                <input placeholder="Data Emprestimo" type="text" id="dataEmprestimo" />
                <br />
                <input placeholder="Data de Devolucao" type="text" id="dataDevolucao" />

                <button type="submit">Fazer Empréstimo</button>
            </form>
            {getTabela()}
        </>
    );

    function getLinha(id, livros, usuario, dataEmprestimo, dataDevolucao) {
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{livros}</td>
                <td>{usuario}</td>
                <td>{dataEmprestimo}</td>
                <td>{dataDevolucao}</td>
                <td>
                    <button onClick={() => excluirEmprestimo(id)}>Excluir</button>
                    <button>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhas() {
        return emprestimos.map((emprestimo) => {
            const usuario = usuarios.find((usuario) => usuario.id > 0);
            const livro = livros.find((livro) => livro.nome);
            return getLinha(emprestimo.id, livro.nome, usuario.id, emprestimo.dataEmprestimo, emprestimo.dataDevolucao);
        });
    }

    function getTabela() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Livro</th>
                        <th>Usuario</th>
                        <th>Data de Emprestimo</th>
                        <th>Data de Devolucao</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {getLinhas()}
                </tbody>
            </table>
        );
    }
}

export default Emprestimos;