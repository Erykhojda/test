import React from "react";
import { useState } from "react";
import { TextField, FormControl, FormControlLabel, Button, FormLabel, RadioGroup, Radio, ListItem, InputAdornment, List, IconButton, ListItemText } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore'
import { db, auth, storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigate } from "react-router-dom";

import uploandImage from '../assets/upload.jpeg'
import './CreateRecipe.css'


import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateRecipe = () => {

  const [ingredient, setIngredient] = useState('')
  const [ingredientsList, setIngredientList] = useState([])

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const recipesCollectionRef = collection(db, "recipes")
  const navigate = useNavigate();



  const addlistItems = () => {
    if (ingredient !== "") {
      setIngredientList([...ingredientsList, ingredient])
      setIngredient("")
    } else {
      alert("Ingredient value can not be empty!")
    }
  }

  const removeItem = (index) => {
    const newList = ingredientsList.filter((item, i) => i !== index)
    setIngredientList(newList)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title')
    const description = formData.get('description')
    const status = formData.get('status')
    if (title && description && status !== '' && ingredientsList.length > 0) {
      addDoc(recipesCollectionRef, { title: title, description: description, ingredientsList: ingredientsList, status: status, imageUrl: imageUrl, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid } })
      setIngredientList([])
      event.currentTarget.reset()
      navigate("/recipes");

    } else {
      alert('Values can not be empty!')
    }
  }

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = (url) => {
    if (image === null) return
    const imageRef = ref(storage, `images/${image.name}`)
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url)
      })
    })
  }



  return (
    <div className="createRecipe">
      <h1>Create your Recipe</h1>

      <div className="create-box">
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 120, md: 167 },
            maxWidth: { xs: 180, md: 250 },
            borderRadius: 2
          }}
          alt="meal"
          src={imageUrl || uploandImage}
        />
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            textAlign: 'center'
          }}
        >

          <input type="file" onChange={handleChange}></input>
          <button onClick={handleUpload}>upload</button>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth variant="standard">
              <TextField
                name="title"
                fullWidth
                id="outlined-basic"
                style={{ background: "rgb(235,235,235, 0.45)", borderRadius: '5px' }}
                label="Title" variant="outlined" size='small'
                margin="dense"

              />
              <TextField
                name="description"
                fullWidth
                style={{ background: "rgb(235,235,235, 0.45)", borderRadius: '5px' }}
                id="outlined-multiline-flexible"
                label="description"
                multiline
                margin="dense"
              />

              <TextField
                name="ingredients"
                value={ingredient}
                onChange={e => setIngredient(e.target.value.trim())}
                fullWidth
                label="ingredients"
                size="small"
                style={{ background: "rgb(235,235,235, 0.45)", borderRadius: '5px', marginTop: '8px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={addlistItems} variant="outlined">Add</Button>
                    </InputAdornment>
                  ),
                }}
              />
              <List sx={{ width: '100%', maxHeight: 100, bgcolor: 'rgb(0, 0, 0, 0.2)', overflowY: 'auto', borderRadius: '5px', marginTop: '8px', padding: 0, color: 'rgb(255,255,255, 0.7)' }}>
                {ingredientsList.map((item, index) => (
                  <ListItem
                    sx={{ margin: 0, padding: 0, paddingLeft: 2 }}
                    key={index}
                    disableGutters
                    secondaryAction={
                      <IconButton onClick={() => removeItem(index)} aria-label="comment">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <FormControlLabel value="Public" control={<Radio />} label="Public" name="status" />
                <FormControlLabel value="Private" control={<Radio />} label="Private" name="status" />
              </RadioGroup>
              <Button type='submit' variant="contained">Create</Button>

            </FormControl>

          </form>
        </Box>
      </div>
    </div >




  );
}

export default CreateRecipe;