import './Recipe.css'
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { useTheme } from '../../hooks/useTheme'

export default function Recipe() {
    const {id} = useParams()
    const url = 'http://localhost:3000/recipes/'+ id
    const {data:recipe, isPending, error} = useFetch(url)
    const history = useNavigate()
    const {mode} = useTheme()

    useEffect(() => {
        if (error){
            setTimeout(() => {
                history('/')
            }, 2000)
        }
    }, [error, history])
    
    return (
        <div className={`recipe ${mode}`}>
        {isPending && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {recipe && (
            <>
                <h2 className='page-title'>{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to cook</p>
                <ul>
                    {recipe.ingredients.map(ing =>
                        <li key={ing}> {ing} </li>)}
                </ul>
                <p>Steps: {recipe.method}</p>
            </>
        )}
        </div>
    )
}
