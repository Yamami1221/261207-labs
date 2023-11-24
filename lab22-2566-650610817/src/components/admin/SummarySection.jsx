"use client";

import { $authenStore } from "@/libs/authenStore";
import { Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { useStore } from "@nanostores/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const SummarySection = () => {
  const { token } = useStore($authenStore);

  //summary stats
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [summaryStat, setSummaryStat] = useState(null);

  const callSummaryApi = async () => {
    setLoadingSummary(true);
    try {
      const resp = await axios.get("/api/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      //take everything except "ok" key
      const { ok, ...rest } = resp.data;
      setSummaryStat(rest);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else alert(error.message);
    }
    setLoadingSummary(false);
  };

  useEffect(() => {
    callSummaryApi();
  }, []);

  return (
    <Paper withBorder p="md">
      <Title order={4}>Summary</Title>
      {loadingSummary && !summaryStat && <Loader variant="dots" />}
      {!loadingSummary && summaryStat && (
        <Stack>
          <Group>
            <Title order={5} color="dimmed">
              Users ({summaryStat.userCount})
            </Title>
            <Title order={5} color="dimmed">
              Courses ({summaryStat.courseCount})
            </Title>
            <Title order={5} color="dimmed">
              Students ({summaryStat.studentCount})
            </Title>
            <Title order={5} color="dimmed">
              CPE ({summaryStat.cpeCount})
            </Title>
            <Title order={5} color="dimmed">
              ISNE ({summaryStat.isneCount})
            </Title>
          </Group>
          <Stack spacing={0}>
            {summaryStat.enrollmentCountByStudent.map((student) => (
              <Text key={student.studentId}>
                {student.studentId} - {student.firstName} {student.lastName}{" "}
                {student._count.enrollments} course(s)
              </Text>
            ))}
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};
