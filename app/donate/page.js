import DonateClient from "./DonateClient";

export const metadata = {
  title: "Support My Work 🥟",
  description: "If my work helped you or saved you time, fuel the next late-night coding session by buying me a momo.",
  openGraph: {
    title: "Buy Reshuk a Momo 🥟",
    description: "Support Reshuk's development work with a small donation via eSewa.",
    url: "https://reshuksapkota.com.np/donate",
  },
};

export default function DonatePage() {
  return <DonateClient />;
}
