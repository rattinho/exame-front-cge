import { useEffect, useState } from 'react'
import './style.css'

//components
import ProductEditor from '../../components/ProductEditor'
import CategoryEditor from '../../components/CategoryEditor'

function Home() {

    const [products, setProducts] = useState([])
    const [ListCategory, setListCategory] = useState([])
    const [filtros, setFilter] = useState({ category: '' })
    const [productSelected, setProductSelected] = useState({})
    const [isEditingProd, setisEditingProd] = useState(false)
    const [isEditingCat, setisEditingCat] = useState(false)


    async function getProducts(category) {
        let url;
        if (category == null || category === '') {
            url = 'http://'+process.env.REACT_APP_APIURL+'/api/categories/products';
        } else {
            url = 'http://'+process.env.REACT_APP_APIURL+`/api/categories/${category}/products`;
        }

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.statusText}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error("ERROR:", err);
        }
    }

    async function getCategoryList() {
        let url = 'http://'+process.env.REACT_APP_APIURL+'/api/categories'
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.statusText}`);
            }

            const data = await response.json();
            setListCategory(data);
        } catch (err) {
            console.error("ERROR:", err);
        }

    }

    useEffect(() => {
        getProducts();
        getCategoryList();
    }, [])

    useEffect(() => {
        getProducts(filtros.category)
    }, [filtros])

    return (
        <div className='body'>
            <CategoryEditor ListCategory={ListCategory} Enable={isEditingCat} setEnable={setisEditingCat} getCategoryList={getCategoryList} apiurl={'http://'+process.env.REACT_APP_APIURL}/>
            <ProductEditor ListCategory={ListCategory} product={productSelected} Enable={isEditingProd} setEnable={setisEditingProd} getProducts={getProducts} apiurl={'http://'+process.env.REACT_APP_APIURL}/>
            <h1> Lista de Produtos </h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((produto) => {
                        return (
                            <tr key={produto._id} onClick={() => { setisEditingProd(true); setProductSelected(produto) }}>
                                <td>{produto.name}</td>
                                <td>{produto.description}</td>
                                <td>R$ {produto.price}</td>
                                <td>{ListCategory.length > 0 ? (ListCategory.filter((categoria) => categoria._id === produto.categoryId)[0]?.name || 'Não Definida') : 'Não Definida'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='topMenu'>
                <div>
                    <button onClick={() => { setisEditingProd(true); setProductSelected(null) }}>+ Produto</button>
                    <button onClick={() => { setisEditingCat(true)}}>Editar Categorias</button>
                </div>
                <select value={filtros.category} onChange={(e) => setFilter({ category: e.target.value })}>
                    <option key='1' value=''>Todas as Categorias</option>
                    {ListCategory.map((categoria) => {
                        return (
                            <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
                        )
                    })}
                </select>
            </div>
            <span>
                Para editar algum produto, basta clicar em cima do mesmo!
            </span>
        </div>
    )

}
export default Home;