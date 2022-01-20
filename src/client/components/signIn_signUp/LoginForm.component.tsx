import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";

import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/Login.Component.module.scss";
import { LoginRequest } from "@typing/login-request.interface";
import { setUser } from "@stores/user.store";
import { UserApiResponse } from "@typing/api-response.interface";

const LoginForm: FunctionComponent = () => {
  // store
  const dispatch = useAppDispatch();
  // router
  const router = useRouter();
  // Form validation
  const [validated, setValidated] = useState<boolean>(false);
  // To check if the form is full
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  // Style of btn when fields empty or not
  const styleBtn: string =
    email && pwd ? styles.loginValidated : styles.loginButtonSendInvalid;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      const formData: FormData = new FormData(form);
      const user: LoginRequest = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      if (user.email && user.password) {
        let success: boolean = true;
        let message = "Traitement en cours...";
        dispatch(addAlert({ message, success }));

        axios
          .post<UserApiResponse>("/api/user/login", user)
          .then(async ({ data }: AxiosResponse<UserApiResponse>) => {
            success = true;
            message = "Connexion réussie!";
            dispatch(addAlert({ message, success }));

            dispatch(setUser(data.user));
            await router.push("/");
          })
          .catch(() => {
            success = false;
            message = "Nom d''utilisateur ou mot de passe incorrects";
            dispatch(addAlert({ message, success }));
          });
      }
    } else {
      // Add
      const success: boolean = false;
      const message = "Veuillez remplir le formulaire.";
      dispatch(addAlert({ message, success }));
    }
  };

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/");
  }, []);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardContainer}>
        <Link href="/">
          <FontAwesomeIcon icon={faTimes} className={styles.cancelIcon} />
        </Link>
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
          <Form.Label htmlFor="email" className="visually-hidden">
            Email :
          </Form.Label>
          <Form.Control
            className={styles.loginInput}
            id="email"
            name="email"
            placeholder="Adresse email"
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* Password */}
          <Form.Label htmlFor="password" className="visually-hidden">
            Mot de passe :
          </Form.Label>
          <Form.Control
            className={styles.loginInput}
            id="password"
            name="password"
            placeholder="Mot de passe"
            type="password"
            required
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          />

          {/* Validation */}
          <Button className={`${styleBtn} ${styles.loginButton}`} type="submit">
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
export default LoginForm;
