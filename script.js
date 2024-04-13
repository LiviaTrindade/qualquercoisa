
// Validação

function validarCurso(idNomeCurso, idCodCurso, idCoordenador, idDuracao, idArea, idNivel) {
    let nome = document.getElementById(idNomeCurso).value;
    let codigo = document.getElementById(idCodCurso).value;
    let coordenador = document.getElementById(idCoordenador).value;
    let duracao = document.getElementById(idDuracao).value;
    let area = document.getElementById(idArea).value;
    let nivel = document.getElementById(idNivel).value;

    if (nome == "")
        alert("Nome do curso não pode estar em branco!");
    else if (codigo == "")
        alert("Código não pode estar em branco!");
    else if (coordenador == "")
        alert("Coordenador não pode estar em branco!");
    else if (duracao == "")
        alert("Duração não pode estar em branco!");
    else if (area == "")
        alert("Área não pode estar em branco!");
    else if (nivel == "")
        alert("Nível não pode estar em branco!");
    else cadastrarCurso(nome, codigo, coordenador, duracao, area, nivel);
}

// Cadastro

function cadastrarCurso(curso, codig, coordenador, duracao, area, nivel) {
    let novoCurso = {nome:curso, codigo:codig, coordenador:coordenador, duracao:duracao, area:area, nivel:nivel};

    if (typeof(Storage) !== "undefined") {
        let cursos = localStorage.getItem("cursos");
        if (cursos == null) cursos = [];
        else cursos = JSON.parse(cursos);
        cursos.push(novoCurso);
        localStorage.setItem("cursos",JSON.stringify(cursos))
        alert("Foi cadastrado com sucesso "+curso+"");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    }
    else alert("A versão do seu navegador é antigo");
}

function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}

// Carregar

function carregarTotalCursos(idCampo) {
    if (typeof(Storage) !=="undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }

    else alert("A versão do seu navegador é antiga");
}

// Listar tudo
function listarCursos() {
    if (typeof(Storage) !== "undefined") {
        let cursos = localStorage.getItem("cursos");
        document.write(`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-size: 20px;
                    font-family: 'Poppins', sans-serif;
                    color: black;
                }

                .table-title {
                    padding-bottom: 0px;
                    background-color: #006fca;
                    color: white;
                    padding: 15px 30px;
                    margin: 20px -25px 10px;
                    border-radius: 3px 3px 0 0;
                    text-align: center;
                }
                
                .table-title h2 {
                    margin: 0 auto; 
                    display: inline-block; 
                    font-size: 28px;
                }

                .container {
                    justify-content: center; 
                    align-items: center; 
                    text-align: left;
                    background-image: url('images/4907157.jpg'); 
                    background-position: center; 
                    padding: 20px;
                    color: #fff; 
                }
                

                .card-wrapper {
                    display: flex; 
                    flex-wrap: wrap; 
                    justify-content: space-between;
                }
                
                .card {
                    width: calc(30% - 20px); 
                    margin-bottom: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                @media screen and (max-width: 992px) {
                    .card {
                        width: calc(47% - 20px); 
                    }
                }
                
                @media screen and (max-width: 576px) {
                    .card {
                        width: 100%; 
                        margin-bottom: 20px;
                    }
                }
                
                
                

                .card-img-top {
                    width: 100%;
                    height: auto;
                    border-radius: 5px 5px 0 0;
                }

                .card-body {
                    padding: 10px;
                }

                .list-group-item {
                    padding: 5px 10px;
                    border: none;
                    background-color: transparent;
                }

                .list-group {
                    list-style: none; 
                }
                

                .edit,
                .delete {
                    margin-right: 10px;
                    color: #007bff; 
                }

                .edit:hover,
                .delete:hover {
                    text-decoration: none;
                    color: #0056b3; 
                }

                @media screen and (max-width: 992px) {
                    .card {
                        width: calc(47% - 20px); 
                    }
                }

                @media screen and (max-width: 576px) {
                    .card {
                        width: 100%; 
                    }
                }
            </style>
            <div class="container">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Gestão de Cursos</h2>
                            </div>
                            <div class="col-sm-6">
                                <a href="cadastro.html" class="btn btn-back">Cadastrar Novo Curso</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        if (cursos == null)
            document.write("<h3>Nenhum curso cadastrado</h3>");
        else {
            cursos = JSON.parse(cursos);
            document.write(`<div class="container card-wrapper">`);
            cursos.forEach(curso => {
                document.write(`
                    <div class="card">
                        <img src="images/card.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"><b>${curso.nome}</b></h5>
                            <p class="card-text"></p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h6><b>Código de Referência:</b> ${curso.codigo}</h6></li>
                            <li class="list-group-item"><h6><b>Coordenador:</b> ${curso.coordenador}</h6></li>
                            <li class="list-group-item"><h6><b>Duração em meses:</b> ${curso.duracao}</h6></li>
                            <li class="list-group-item"><h6><b>Área do Curso:</b> ${curso.area}</h6></li>
                            <li class="list-group-item"><h6><b>Nível:</b> ${curso.nivel}</h6></li>
                        </ul>
                            <a href="#" class="edit"><i class="bi bi-pencil-fill"></i> Editar</a>
                            <a href="#" class="delete" onclick="apagarCurso('${curso.codigo}')"><i class="bi bi-trash-fill"></i> Excluir</a>
                    </div>
                `);
            });
            document.write(`</div>`);
        }
    } else {
        alert("A versão do seu navegador é antiga");
    }
}

// Função para apagar um curso
function apagarCurso(codigoCurso) {
    if (typeof(Storage) !== "undefined") {
        let cursos = JSON.parse(localStorage.getItem("cursos"));
        let index = cursos.findIndex(curso => curso.codigo === codigoCurso);
        if (index !== -1) {
            cursos.splice(index, 1);
            localStorage.setItem("cursos", JSON.stringify(cursos));
            location.reload();
        } else {
            alert("Curso não encontrado.");
        }
    } else {
        alert("A versão do seu navegador é antiga");
    }
}











