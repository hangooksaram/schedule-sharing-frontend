import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../../../api/user/user";
import useStyles from "./loginFormStyle";

const intialFormValue: LoginFormValue = {
  email: "",
  password: ""
};
const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [showPw, setShowPw] = useState(false);
  // submit
  const handleSubmit = (v: LoginFormValue) => {
    login(v).then(() => {
      alert("로그인 성공");
      history.push("/calendar");
    });
  };

  return (
    <Formik initialValues={intialFormValue} onSubmit={handleSubmit}>
      {(formikProps) => (
        <form className={classes.root} onSubmit={formikProps.handleSubmit}>
          <Grid container direction="column" spacing={3}>
            {/* 로그인 */}
            <Grid item container xs={12}>
              <TextField
                fullWidth
                size="small"
                classes={{ root: classes.textField }}
                name="email"
                placeholder="아이디"
                variant="outlined"
                value={formikProps.values.email}
                onChange={formikProps.handleChange}
                error={formikProps.touched && Boolean(formikProps.errors.email)}
                helperText={formikProps.touched && formikProps.errors.email}
              />
              <TextField
                fullWidth
                size="small"
                className={classes.textField}
                name="password"
                placeholder="비밀번호"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPw((prev) => !prev)}>
                        {showPw ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                type={showPw ? "text" : "password"}
                variant="outlined"
                value={formikProps.values.password}
                onChange={formikProps.handleChange}
                error={formikProps.touched && Boolean(formikProps.errors.email)}
                helperText={formikProps.touched && formikProps.errors.email}
              />

              {/* 비번 잊음 */}
              <Grid item justify="space-between" container xs={12}>
                <Typography
                  variant="caption"
                  align="center"
                  children="비밀번호를 잊어버렸어요"
                />
                <Link to="/signup">
                  <Typography
                    variant="caption"
                    align="center"
                    children="계정이 없어요"
                  />
                </Link>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                className={classes.loginBtn}
                size="large"
                variant="contained"
                fullWidth
                children="로그인"
              />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
