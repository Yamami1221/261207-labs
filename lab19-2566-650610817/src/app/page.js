"use client";
import { Footer } from "@/components/Footer";
import {
  Button,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  //All courses state
  const [courses, setCourses] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(false);
  //login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [authenUsername, setAuthenUsername] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  //my courses state
  const [myCourses, setMyCourses] = useState(null);
  const [loadingMyCourses, setLoadingMyCourses] = useState(false);

  const loadCourses = async () => {
    setLoadingCourses(true);
    const resp = await axios.get("/api/course");
    setCourses(resp.data.courses);
    setLoadingCourses(false);
  };

  const loadMyCourses = async () => {
    setLoadingMyCourses(true);
    const resp = await axios.get("/api/enrollment", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyCourses(resp.data.courses);
    setLoadingMyCourses(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (!token) return;

    loadMyCourses();
  }, [token]);

  const login = async () => {
    setLoadingLogin(true);
    try {
      const resp = await axios.post("/api/user/login", { username, password });
      setToken(resp.data.token);
      setAuthenUsername(resp.data.username);
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response.data) {
        alert(error.response.data.message);
      }
    }
    setLoadingLogin(false);
  };

  const logout = () => {
    setAuthenUsername(null);
    setToken(null);
    setMyCourses(null);
  };

  return (
    <Container size="sm">
      <Title italic align="center" color="violet" my="xs">
        Course Enrollment
      </Title>
      <Stack>
        {/* all courses section */}
        <Paper withBorder p="md">
          <Title order={4}>All courses</Title>
          {loadingCourses && !courses && <Loader variant="dots" />}
          {courses &&
            courses.map((course) => (
              <Text key={course.courseNo}>
                {course.courseNo} - {course.title}
              </Text>
            ))}
        </Paper>

        {/* log in section */}
        <Paper withBorder p="md">
          <Title order={4}>Login</Title>
          {!authenUsername && (
            <Group align="flex-end">
              <TextInput
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <TextInput
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Button onClick={login} disabled={loadingLogin}>{!loadingLogin ? 'Login' : 'Login...'}</Button>
            </Group>
          )}
          {authenUsername && (
            <Group>
              <Text fw="bold">Hi {authenUsername}!</Text>
              <Button color="red" onClick={logout}>
                Logout
              </Button>
            </Group>
          )}
        </Paper>

        {/* enrollment section */}
        <Paper withBorder p="md">
          <Title order={4}>My courses</Title>
          {!authenUsername && (
            <Text color="dimmed">Please login to see your course(s)</Text>
          )}
          {authenUsername &&
            myCourses &&
            myCourses.map((course) => (
              <Text key={course.courseNo}>
                {course.courseNo} - {course.title}
              </Text>
            ))}

          {/* Do something with below loader!! */}
          {loadingMyCourses && <Loader variant="dots" />}
        </Paper>
        <Footer year="2023" fullName="Anak Sarntinoranont" studentId="650610817" />
      </Stack>
    </Container>
  );
}
