import React from 'react'
import {FormikHelpers, useFormik} from 'formik'
import {useSelector} from 'react-redux'
import {selectIsLoggedIn} from './selectors'
import {authActions} from './index'
import {useAppDispatch} from "../../utils/redux-utils";
import {login} from "./auth-reduser";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import Grid from '@mui/material/Grid';
import {Navigate} from "react-router-dom";
import {TextField} from "@mui/material";


type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const resultAction = await dispatch(authActions.login(values));

            if  (login.rejected.match(resultAction)) {
                if (resultAction.payload?.fieldsErrors?.length) {
                    const error = resultAction.payload?.fieldsErrors[0];
                    formikHelpers.setFieldError(error.field, error.error);
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Navigate to={"/"} />
    }


    return <>
        <Grid item xs={2} >
            <form onSubmit={formik.handleSubmit}  >
                <FormControl style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FormLabel style={{background: 'white', borderRadius: '10px', padding: '10px', marginTop: '20px'}}>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup style={{color: 'white'}}>
                        <TextField

                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </>
}
