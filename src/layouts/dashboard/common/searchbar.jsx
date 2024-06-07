import { useState } from 'react';

import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slide from '@mui/material/Slide';

import { bgBlur } from '../../../theme/css';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); setText('');
  };
  const handleSearch = () => {
    console.log('handleSearch()');
    handleClose();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          {!open && (
            <IconButton onClick={handleOpen}>
              <Iconify icon="eva:search-fill" />
            </IconButton>
          )}

          <Slide direction="down" in={open} mountOnEnter unmountOnExit>
            <StyledSearchbar>
              <Input
                autoFocus fullWidth disableUnderline placeholder="Search…"
                defaultValue={text}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                onChange={e => { setText(e.target.value); }}
                endAdornment={
                  <FormControl>
                    <RadioGroup row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="board"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="board" control={<Radio />} label="게시판" />
                      <FormControlLabel value="product" control={<Radio />} label="상품" />
                      <FormControlLabel value="message" control={<Radio />} label="메세지" />
                      <FormControlLabel value="user" control={<Radio />} label="사용자" />
                    </RadioGroup>
                  </FormControl>
                }
              />
              <Button variant="contained" onClick={handleSearch}>
                검색
              </Button>
            </StyledSearchbar>
          </Slide>
        </div>
      </ClickAwayListener>
      {showAlert &&
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="info" sx={{mx: 5}}>
          추후 구현될 예정입니다.
        </Alert>
      }
    </>
  );
}
