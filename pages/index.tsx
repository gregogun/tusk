// index.tsx
import React from 'react';
import styles from '@styles/Home.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

const Container = ({ children }) => (
  <div className={styles.container}>
    <main className={styles.main}>{children}</main>
  </div>
);

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Container>
        <h1>Loading</h1>
      </Container>
    );
  }

  if (session) {
    return (
      <Container>
        Signed in as {session.user?.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign Out
        </button>
      </Container>
    );
  }

  return (
    <Container>
      Not signed in <br />
      <button type="button" onClick={() => signIn()}>
        Sign In
      </button>
    </Container>
  );
};

export default Home;
