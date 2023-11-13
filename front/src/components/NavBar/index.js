import { Link } from 'react-router-dom';
import './style.css'

const links = [
    {Link: 'Instagram', URL: 'https://www.instagram.com.br'},
    {Link: 'FaceBook', URL: 'https://www.instagram.com.br'},
    {Link: 'GitHub', URL: 'https://www.instagram.com.br'},
]

function Navbar(){
    return(
        <div className='header'>
            <h1>Exame-CGE</h1>
            <div className='redes-sociais'>
            {links.map((link)=>{
                return(
                    <Link key={link.Link} to={link.URL} target='blank'>{link.Link}</Link>
                )
            })}
            </div>
        </div>
    )
}

export default Navbar;