"use client";
import { $authenStore } from "@/libs/authenStore";
import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { authenUsername, role } = useStore($authenStore);

  const logout = () => {
    router.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("authenUsername");
  };

  return (
    <Stack>
      <Paper withBorder p="md">
        <Group>
          <Title order={4}>Hi, {authenUsername}</Title>
          <Title order={5} color="dimmed">
            ({role})
          </Title>
          <Button color="red" onClick={logout}>
            Logout
          </Button>
        </Group>
      </Paper>
      {children}
    </Stack>
  );
}
