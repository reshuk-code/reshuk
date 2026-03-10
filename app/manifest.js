export default function manifest() {
  return {
    name: "Reshuk Sapkota",
    short_name: "Reshuk",
    description: "Full-stack developer building tools, apps, and digital experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#060608",
    theme_color: "#060608",
    icons: [
      {
        src: "/favicon.png", // Or manifest-icon-192.png if you have it
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
