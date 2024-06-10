import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Emprestimos from "./pages/Emprestimos/Emprestimos";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element = {<Layout> <Home /> </Layout>} />
                <Route path="/emprestimos" element = {<Layout> <Emprestimos /> </Layout>} />
            </Routes>
        </>
    );
}

export default App;