import { Text } from "@mantine/core";

export const Footer = ({ year, fullName, studentId }) => {
  return (
    <Text color="dimmed" align="center" mt="sm">
      Copyright © {year} {fullName} {studentId}
    </Text>
  );
};
