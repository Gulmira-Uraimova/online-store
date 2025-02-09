import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/slices/productSlice';
import { Skeleton, Stack, TextField } from '@mui/material';
// import LinearIndeterminate from '../../components/loading/Loading';
import DehazeIcon from '@mui/icons-material/Dehaze';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link } from 'react-router-dom';


const ProductsPage = () => {
  const{ products, loading, error } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const filterProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
  

  // if (error) return <div>Продукты не найдены!</div>
  // if (loading) return <LinearIndeterminate/>



  return (
   <>
   <TextField 
      id="filled-basic" 
      label="Поиск" 
      variant="filled" 
      sx={{
        width: '1440',
        marginTop: '40px', 
        marginLeft:'40px', 
        outlined: 'none'  
      }} 
      onChange={(e) => setSearch(e.target.value)}
   />
     <div 
       style={{
        width: '1520',
        height: '3200',
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around'
      }}
    >
       {filterProducts.map(product => 
       loading ? (
          <Stack
            spacing={1} key={product.id} sx={{width: 430, height: 400, marginTop: '40px'}}>
            <Skeleton variant="rounded" width={430} height={170}/>
            <Skeleton variant="rectangular" width={310} height={30} />
            <Skeleton variant="rectangular" width={117} height={20} />
            <Skeleton variant="rectangular" width={430} height={20} />
          </Stack>

         
        ) : (
          <Card 
            sx={{ 
             width: 430, 
             height: 450, 
             display: 'flex', 
             flexDirection: 'column', 
             justifyContent: 'space-around',
             marginTop: '50'
         }} 
         key={product.id} >
          <CardMedia
            component="img"
            alt="green iguana"
            width='430'
            height="170"
            image={product.image}
            sx={{ objectFit: 'contain'}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Link to={ `/details-product/${product.id}`}>
              {product.title}
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '20px' }}>
              <strong>Price:</strong> {product.price}
            </Typography>
          </CardContent>
          <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
            {isOpen ? (
              <>
                <Button variant='outlined' color='error' startIcon={<DeleteIcon/>}
                // sx={marginRight: '15'}
                >Удалить</Button> 
                <Button color='secondary' startIcon={<ModeEditOutlineIcon />}
                >Изменить</Button>
                <MenuOpenIcon sx={{marginRight: '20px', cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)} />
              </>
            ) : (
                <DehazeIcon sx={{marginRight: '20px', cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)} />
            )}

           </CardActions>
        </Card>
      ))
      }
    </div>
   </>
  )
}

export default ProductsPage