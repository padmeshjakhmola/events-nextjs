export const createAccount = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fullname: fullName,
        email,
        password,
      }),
    }
  );

  console.log("aaaaaaaaaaaa", response);

  if (!response.ok) {
    const errData = await response.json();
    return {
      status: 400,
      message: { "Unable to fetch request": errData },
    };
  }

  return {
    status: 200,
    message: "User logged in successfully",
  };
};

export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    const errData = await response.json();
    return {
      status: 400,
      message: { "Unable to Login": errData },
    };
  }

  return {
    status: 200,
    message: "User logged in successfully",
  };
};
