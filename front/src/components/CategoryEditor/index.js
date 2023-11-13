import { useEffect, useState } from 'react';
import './style.css';

function CategoryEditor(props) {
    const [category, setcategory] = useState({})
    const [classDiv, setClassDiv] = useState('editor editoroff')

    async function editCategory() {
        console.log(category)
        if (category._id === undefined) {
            let url = props.apiurl+'/api/categories'
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": category.name,
                    "description": category.description,
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
        }else{
            let url = props.apiurl+"/api/categories/"+category._id
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": category.name,
                    "description": category.description,
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
        props.getCategoryList();
    }

    async function deleteCategory(){
        
        let url = props.apiurl+"/api/categories/"+category._id
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
            alert('Não foi possível Excluir')
            return;
        }
        props.setEnable(false);
        props.getCategoryList();
    }



    useEffect(() => {
        if (!props.Enable) {
            setClassDiv('editor editoroff')
        } else {
            setClassDiv('editor')
        }
    }, [props.Enable])

    useEffect(() => {
        setcategory(props.ListCategory.filter((item) => item._id === category._id)[0] || {})
    }, [category._id, props.ListCategory])

    return (
        <div className={classDiv}>
            <div className='form'>
                <div className='field'>
                    <select value={category._id} id='produtoPreco' name='cat' onChange={(e) => setcategory({ ...category, _id: e.target.value })}>
                        <option key='1' value=''>Incluir Nova</option>
                        {props.ListCategory.map((categoria) => {
                            return (
                                <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='field'>
                    <label id='name' >Nome:</label>
                    <input value={category.name} id='name' name='name' type='text' onChange={(e) => setcategory({ ...category, name: e.target.value })}></input>
                </div>
                <div className='field'>
                    <label id='produtoDescricao' >Descrição:</label>
                    <textarea value={category.description} id='produtoDescricao' name='desc' type='text' onChange={(e) => setcategory({ ...category, description: e.target.value })}></textarea>
                </div>
                <div className='buttons'>
                    <button onClick={editCategory}>Salvar</button>
                    <button onClick={deleteCategory}>Excluir</button>
                    <button onClick={() => props.setEnable(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default CategoryEditor;