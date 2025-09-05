import css from "../styles/page/home.module.css"
import { useEffect, useState } from "react"
import getRequest from "../utils/getRequest"
import postRequest from "../utils/postRequest"
import ProductComponent from "../components/Product.component"

function Home() {
    const url = "http://localhost:3001"
    const [produtos, setProdutos] = useState([])
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")

    async function addProduto() {
        if (isNaN(Number(preco))) {
            alert("Preço não é um numero!")
            return
        }
        const produto = { name: nome, price: preco }
        await postRequest(url + "/product", produto)
    }

    async function findProducts() {
        const response = await getRequest(url + "/product") as any
        setProdutos(response.products)
    }

    useEffect(() => {
        findProducts()
    }, [produtos])

    return (
        <main className={css.main}>
            <h1>Lista de Compras</h1>
            <div className={css.insert}>
                <div>
                    <input type="text" required={true} placeholder="nome*" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="text" required={true} placeholder="preco*" value={preco} onChange={(e) => setPreco(e.target.value)} />
                </div>
                <button onClick={addProduto}>Adicionar Produto</button>
            </div>
            <div className={css.select}>
                {produtos.map((produto: any, index: number) => <ProductComponent produto={produto} key={index} /> )}
            </div>
        </main>
    )
}

export default Home