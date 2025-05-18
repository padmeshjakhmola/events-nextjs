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

  const data = await response.json();

  if (!response.ok) {
    return {
      status: response.status,
      message: "Unable to sign up",
      error: data,
    };
  }


  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token);
  }

  return {
    status: 200,
    message: "User created successfully",
    user: data.user,
    token: data.token,
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
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      status: response.status,
      message: "Unable to login",
      error: data,
    };
  }


  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token);
  }

  return {
    status: 200,
    message: "User logged in successfully",
    user: data.user,
    token: data.token,
  };
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = JSON.parse(
      atob(token.split(".")[1]) 
    );

    return { user: decoded };
  } catch {
    return null;
  }
};
