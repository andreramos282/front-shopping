import { useState } from "react"
import css from "../styles/page/home.module.css"
import deleteRequest from "../utils/deleteRequest"
import putRequest from "../utils/putRequest"

function ProductComponent(props: { produto: any }) {
    const url = "http://localhost:3001"
    const { produto } = props

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [nomeEdit, setNomeEdit] = useState("")
    const [precoEdit, setPrecoEdit] = useState("")

    async function saveProduct(id: string) {
        if (isNaN(Number(precoEdit))) {
            alert("Preço não é um numero!")
            return
        }
        const produto = {
            name: nomeEdit === "" ? undefined : nomeEdit,
            price: precoEdit === "" ? undefined : precoEdit
        }
        await putRequest(url + "/product/" + id, produto)
        setIsEdit(false)
        setNomeEdit("")
        setPrecoEdit("")
    }

    async function deleteProducts(id: string) {
        await deleteRequest(url + "/product/" + id)
    }

    return (
        <div>
            <div className={css.info}>
                <p>{produto.name} - R$ {produto.price}</p>
                <div>
                    <button className={css.edit} onClick={() => setIsEdit(!isEdit)}>Editar</button>
                    <button className={css.del} onClick={() => deleteProducts(produto._id)}>Deletar</button>
                </div>
            </div>
            {isEdit ?
                <div className={css.editDiv}>
                    <div>
                        <input type="text" placeholder="nome" value={nomeEdit} onChange={(e) => setNomeEdit(e.target.value)} />
                        <input type="text" placeholder="preco" value={precoEdit} onChange={(e) => setPrecoEdit(e.target.value)} />
                    </div>
                    <button onClick={() => saveProduct(produto._id)}>Salvar</button>
                </div>
                : <></>
            }
        </div>
    )
}

export default ProductComponent