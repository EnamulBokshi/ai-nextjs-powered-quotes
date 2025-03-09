import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Font,
  Row,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Varification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2",
            
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading>Hi {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for being a part of our community. Please use the
            following code to verify your account.
          </Text>
        </Row>
        <Row>
          <Text>
            if you didn't request this code, you can safely ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
