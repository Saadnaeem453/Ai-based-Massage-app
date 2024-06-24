import React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text } from '@react-email/components';

interface VerificationEmailProps {
    username: string;
    otp: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({ username, otp }) => (
    <Html lang="en">
        <Head>
            <title>Verification Code</title>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
                rel="stylesheet"
            />
            <style>
                {`
          body {
            font-family: 'Roboto', sans-serif;
          }
        `}
            </style>
        </Head>
        <Preview>Your verification code is {otp}</Preview>
        <Body style={{ backgroundColor: '#f6f6f6', margin: '0', padding: '20px' }}>
            <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                <Heading style={{ fontSize: '24px', color: '#333' }}>Verification Code</Heading>
                <Text>Hello {username},</Text>
                <Text>Your verification code is: <strong>{otp}</strong></Text>
                <Text>Thank you for signing up!</Text>
            </Container>
        </Body>
    </Html>
);

export default VerificationEmail;
