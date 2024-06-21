import "./Emprestimo.css";
import axios from 'axios';
import { useState, useEffect } from 'react';


function Emprestimos() {

    const [emprestimos, setEmprestimos] = useState([]);
    const [emprestimo, setEmprestimo] = useState(null);

    function getEmprestimos() {
        axios.get("http://localhost:5073/emprestimos").then((resposta) => {
            setEmprestimos(resposta.data);
        });
    }

    useEffect(getEmprestimos, []);

    function excluirEmprestimo(id) {
        axios.delete("http://localhost:5073/emprestimos/" + id)
            .then(() => {
                getEmprestimos();
            });
    }

    function editarEmprestimo(emprestimo) {
        setEmprestimo(emprestimo);
    }

    function novoEmprestimo() {
        setEmprestimo({
            dataEmprestimo: "",
            dataDevolucao: "",
            livro: ""
        });
    }

    function cancelar() {
        setEmprestimo(null);
    }

    function refresh() {
        cancelar();
        getEmprestimos();
    }

    function getConteudo() {
        if (emprestimo == null) {
            return (
                <>
                    <button onClick={() => { novoEmprestimo(); }}> Novo Emprestimo </button>
                    {getTabela()}
                </>
            );
        } else {
            return getFormulario();
        }
    }

    function salvarEmprestimo() {
        if (emprestimo.id) {
            axios.put("http://localhost:5073/emprestimos/" + emprestimo.id, emprestimo).then(() => { refresh(); });
        } else {
            axios.post("http://localhost:5073/emprestimos", emprestimo).then(() => { refresh(); });
        }
    }

    function onChangeEmprestimo(campo, valor, id) {
        emprestimo[campo] = valor;
        setEmprestimo({
            ...emprestimo,
        });
    }

    function getFormulario() {
        return <>
            <form action="">
                <br />
                <input placeholder="Livro" type="text" id="livro" name="livro" value={emprestimo.livro}
                    onChange={(e) => { onChangeEmprestimo(e.target.name, e.target.value, emprestimo.id) }} />
                <br />
                <input placeholder="Data Emprestimo" type="text" id="dataEmprestimo" name="dataEmprestimo" value={emprestimo.dataEmprestimo}
                    onChange={(e) => { onChangeEmprestimo(e.target.name, e.target.value, emprestimo.id) }} />
                <br />
                <input placeholder="Data de Devolucao" type="text" id="dataDevolucao" name="dataDevolucao" value={emprestimo.dataDevolucao}
                    onChange={(e) => { onChangeEmprestimo(e.target.name, e.target.value, emprestimo.id) }} />

                <button onClick={() => { salvarEmprestimo(); }}>Salvar</button>
                <button onClick={() => { cancelar(); }}>Cancelar</button>
            </form>
        </>
    }

    function getLinha(emprestimo) {
        return (
            <tr>
                <td>{emprestimo.id}</td>
                <td>{emprestimo.dataEmprestimo}</td>
                <td>{emprestimo.dataDevolucao}</td>
                <td>{emprestimo.livro}</td>
                <td>
                    <button onClick={() => { excluirEmprestimo(emprestimo.id) }}>Excluir</button>
                    <button onClick={() => { editarEmprestimo(emprestimo) }}>Editar</button>
                </td>
            </tr>
        );
    }

    function getLinhas() {
        const linhasDaTabela = [];
        for (let i = 0; i < emprestimos.length; i++) {
            const emprestimo = emprestimos[i];
            linhasDaTabela[i] = getLinha(emprestimo);
        }
        return linhasDaTabela;

    }

    function getTabela() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data de Emprestimo</th>
                        <th>Data de Devolucao</th>
                        <th>Livro</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {getLinhas()}
                </tbody>
            </table>
        );
    }

    return (
        <>
            <h1>Emprestimos</h1>
            {getConteudo()}
        </>
    );
}

export default Emprestimos;