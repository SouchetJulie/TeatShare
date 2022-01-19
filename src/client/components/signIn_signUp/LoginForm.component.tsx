import {
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/Login.Component.module.scss";
import Link from "next/link";
import {Alert, Button, Form } from "react-bootstrap";
import axios from "axios";
import { LoginRequest } from "@typing/login-request.interface";
import { useRouter } from "next/router";
import { addAlert } from "@stores/alert.store";
import { useAppDispatch } from "@hooks/store-hook";

interface LoginFormComponentProps {}

const LoginFormComponent: FunctionComponent<LoginFormComponentProps> = () => {
  // store
  const dispatch = useAppDispatch();
  // router
  const router = useRouter();
  //Form validation
  const [validated, setValidated] = useState<boolean>(false);
  //To check if the form is full
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  //Style of btn when fields empty or not
  const styleBtn: string = (email && pwd) ? styles.loginValidated : styles.loginButtonSendInvalid;
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    setValidated(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      const formData: FormData = new FormData(form);
      const user: LoginRequest = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      if (user.email && user.password) {
        axios({
          method: "POST",
          url: "/api/user/login",
          data: user,
        })
          .then(async function () {
            // Add an alert to say to the user that it will take some time
            const success: boolean = true;
            const message = (
              <span>
                Vous êtes connectés, vous allez être redirigés.
              </span>
              );
            dispatch(addAlert({ message, success}));
            await router.push("/");
          })
          .catch(function (error) {
            alert("failed");
          });
      }
    } else {
      // Add
      const success: boolean = false;
      const message = (
        <span>
          Les champs ne sont pas bons
        </span>
      );
      dispatch(addAlert({ message, success}));
    }
  };
  const handleFocus = (): void => {};
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/");
  }, []);
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardContainer}>
        <div className={styles.cancelIcon}>
          <Link href="/">
            <FontAwesomeIcon icon={faTimes} />
          </Link>
        </div>
        <h2>Se connecter</h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          action={"/api/user/login"}
          method="POST"
          className={styles.loginForm}
        >
          {/* Email */}
          <Form.Label htmlFor="email" className={styles.invisibleLabel}>
            Email :
          </Form.Label>
          <Form.Control
            className={styles.loginInput}
            id="email"
            name="email"
            placeholder="adresse email"
            type="email"
            required
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          {/* Password */}
          <Form.Label htmlFor="password" className={styles.invisibleLabel}>
            Mot de passe :
          </Form.Label>
          <Form.Control
            className={styles.loginInput}
            id="password"
            name="password"
            placeholder="mot de passe"
            type="password"
            required
            onChange={(e)=>{setPwd(e.target.value)}}
          />

          {/* Validation */}
          <Button
            className={styleBtn}
            type="submit"
            onFocus={handleFocus}
          >
            Valider
          </Button>

          {/* Création de compte -> Redirection */}
          <p className={styles.loginRedirectSignup}>
            <Link href={"/user/signup"}>
              <a>Créer un compte</a>
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
export default LoginFormComponent;