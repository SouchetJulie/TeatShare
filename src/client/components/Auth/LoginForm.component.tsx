import {
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@styles/Auth/Login.Component.module.scss";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "@hooks/store-hook";
import { useRouter } from "next/router";
import { addAlert } from "@stores/alert.store";
import { setUser } from "@stores/user.store";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserAuth, IUserPublic } from "@typing/user.interface";

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
  const [buttonMessage, setButtonMessage] = useState("Se connecter");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      const formData: FormData = new FormData(form);
      const user: IUserAuth = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      if (user.email && user.password) {
        let success: boolean = true;
        let message = "Traitement en cours...";
        setButtonMessage(message);

        axios
          .post<ApiResponse<{ user: IUserPublic }>>("/api/user/login", user)
          .then(
            ({
              data: response,
            }: AxiosResponse<ApiResponse<{ user: IUserPublic }>>) => {
              success = true;
              message = "Connexion réussie!";
              dispatch(addAlert({ message, success, ttl: 2000 }));

              router.push("/");
              dispatch(setUser(response.data?.user));
            }
          )
          .catch(() => {
            success = false;
            message = "Nom d'utilisateur ou mot de passe incorrects";
            setButtonMessage("Connexion échouée.");
            dispatch(addAlert({ message, success, ttl: 2000 }));
          });
      }
    } else {
      // Add
      const success: boolean = false;
      const message = "Veuillez remplir correctement le formulaire.";
      dispatch(addAlert({ message, success, ttl: 2000 }));
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
            {buttonMessage}
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
