"use client";
import { Button, Container, Divider, Group, Pagination, Rating, Text, Textarea, Title } from "@mantine/core";

export default function FoodReviewPage() {
  return (
    <Container size="600px">
      <Title order={2}>Food Review 🍕</Title>

      <Title order={4} mt="sm">Your rating</Title>

      <Rating size="lg" />

      <Textarea label="Your review" placeholder="Do you enjoy eating?" mt="xs" minRows={3} />

      <Button mt="xs" color="orange">Submit Review</Button>

      <Divider mt="sm" />

      <Group mt="sm" position="center">
        <Title order={4}>Elon Musk</Title>
        <Rating value={5} size="sm" readOnly />
      </Group>
      <Text color="dimmed" align="center">
        Best pizza in this world. I give you X score.
      </Text>

      <Divider mt="sm" />

      <Group mt="sm" position="center">
        <Title order={4}>Mark Zuck</Title>
        <Rating value={4} size="sm" readOnly />
      </Group>
      <Text color="dimmed" align="center">
        My favourite part is pepperoni
      </Text>

      <Pagination mt="md" total={20} color="orange" position="center" />

      <Text align="center" color="dimmed" my="sm">
        Copyright © 2023 Chayanin Suatap 650610560
      </Text>
    </Container>
  );
}
