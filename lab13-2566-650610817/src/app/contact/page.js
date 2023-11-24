import { IconBrandFacebook, IconBrandTwitter } from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <div className="text-center">
      <p className="fw-bold fs-4">Contact</p>
      <p>
        <strong>
          <IconBrandFacebook /> Facebook :
        </strong>
        TOP10IMDB
      </p>
      <p>
        <strong>
          <IconBrandTwitter /> Twitter :
        </strong>
        @TOP10IMDB
      </p>
    </div>
  );
}
