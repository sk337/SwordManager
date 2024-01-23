
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { login } from "@/utils/login"

export default function Login() {
  function flogin() {
    login(
      document.getElementById("username").value,
      document.getElementById("password").value,
    ).then((res) => {
      if (res.error) {
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("desc").innerHTML =
          `${res.error}: ${res.message}`;
      } else {
        window.localStorage.setItem("token", res.token);
        window.location.reload();
      }
    });
  }
  
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap items-center justify-center w-2/5 mt-10">
        <Alert id="error" className="bg-red-500 hidden">
          <AlertTitle>Error</AlertTitle>
          <hr className="text-white" />
          <AlertDescription id="desc">
            Invalid Username or Password
          </AlertDescription>
        </Alert>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className=" text-center">
              Login With Swordbattle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input id="username" placeholder="Username"></Input>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              className="mt-3"
            ></Input>
            <Button
              className="text-center mt-5 w-full bg-blue-500 hover:bg-blue-600"
              onClick={flogin}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
