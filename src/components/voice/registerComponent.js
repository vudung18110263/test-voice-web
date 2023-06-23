import { ListLanguage } from '@/types'
import { Box, Button, Container, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LIST_INFO_KEY } from '@/utils/constants';

const RegisterComponent = (props) => {
    const { control, handleSubmit, isFormValid, errors } = props
    return (
        <Container maxWidth="xs" className="justify-content-center pt-4">
            <Grid container spacing={4} className='box-container'>
                <Grid item xs={12} className='d-flex justify-content-center '>
                    <h1>Consent Form</h1>
                </Grid>
                <Grid item xs={12}>
                    <div className='d-flex flex-column'>
                        <Typography className='typographyStyle pb-2 ' variant="subtitle1">Name</Typography>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'This field is required' }}
                            render={({ field }) => (
                                <TextField size="small" error={!!errors.name} {...field} placeholder='Enter your name' />
                            )}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className='d-flex flex-column'>
                        <Typography className='typographyStyle pb-2 ' variant="subtitle1">Language</Typography>
                        <Controller
                            name="language"
                            control={control}
                            rules={{ required: 'This field is required' }}
                            render={({ field }) => {
                                return (
                                    <Select labelId="demo-checkbox-label" size='small' {...field} error={!!errors.language} displayEmpty
                                        renderValue={
                                            Boolean(field.value) ? undefined : () => <div style={{ color: "#a9a9a9" }}>Select language</div>
                                        }
                                    >
                                        {
                                            ListLanguage.map((value) => <MenuItem value={value.code} key={value.code}>{value.text}</MenuItem>)
                                        }
                                    </Select>
                                )
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} className='d-flex justify-content-end'>
                    <Button type="submit" variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleSubmit} disabled={!isFormValid}>Next</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default RegisterComponent