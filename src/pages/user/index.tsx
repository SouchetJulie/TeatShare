import React, { FunctionComponent } from "react";
import { useLoginRedirect } from "@hooks/login-redirect.hook";

const index: FunctionComponent = () => {
  const user = useLoginRedirect();

  return user ? (
    <div>
      TODO debug
      <table>
        {Object.entries(user).map(([key, value]) => {
          return (
            <tr>
              <td>{key}</td>
              <td>{Array.isArray(value) ? value.join(", ") : value}</td>
            </tr>
          );
        })}
      </table>
    </div>
  ) : (
    <></>
  );
};

export default index;
