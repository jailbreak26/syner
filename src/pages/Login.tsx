import { Button, TextInput, Label } from "flowbite-react";
import { HiUser, HiLockClosed, HiGlobeAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { useState } from "react";
import SpinnerLoading from "../components/SpinnerLoading";
import logo from "../public/logo.png";

//
import { login } from "../api/apiService";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  //message
  const [showAlter, setShowAlert] = useState(false);
  const [messageError, setMessageError] = useState({
    color: "warning",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  async function onRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); //disable refresh
    setLoading(true);
    // Get the form data
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Retrieve input values
    const username = formData.get("username")?.toString().trim() as string;
    const password = formData.get("password")?.toString().trim() as string;
    let url = formData.get("dns")?.toString().trim();

    // Parse the url input to remove extra parts (query params, slashes, etc.)
    try {
      const parsedUrl = new URL(url as string);
      url = `${parsedUrl.protocol}//${parsedUrl.hostname}`; // Get the base URL (protocol + hostname)
      if (parsedUrl.port) {
        url += `:${parsedUrl.port}`;
      }
    } catch (error) {
      setLoading(false);
      setMessageError({
        color: "warning",
        message:
          "Verify that you have entered the correct URL for the login page",
      });

      setShowAlert(true);
      console.error("Invalid URL provided:", url);
      // Optionally, handle invalid URL case
      return;
    }
    console.log("Form Submitted:", { username, password, url });

    try {
      //TODO: Do Login
      await login(url, username, password);
      navigate("/home");
    } catch (err) {
      setMessageError({
        color: "failure",
        message: "Login failed. Please check your credentials.",
      });
      setShowAlert(true);
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <form
        onSubmit={onRegister}
        className="flex w-96 flex-col items-center justify-center gap-5"
      >
        <img src={logo} alt="LOGO" className="w-32 md:w-40" />

        {showAlter && (
          <Alert
            color={messageError.color}
            onDismiss={() => setShowAlert(false)}
            className="w-full"
          >
            <span className="font-medium">Please Review Your Submission</span>
            <p>{messageError.message}</p>
          </Alert>
        )}

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput
            id="username"
            type="text"
            name="username"
            icon={HiUser}
            placeholder="Username"
            required
            onChange={(e) => {
              // Remove all spaces and trim leading spaces
              e.target.value = e.target.value.replace(/\s/g, "").trimStart();
            }}
          />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="text"
            name="password"
            icon={HiLockClosed}
            placeholder="Password"
            required
            onChange={(e) => {
              // Remove all spaces and trim leading spaces
              e.target.value = e.target.value.replace(/\s/g, "").trimStart();
            }}
          />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="dns" value="Your url" />
          </div>
          <TextInput
            id="dns"
            type="text"
            name="dns"
            icon={HiGlobeAlt}
            placeholder="server dns"
            required
            // pattern="^[^\s]*$"
            // pattern="https?://.*"
            onChange={(e) => {
              // Remove all spaces and trim leading spaces
              e.target.value = e.target.value.replace(/\s/g, "").trimStart();
            }}
          />
        </div>
        <Button color="primary" type="submit" className="w-full">
          {loading && <SpinnerLoading />}
          Register
        </Button>
      </form>
    </main>
  );
};

export default LoginPage;
