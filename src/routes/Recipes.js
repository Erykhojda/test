import { useContext, useState, useEffect } from "react";
import CartContext from "../CartContext";
import image from '../assets/image.avif'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


import { Card, CardMedia, CardContent, Typography, CardActionArea, CardActions, Button, Backdrop } from '@mui/material';
import './Recipes.css'

import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'

function Recipes() {

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [switchRecipesCategory, setSwitchRecipesCategory] = useState('Public')

  const recipesCollectionRef = collection(db, "recipes")

  const { recipes, setRecipes, isAuth } = useContext(CartContext)
  const navigate = useNavigate();
  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRecipes();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
    console.log(item)
    navigate(`/recipes/${item.title}`)

  };

  const [cookies] = useCookies(['accessToken']);
  const id = cookies.accessToken;


  return (
    <div className="recipes">
      <h1>Recipes</h1>
      <Button onClick={() => setSwitchRecipesCategory("Public")}>Public</Button>
      <Button onClick={() => setSwitchRecipesCategory("Private")}>Private</Button>

      <div className="containerRecipes">

        {recipes.map((item, index) => {
          const recipes =
            <Card key={index} sx={{ maxWidth: 245, margin: 2 }}>
              <CardActionArea onClick={() => handleOpen(item)}>
                <CardMedia
                  component="img"
                  height="150"
                  image={item.imageUrl || image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={() => handleOpen(item)} size="small" color="primary">
                  See more
                </Button>
              </CardActions>
            </Card>
          if (isAuth && id === item.author.id && item.status === 'Private' || item.status === 'Public') {
            if (switchRecipesCategory === "Private" && item.status === 'Private') {
              return recipes
            } else if (switchRecipesCategory === "Public" && item.status === 'Public') {
              return recipes
            }
          } else if (isAuth && item.status === 'Public') {
            return recipes
          } else {
            return null
          }
        })}
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {selectedItem ? (
          <div className="recipeBox">
            <div className="imageContainer">
              <CardMedia
                component="img"
                height='250'
                image={selectedItem.imageUrl || image}
                alt={selectedItem.title}
              />
            </div>
            <div className="descritpionContainer">
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                {selectedItem.title}
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2, }}>
                {selectedItem.description}
              </Typography>
              <ul>
                {selectedItem.ingredientsList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </Backdrop>
    </div>
  );
}

export default Recipes;