import { useProfileOnSubmit } from "@components/user/profile-on-submit.hook";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { CleanFile } from "@typing/clean-file.interface";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { Button, Form, ListGroup, Table } from "react-bootstrap";

const Dashboard: FunctionComponent = () => {
  const user = useAutoLogin();
  const onSubmit = useProfileOnSubmit();

  const entries = user
    ? Object.entries(user).map(([key, value]) => (
        <tr key={`row-${key}`}>
          <td>{key}</td>
          <td>
            {Array.isArray(value) ? ( // arrays
              <ListGroup>
                {value.map((item, index) => (
                  <ListGroup.Item key={`${key}-${index}`}>
                    {item}
                  </ListGroup.Item>
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
          <Form.Label>email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder={user.email || "email"}
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>firstName</Form.Label>
          <Form.Control
            name="firstName"
            placeholder={user.firstName || "firstName"}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>lastName</Form.Label>
          <Form.Control
            name="lastName"
            placeholder={user.lastName || "lastName"}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            name="description"
            placeholder={user.description || "description"}
          />
        </Form.Group>
        <Form.Group controlId="avatar">
          <Form.Label>avatar</Form.Label>
          <Form.Control name="avatar" type="file" accept="image/*" />
        </Form.Group>

        <Button type="submit">Envoyer</Button>
      </Form>
    </div>
  ) : (
    <></>
  );
};

export default Dashboard;
