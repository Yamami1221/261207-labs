import { IconStar } from "@tabler/icons-react";
import Link from "next/link";

export const MovieRow = ({ id, title, rating, number }) => {
  return (
    <div className="d-flex justify-content-between gap-3">
      <Link href={"/movie/" + id}>
        {number}. {title}
      </Link>
      <span className="text-primary fw-bold">
        <IconStar /> {rating}
      </span>
    </div>
  );
};
