import { useAutoLogin } from "@hooks/auto-login.hook";
import { useRefreshUser } from "@hooks/refresh-user.hook";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { ApiResponse } from "@typing/api-response.interface";
import { CleanFile } from "@typing/clean-file.interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { Button, Form, ListGroup, Table } from "react-bootstrap";
import { getAxiosErrorMessage } from "../../client/utils/get-axios-error.utils";

const index: FunctionComponent = () => {
  const user = useAutoLogin();
  const dispatch = useAppDispatch();
  const refreshUser = useRefreshUser();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target as HTMLFormElement;
    const formData: FormData = new FormData(form);
    // remove empty fields
    const entriesToDelete: string[] = [];
    for (const [key, value] of formData.entries()) {
      // can't use forEach, since entries() returns an iterator instead of an array
      if (value === "" || value === undefined || (value as File).size === 0)
        entriesToDelete.push(key);
    }
    entriesToDelete.forEach((key: string) => formData.delete(key));

    axios
      .patch<ApiResponse>("/api/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // for file upload
        },
      })
      .then(({ data: response }: AxiosResponse<ApiResponse>) => {
        if (response.success) {
          dispatch(
            addAlert({
              success: true,
              message: "Profil mis à jour !",
              ttl: 2000,
            })
          );
          refreshUser();
        } else {
          dispatch(
            addAlert({
              success: false,
              message: "Mise à jour échouée",
              ttl: 2000,
            })
          );
        }
      })
      .catch((e: AxiosError) =>
        dispatch(
          addAlert({
            success: false,
            message: `Mise à jour échouée: ${getAxiosErrorMessage(e)}`,
            ttl: 2000,
          })
        )
      );
  };

  const entries = user
    ? Object.entries(user).map(([key, value]) => (
        <tr key={`row-${key}`}>
          <td>{key}</td>
          <td>
            {Array.isArray(value) ? ( // arrays
              <ListGroup>
                {value.map((item) => (
                  <ListGroup.Item>{item}</ListGroup.Item>
                ))}
              </ListGroup>
            ) : typeof value === "object" ? ( // avatar
              <Image
                width={80}
                height={80}
                src={`https://storage.googleapis.com/${
                  process.env.NEXT_PUBLIC_BUCKET_NAME
                }/${(value as CleanFile).filepath}`}
                alt="avatar"
              />
            ) : (
              value // primitive values
            )}
          </td>
        </tr>
      ))
    : null;

  return user ? (
    <div>
      <h3>TODO for debug</h3>
      <Table>
        <tbody>{entries}</tbody>
      </Table>
      <hr />
      <h3>Modifier</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="email">
          <Form.Control placeholder={user.email || "email"} />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Control placeholder={user.firstName || "firstName"} />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Control placeholder={user.lastName || "lastName"} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Control placeholder={user.description || "description"} />
        </Form.Group>
        <Form.Group controlId="avatar">
          <Form.Control type="file" accept="image/*" />
        </Form.Group>

        <Button type="submit">Envoyer</Button>
      </Form>
    </div>
  ) : (
    <></>
  );
};

export default index;
