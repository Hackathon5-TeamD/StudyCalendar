import { ChangeEvent, memo, useContext, useState, VFC } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { SignInSmallButton } from "../../atoms/shared/SignInSmallButton";
import { SignInInput } from "../../atoms/shared/SignInInput";
import { SignInWideButton } from "../../atoms/shared/SignInWIdeButton";
import { postLoginUser, postRegisterUser } from "../../../api/userRequest";
import { Loader } from "semantic-ui-react";
import { UserContext } from "../../../providers/UserProvider";

export const SignUp: VFC = memo(() => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //  グローバルなstate
  const { setUserData } = useContext(UserContext);

  // ローディングフラグ
  const [isLoading, setIsLoading] = useState(false);

  const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onClickCreateAccount = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("未入力の項目があります");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("パスワードが一致しません");
      return;
    }
    setIsLoading(true);
    try {
      const signinResult = await postRegisterUser(name, email, password);
      if (signinResult) {
        const signupResult = await postLoginUser(signinResult.email, password);
        if (signupResult) {
          setUserData(signupResult);
          localStorage.setItem("token", signupResult.token);
          navigate("/");
        }
      }
    } catch {
      setErrorMessage("サインインできませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const transitionToSignin = () => {
    navigate("/signin");
  };

  return (
    <div className={styles.signupbody}>
      <div className={styles.signupcontainer}>
        <h2 className={styles.signuptxt}>SIGN UP</h2>
        <div className={styles.signupform}>
          <SignInInput
            type="text"
            placeholder="username"
            onChange={onChangeNameInput}
          />
          <SignInInput
            type="email"
            placeholder="email"
            onChange={onChangeEmailInput}
            value={email}
          />
          <SignInInput
            type="password"
            placeholder="password"
            onChange={onChangePasswordInput}
            value={password}
          />
          <SignInInput
            type="password"
            placeholder="confirm password"
            onChange={onChangeConfirmPasswordInput}
            value={confirmPassword}
          />

          <div>
            {isLoading ? (
              <Loader active inline="centered" />
            ) : (
              <SignInWideButton onClick={onClickCreateAccount}>
                CREATE ACCOUNT
              </SignInWideButton>
            )}
            <SignInSmallButton onClick={transitionToSignin}>
              SIGN IN
            </SignInSmallButton>
            <SignInSmallButton onClick={transitionToSignin}>
              GOOGLE
            </SignInSmallButton>
          </div>
          {errorMessage ? (
            <p className={styles.errorMessage}>{errorMessage}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
});
