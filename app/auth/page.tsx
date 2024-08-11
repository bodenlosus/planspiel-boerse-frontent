import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "./login/form";
import SignUpForm from "./signup/form";

export default function AuthPage() {
  return (
    <main className="grow flex justify-center items-center">
      <Card className="min-w-[350px] w-fit max-w-[33%] bg-muted/10">
        <Tabs defaultValue="signup">
          <CardHeader>
            <TabsContent className="flex flex-col gap-2" value="signup">
              <CardTitle className="text-center">Create an Account</CardTitle>
              <CardDescription>
                Start by entering your E-Mail below
              </CardDescription>
            </TabsContent>
            <TabsContent className="flex flex-col gap-2" value="login">
              <CardTitle className="text-center">Welcome back</CardTitle>
              <CardDescription>
                Log in by entering your E-Mail and password below
              </CardDescription>
            </TabsContent>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <TabsList className="w-full flex flex-row justify-evenly">
              <TabsTrigger className="grow" value="signup">
                Sign up
              </TabsTrigger>
              <TabsTrigger className="grow" value="login">
                Log in
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </main>
  );
}
