import "./Emprestimo.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useFetcher } from "react-router-dom";


function Emprestimos() {


    const[emprestimos, setEmprestimos] = useState([]);

    function getEmprestimos() {
        axios.get("http://localhost:5073/emprestimos").then((resposta) => {
            setEmprestimos(resposta.data);
        });
    }

    function excluirEmprestimo(id){
        axios.delete("http://localhost:5073/emprestimos/" + id)
        .then(()=>{
        getEmprestimos();
        });
    }

    useEffect(getEmprestimos, []);  

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
            <tr>
                <td>{id}</td>
                <td>{livros}</td>
                <td>{usuario}</td>
                <td>{dataEmprestimo}</td>
                <td>{dataDevolucao}</td>
                <td>
                    <button onClick={() => { excluirEmprestimo(id); }}>Excluir</button>
                    <button>Editar</button>
                </td>
            </tr>
        );
    }   

    function getLinhas() {

        const linhasDaTabela = [];

        for(let i = 0; i < emprestimos.length; i++) {

            const emprestimo = emprestimos[i];

            linhasDaTabela [i] = getLinha(emprestimo.id, emprestimo.livros, emprestimo.usuario, 
            emprestimo.dataEmprestimo, emprestimo.dataDevolucao);
        }

        return linhasDaTabela;
    }

    function getTabela() {
        return (
            <table>
                <tr>
                    <th>ID</th>
                    <th>Livro</th>
                    <th>Usuario</th>
                    <th>Data de Emprestimo</th>
                    <th>Data de Devolucao</th>
                    <th>Ações</th>
                </tr>
                {getLinhas()}
            </table>
        );
    }

}

export default Emprestimos;