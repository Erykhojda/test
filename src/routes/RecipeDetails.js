import React from 'react'
import { useParams } from 'react-router-dom'

const RecipeDetails = () => {
    const { id } = useParams()

    return (
        <>
            <div>RecipeDetails</div>
            <h1>{id}</h1>
        </>
    )
}

export default RecipeDetails