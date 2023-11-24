"use client";

import { $authenStore } from "@/libs/authenStore";
import { Button, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import { useStore } from "@nanostores/react";
import axios from "axios";
import { useState } from "react";

export const SearchCourseSection = () => {
  const { token } = useStore($authenStore);

  const [searchText, setSearchText] = useState("");
  const [loadingSearchCourse, setLoadingSearchCourse] = useState(false);
  const [searchCourseResult, setSearchCourseResult] = useState(null);

  const callSearchCourse = async () => {
    setLoadingSearchCourse(true);
    setSearchCourseResult(null);
    try {
      const resp = await axios.get(
        `/api/course/search?searchText=${searchText}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchCourseResult(resp.data.courses);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else alert(error.message);
    }
    setLoadingSearchCourse(false);
  };

  return (
    <Paper withBorder p="md">
      <Title order={4}> Search Course Title</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          callSearchCourse();
        }}
      >
        <Group my="xs">
          <TextInput
            placeholder="Search with Course title.."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            required
            minLength={1}
          />
          <Button type="submit" loading={loadingSearchCourse}>
            Search
          </Button>
        </Group>
      </form>
      {searchCourseResult &&
        searchCourseResult.length > 0 &&
        searchCourseResult.map((course) => (
          <Text fw="bold" color="dimmed" key={course.courseNo}>
            {course.courseNo} - {course.title}
          </Text>
        ))}

      {searchCourseResult && searchCourseResult.length === 0 && (
        <Text color="dimmed">Course is not found 😥</Text>
      )}
    </Paper>
  );
};
