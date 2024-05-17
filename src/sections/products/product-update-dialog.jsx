import React, { useState } from "react";
import { MuiFileInput } from 'mui-file-input';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import useProducts from './useProducts';
import { squareImage } from '../../api/cloudinary';

const COLOR_CODES = ['#00AB55','#000000','#FFFFFF','#FFC0CB','#FF4842','#1890FF','#94D82D','#FFC107'];

export default function ProductUpdateDialog(props) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(props.product.cover);
  const [selectedColors, setSelectedColors] = useState(props.product.colors);
  const [price, setPrice] = useState(props.product.price);
  const [priceSale, setPriceSale] = useState(props.product.priceSale);
  const [product, setProduct] = useState(props.product);

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false);  setFile();
  };
  const handleChange = e => { setProduct({...product, [e.target.name]: e.target.value}); };
  const handleColors = e => { setSelectedColors(e.target.value); };
  const handlePrice = e => { setPrice(e.target.value); };
  const handlePriceSale = e => { setPriceSale(e.target.value); };
  const handleUpload = newFile => {
    setFile(newFile);
    squareImage(newFile)
      .then(url => setProduct({...product, ['cover']: url}));
  };

  const { updateRecord } = useProducts();
  const handleSubmit = () => {
    const newProduct = {...product, colors: selectedColors}
    newProduct['price'] = (typeof(price) === 'string') ? Number.parseInt(price) : price;
    if (priceSale)
      newProduct['priceSale'] = (typeof(priceSale) === 'string') ? Number.parseInt(priceSale) : priceSale;
    // console.log(newProduct);
    updateRecord.mutate(newProduct);
    handleClose();
  }

  if (sessionStorage.getItem('sessionEmail') !== process.env.REACT_APP_ADMIN_USER) {
    return (
      <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
        {product.name}
      </Link>
    );
  }

  return (
    <>
      <Link color="inherit" underline="hover" variant="subtitle2" noWrap onClick={handleClickOpen}>
        {product.name}
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>상품 수정</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            {product.cover && <img src={product.cover} alt='product' width='80%' />}
            <TextField autoFocus required margin="dense" id="name"
              name="name" label="상품명" type="text" fullWidth
              value={product.name} onChange={handleChange}
            />
            <TextField required margin="dense" id="price"
              name="price" label="가격" type="text" fullWidth
              value={price} onChange={handlePrice}
            />
            <FormControl fullWidth>
              <InputLabel id="color">색상</InputLabel>
              <Select required margin="dense" name='color' label="색상" id='color' multiple
                value={selectedColors} onChange={handleColors}>
                {COLOR_CODES.map((item) => 
                  <MenuItem value={item} key={item} alignItems='center'>
                    <Stack spacing={2} direction='row' alignItems='center'>
                      <Box sx={{ width: 16, height: 16, bgcolor: item, borderRadius: '50%',
                          border: 'solid 2px' }} />
                      <Typography>{item}</Typography>
                    </Stack>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="status">상태</InputLabel>
              <Select required margin="dense" name='status' label="상태" id='status'
                value={product.status} onChange={handleChange}>
                {['sale', 'new', 'default'].map((item) => 
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  )}
              </Select>
            </FormControl>
            <TextField margin="dense" id="priceSale"
              name="priceSale" label="세일전 가격" type="text" fullWidth
              value={priceSale} onChange={handlePriceSale}
            />
            <MuiFileInput required margin="dense" id="photo"
              label='상품 사진' value={file} name='file' fullWidth
              onChange={handleUpload} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">수정</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}