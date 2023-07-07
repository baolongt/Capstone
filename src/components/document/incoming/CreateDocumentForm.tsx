// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import { FormControl } from '@mui/base';
// import {
//   Autocomplete,
//   ButtonGroup,
//   Divider,
//   Grid,
//   InputLabel,
//   Typography
// } from '@mui/material';
// import AttachFileIcon from '@mui/icons-material/AttachFile';

// const CreateDocumentForm = () => {
//   const [input, setInput] = useState({
//     title: '',
//     documentField: '',
//     documentType: '',
//     level: '',
//     signer: ''
//   });

//   const fields = [
//     {
//       value: 'van_ban_hanh_chinh',
//       label: 'Văn bản hành chính'
//     },
//     {
//       value: 'field2',
//       label: 'Field 2'
//     },
//     {
//       value: 'field3',
//       label: 'Field 3'
//     }
//   ];

//   const signers = [
//     {
//       value: 'van_ban_hanh_chinh',
//       label: 'Nguyễn Văn A'
//     },
//     {
//       value: 'field2',
//       label: 'Trần Văn C'
//     },
//     {
//       value: 'field3',
//       label: 'Lê Thị B'
//     }
//   ];

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const { title, documentField, documentType, level, signer } = input;
//     console.log(title, documentField, documentType, level, signer);
//     // handle form submission (e.g. API submission) here
//   };

//   const defaultStyle = {
//     minWidth: '200px'
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' }
//       }}
//       style={{ marginLeft: '50px', paddingRight: '50px' }}
//       noValidate
//       autoComplete="off"
//     >
//       <Typography variant="h4" gutterBottom>
//         Đăng ký văn bản đi
//       </Typography>
//       <Divider style={{ width: '100%', marginBottom: '20px' }} />
//       <FormControl style={{ width: '100%' }}>
//         <Grid container spacing={2}>
//           <Grid item xs={4}>
//             <InputLabel id="field-label">Sổ văn bản đến</InputLabel>
//             <TextField
//               fullWidth
//               defaultValue=""
//               size="small"
//               id="field"
//               select
//               sx={defaultStyle}
//             >
//               <MenuItem value="">
//                 <em>Trống</em>
//               </MenuItem>
//               {fields.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={4}>
//             <InputLabel id="field-label">Số ký hiệu</InputLabel>
//             <TextField
//               fullWidth
//               size="small"
//               id="title"
//               variant="outlined"
//               required
//               value={input.title}
//               onChange={(e) => setInput({ ...input, title: e.target.value })}
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <InputLabel id="field-label">Cấp độ</InputLabel>
//             <TextField
//               fullWidth
//               defaultValue=""
//               size="small"
//               id="field"
//               select
//               sx={defaultStyle}
//             >
//               <MenuItem value="">
//                 <em>Trống</em>
//               </MenuItem>
//               {fields.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <InputLabel id="title-label">Trích yếu</InputLabel>
//             <TextField
//               fullWidth
//               size="small"
//               id="title"
//               variant="outlined"
//               required
//               multiline
//               maxRows={4}
//               value={input.title}
//               onChange={(e) => setInput({ ...input, title: e.target.value })}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <InputLabel id="field-label">Lĩnh vực văn bản</InputLabel>
//             <TextField
//               size="small"
//               fullWidth
//               defaultValue=""
//               id="field"
//               select
//               sx={defaultStyle}
//             >
//               <MenuItem value="">
//                 <em>Trống</em>
//               </MenuItem>
//               {fields.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={6}>
//             <InputLabel id="field-label">Loại văn bản</InputLabel>
//             <TextField
//               size="small"
//               fullWidth
//               defaultValue=""
//               id="field"
//               select
//               sx={defaultStyle}
//             >
//               <MenuItem value="">
//                 <em>Trống</em>
//               </MenuItem>
//               {fields.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={6}>
//             <InputLabel id="field-label">Lãnh đạo phê duyệt</InputLabel>
//             <Autocomplete
//               disablePortal
//               size="small"
//               style={{ width: '100%' }}
//               id="combo-box-demo"
//               options={signers}
//               sx={{ width: 300 }}
//               renderInput={(params) => <TextField {...params} label="" />}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <Button variant="outlined" startIcon={<AttachFileIcon />}>
//               Đính kèm file
//             </Button>
//           </Grid>
//         </Grid>
//       </FormControl>
//       <Grid style={{ width: '100%' }} container spacing={2}>
//         <Grid item xs={6}>
//           <ButtonGroup
//             variant="contained"
//             aria-label="outlined primary button group"
//           >
//             <Button variant="contained" color="primary" type="submit">
//               Chuyển cán bộ khác
//             </Button>
//             <Button variant="contained" color="primary" type="submit">
//               Chuyển lãnh đạo phê duyệt
//             </Button>
//           </ButtonGroup>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default CreateDocumentForm;
