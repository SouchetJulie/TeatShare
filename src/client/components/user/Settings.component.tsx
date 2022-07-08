import { useProfileOnSubmit } from "@components/user/profile-on-submit.hook";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { CleanFile } from "@typing/clean-file.interface";
import { EGrade } from "@typing/grade.enum";
import { ESubject } from "@typing/subject.enum";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { Button, Form, ListGroup, Table } from "react-bootstrap";
import Select from "react-select";

const subjects = Object.entries(ESubject).map(
  ([value, label]: [string, string]) => ({
    value,
    label,
  })
);

const grades = Object.entries(EGrade).map(
  ([value, label]: [string, string]) => ({
    value,
    label,
  })
);

const Settings: FunctionComponent = () => {
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
              value && (
                <Image
                  width={80}
                  height={80}
                  src={`https://storage.googleapis.com/${
                    process.env.NEXT_PUBLIC_BUCKET_NAME
                  }/${(value as CleanFile).filepath}`}
                  alt="avatar"
                />
              )
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
        {/* Email */}
        <Form.Group controlId="email">
          <Form.Label>email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder={user.email || "email"}
          />
        </Form.Group>
        {/* First name */}
        <Form.Group controlId="firstName">
          <Form.Label>firstName</Form.Label>
          <Form.Control
            name="firstName"
            placeholder={user.firstName || "firstName"}
          />
        </Form.Group>
        {/* Last name */}
        <Form.Group controlId="lastName">
          <Form.Label>lastName</Form.Label>
          <Form.Control
            name="lastName"
            placeholder={user.lastName || "lastName"}
          />
        </Form.Group>
        {/* Description */}
        <Form.Group controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            name="description"
            placeholder={user.description || "description"}
          />
        </Form.Group>
        {/* Location */}
        <Form.Group controlId="location">
          <Form.Label>location</Form.Label>
          <Form.Control
            name="location"
            placeholder={user.location || "location"}
          />
        </Form.Group>
        {/* Grades */}
        <Form.Group controlId="grades">
          <Form.Label>grades</Form.Label>
          <Select
            id="grades"
            name="grades"
            aria-labelledby="grades"
            placeholder="grades"
            isMulti
            options={grades}
            hideSelectedOptions={true}
          />
        </Form.Group>
        {/* Subjects */}
        <Form.Group controlId="subjects">
          <Form.Label>subjects</Form.Label>
          <Select
            id="subjects"
            name="subjects"
            aria-labelledby="subjects"
            placeholder="subjects"
            isMulti
            options={subjects}
            hideSelectedOptions={true}
          />
        </Form.Group>
        {/* Avatar */}
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

export default Settings;
