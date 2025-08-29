import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { SignIn, SignOut } from "@/components/next-auth-buttons";
import { authOptions } from "@/lib";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className={styles.main}>
      {!!session && <pre>{JSON.stringify(session, null, 2)}</pre>}
      {!!session ? <SignOut /> : <SignIn />}
    </main>
  );
}
