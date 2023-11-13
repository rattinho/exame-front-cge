import { Link } from 'react-router-dom';
import './style.css'

const links = [
    {Link: 'Linkedin', URL: 'https://www.linkedin.com/in/felipe-guimar%C3%A3es-ratto-633274219/'},
    {Link: 'GitHub', URL: 'https://github.com/rattinho'},
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