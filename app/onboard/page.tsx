import ContactForm from "@/components/onboard/ContactForm";
import React from "react";

type Props = {};

const OnboardPage = (props: Props) => {
  return (
    <section className="flex min-h-screen flex-col items-center container mt-2">
      <ContactForm />
    </section>
  );
};

export default OnboardPage;
