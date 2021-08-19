import React, { FormEvent, Fragment } from "react";

export const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`http://localhost:3001/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => {
        if (response.ok) {
          console.log("result: ", response.json());
        } else {
          console.log("fail...");
        }
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;
    const username = (currentTarget[0] as HTMLInputElement).value;
    const password = (currentTarget[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <Fragment>
      {/* @ts-ignore */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-item">
          <label htmlFor="username">username</label>
          <input type="text" id={"username"} />
        </div>
        <div className="form-item">
          <label htmlFor="password">password</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </Fragment>
  );
};
