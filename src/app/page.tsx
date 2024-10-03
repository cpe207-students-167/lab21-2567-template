"use client";

import { $authenStore } from "@lib/authenStore";
import { Course } from "@lib/types";
import {
  Button,
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
import { useRouter } from "next/navigation";

export default function Home() {
  // All courses state
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  // declare useRouter
  const router = useRouter();

  const loadCourses = async () => {
    setLoadingCourses(true);
    const resp = await axios.get("/api/courses");
    setCourses(resp.data.courses);
    setLoadingCourses(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const login = async () => {
    setLoadingLogin(true);
    try {
      const resp = await axios.post("/api/user/login", { username, password });
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("authenUsername", resp.data.username);

      //save token and authenUsername to global store
      $authenStore.set({
        token: resp.data.token,
        authenUsername: resp.data.username,
      });

      //navigate to /student
      router.push("/student");
    } catch (error) {
      // if (error.response) alert(error.response.data.message);
      // else alert(error.message);

      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        alert(error.response?.data.message);
        // Do something with this error...
      } else {
        console.error(error);
        alert(error);
      }
    }
    setLoadingLogin(false);
  };

  return (
    <Stack>
      {/* all courses section */}
      <Paper withBorder p="md">
        <Title order={4}>All courses</Title>

        {loadingCourses && !courses && <Loader type="dots" />}

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
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
              type="password"
            />
            <Button type="submit" disabled={loadingLogin}>
              {loadingLogin ? "Login..." : "Login"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Stack>
  );
}
