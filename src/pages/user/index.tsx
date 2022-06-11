import React, { FunctionComponent } from "react";
import { useAutoLogin } from "@hooks/auto-login.hook";

const index: FunctionComponent = () => {
  const user = useAutoLogin();

  return user ? (
    <div>
      TODO for debug
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
