"use client";

import { $authenStore } from "@/libs/authenStore";
import { Group, Loader, Paper, Text, Title } from "@mantine/core";
import { useStore } from "@nanostores/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const RecentEnrollmentsSection = () => {
  const { token } = useStore($authenStore);
  const [loadingRecentEnrollments, setLoadingRecentEnrollments] =
    useState(true);
  const [recentEnrollments, setRecentEnrollments] = useState(null);

  const callRecentEnrollmentApi = async () => {
    setLoadingRecentEnrollments(true);
    try {
      const resp = await axios.get("/api/enrollment/recent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(resp.data.recentEnrollments);
      setRecentEnrollments(resp.data.recentEnrollments);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else alert(error.message);
    }
    setLoadingRecentEnrollments(false);
  };

  useEffect(() => {
    callRecentEnrollmentApi();
  }, []);

  function computeDate(dateISOString) {
    const date = new Date(dateISOString);
    return date.toLocaleTimeString() + " " + date.toLocaleDateString();
  }

  return (
    <Paper withBorder p="md">
      <Title order={4}>Recent Enrollment(s)</Title>
      {loadingRecentEnrollments && !recentEnrollments && (
        <Loader variant="dots" />
      )}
      {!loadingRecentEnrollments &&
        recentEnrollments &&
        recentEnrollments.map((enroll) => (
          <Group spacing="xs" key={enroll.id}>
            <Text fw="bold" color="dimmed">
              {enroll.student.studentId} - {enroll.student.firstName}
            </Text>
            <Text color="dimmed">👉</Text>
            <Text fw="bold" color="dimmed">
              {enroll.course.courseNo} - {enroll.course.title}
            </Text>
            <Text color="dimmed" ml="auto">
              {" "}
              {computeDate(enroll.createdAt)}
            </Text>
          </Group>
        ))}
    </Paper>
  );
};
