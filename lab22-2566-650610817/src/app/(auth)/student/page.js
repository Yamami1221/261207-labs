"use client";
import { $authenStore } from "@/libs/authenStore";
import {
  Button,
  Group,
  Loader,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useStore } from "@nanostores/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentPage() {
  const { token } = useStore($authenStore);
  const [myEnrollments, setMyEnrollments] = useState(null);
  const [loadingMyEnrollments, setLoadingMyEnrollments] = useState(false);
  const [loadingEnrolling, setLoadingEnrolling] = useState(false);
  //null = not loading, has value = loading that courseNo
  const [loadingDropping, setLoadingDropping] = useState(null);
  const [courseNo, setCourseNo] = useState();

  const loadMyCourses = async () => {
    setLoadingMyEnrollments(true);
    const resp = await axios.get("/api/enrollment", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setMyEnrollments(resp.data.enrollments);
    setLoadingMyEnrollments(false);
  };

  useEffect(() => {
    loadMyCourses();
  }, []);

  const callEnrollApi = async () => {
    setLoadingEnrolling(true);
    try {
      const resp = await axios.post(
        "/api/enrollment/",
        {
          courseNo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourseNo("");
      loadMyCourses();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else alert(error.message);
    }
    setLoadingEnrolling(false);
  };

  const callDropApi = async (enrollmentId) => {
    setLoadingDropping(enrollmentId);
    try {
      const resp = await axios.delete("/api/enrollment/", {
        data: {
          enrollmentId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      loadMyCourses();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else alert(error.message);
    }
    setLoadingDropping(null);
  };

  return (
    <>
      <Paper withBorder p="md">
        <Title order={4}>My Course(s)</Title>

        {myEnrollments &&
          myEnrollments.map((enroll) => (
            <Group my="xs" key={enroll.course.courseNo}>
              <Text>
                {enroll.course.courseNo} - {enroll.course.title}
              </Text>
              <Button
                color="red"
                size="xs"
                onClick={() => callDropApi(enroll.id)}
                loading={enroll.id === loadingDropping}
              >
                Drop
              </Button>
            </Group>
          ))}
        {myEnrollments && myEnrollments.length === 0 && (
          <Text color="dimmed" size="sm">
            You have not enrolled any course yet!
          </Text>
        )}
        {loadingMyEnrollments && <Loader variant="dots" />}
      </Paper>

      <Paper withBorder p="md">
        <Title order={4}> Enroll a Course</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            callEnrollApi();
          }}
        >
          <Group>
            <TextInput
              placeholder="6 Digits Course No."
              maxLength={6}
              minLength={6}
              pattern="^[0-9]*$"
              required
              onChange={(e) => setCourseNo(e.target.value)}
              value={courseNo}
            />
            <Button type="submit" loading={loadingEnrolling}>
              Enroll
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}
