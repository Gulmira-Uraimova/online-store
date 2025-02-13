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
import { deleteProduct, fetchProducts } from '../../features/slices/productSlice';
import { Skeleton, Stack, TextField } from '@mui/material';
// import LinearIndeterminate from '../../components/loading/Loading';
import DehazeIcon from '@mui/icons-material/Dehaze';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './ProductPage.css'


const ITEMS_PER_PAGE = 2


const ProductsPage = () => {
  const{ products, loading, error } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const filterProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filterProducts.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE)
  

  // if (error) return <div>Продукты не найдены!</div>
  // if (loading) return <LinearIndeterminate/>



  return (
   <>
   <TextField 
      id="filled-basic" 
      label="Поиск" 
      variant="filled" 
      className='products__search'
      onChange={(e) => setSearch(e.target.value)}
   />
     <div className='products'
    >
       {currentProducts.map(product => 
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
            className='products__image'
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
              <Link to={ `/details-product/${product.id}`} className='products__title'>
              {product.title}
              </Link>
            </Typography>
            <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              fontSize: '20px' }}>
              <strong>Цена:</strong><span className='products__price'
              >
                  {product.price}</span> сом
            </Typography>
          </CardContent>
          <CardActions 
          className='products__delete'>
            {isOpen ? (
              <>
                <Button 
                  variant='outlined' 
                  color='error' 
                  startIcon={<DeleteIcon/>}
                  onClick={()=> dispatch(deleteProduct(product.id))}
                >
                  Удалить
                </Button> 
                <Link to={`/update-product/${product.id}`}>
                  <Button 
                    color='secondary' 
                    startIcon={<ModeEditOutlineIcon />}
                  >
                     Изменить
                  </Button>
                </Link>
                
                <MenuOpenIcon className='products__moi' onClick={() => setIsOpen(!isOpen)} />
              </>
            ) : (
                <DehazeIcon className='products__icon' onClick={() => setIsOpen(!isOpen)} />
            )}

           </CardActions>
        </Card>
      ))
      }
    </div>
    <div className='pagination'>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><KeyboardDoubleArrowLeftIcon /></button>
      <span>{currentPage} / {totalPages}</span>

      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><KeyboardDoubleArrowRightIcon /></button>
      
    </div>
   </>
  )
}

export default ProductsPage