import { useEffect, useState } from 'react';
import './style.css';

function ProductEditor(props) {
    const [product, setProduct] = useState({})
    const [classDiv, setClassDiv] = useState('editor editoroff')

    useEffect(() => {
        var product = props.product || {}
        setProduct({
            _id: product._id || '',
            name: product.name || '',
            description: product.description || '',
            price: product.price || '',
            categoryId: product.categoryId || ''
        })
    }, [props.product])


    useEffect(() => {
        if (!props.Enable) {
            setClassDiv('editor editoroff')
        } else {
            setClassDiv('editor')
        }
    }, [props.Enable])


    async function editProduct() {
        if (product._id !== '') {
            let url = props.apiurl + '/api/products/' + product._id;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": product.name,
                    "description": product.description,
                    "price": product.price,
                    "categoryId": product.categoryId,
                }),
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.statusText}`);
                }
            } catch (err) {
                console.error("ERROR:", err);
                return;
            }
            props.setEnable(false);
        } else {
            let url = props.apiurl + `/api/categories/${product.categoryId}/products`
            console.log(url)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": product.name,
                    "description": product.description,
                    "price": product.price,
                }),
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.statusText}`);
                }
            } catch (err) {
                alert('Preencha devidamente todos os campos!')
                return;
            }
            props.setEnable(false);
        }

        props.getProducts();
    }

    async function deleteProduct() {
        let url = props.apiurl + '/api/products/' + product._id;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.statusText}`);
            }
        } catch (err) {
            console.error("ERROR:", err);
        }

        props.setEnable(false);
        props.getProducts();
    }

    return (
        <div className={classDiv}>
            <div className='form'>
                <input value={product._id} id='produtoId' name='name' type='hidden' ></input>
                <div className='field'>
                    <label id='produtoNome' >Nome:</label>
                    <input value={product.name} id='produtoNome' name='name' type='text' onChange={(e) => setProduct({ ...product, name: e.target.value })}></input>
                </div>
                <div className='field'>
                    <label id='produtoDescricao' >Descrição:</label>
                    <textarea value={product.description} id='produtoDescricao' name='desc' type='text' onChange={(e) => setProduct({ ...product, description: e.target.value })}></textarea>
                </div>
                <div className='field'>
                    <label id='produtoPreco' >Preço do Produto (R$):</label>
                    <input value={product.price} id='produtoPreco' name='price' type='number' onChange={(e) => setProduct({ ...product, price: e.target.value })}></input>
                </div>
                <div className='field'>
                    <label id='produtoCategoria' >Categoria do Produto:</label>
                    <select value={product.categoryId} id='produtoPreco' name='cat' onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}>
                        <option key='1' value=''>Selecione a categoria</option>
                        {props.ListCategory.map((categoria) => {
                            return (
                                <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='buttons'>
                    <button onClick={editProduct}>Salvar</button>
                    <button onClick={deleteProduct}>Excluir</button>
                    <button onClick={() => props.setEnable(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ProductEditor;
