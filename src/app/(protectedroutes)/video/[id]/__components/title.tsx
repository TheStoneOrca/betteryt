"use client";

export default function VideoTitle(props: { title: string }) {
  return <h1 className="lg:text-3xl md:text-5xl sm:text-4xl">{props.title}</h1>;
}
