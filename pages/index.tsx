import React, { Component } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import fetch from "isomorphic-fetch";
import unescape from "unescape";
import reset from "@rosszurowski/vanilla";

const ARENA_CHANNEL_ID = "broken-idioms";
const ARENA_CHANNEL_SLUG = "ross-zurowski/broken-idioms";

type ArenaBlock = {
  id: string;
  title: string;
  description: string;
  content: string;
};

type Props = {
  data: ArenaBlock[];
};

export default function IndexPage(props: Props) {
  const { data } = props;
  return (
    <main>
      <Head>
        <meta charSet="utf-8" />
        <title>Broken Idioms</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta
          name="description"
          content="A collection of messed up idioms to sneak into conversations."
        />
      </Head>
      <h1>
        Broken Idioms <a href={`https://are.na/${ARENA_CHANNEL_SLUG}`}>✶✶</a>
      </h1>
      <ul>
        {data.length === 0 ? (
          <>
            <li>&mdash;</li>
            <li>&mdash;</li>
            <li>&mdash;</li>
          </>
        ) : (
          data.map((d) => <li key={d.id}>{unescape(d.content, "default")}</li>)
        )}
      </ul>
      <style jsx global>
        {reset}
      </style>
      <style jsx global>{`
        html {
          font-family: Georgia, Times, serif;
          font-size: 17px;
        }

        @media only screen and (min-width: 560px) {
          html {
            font-size: 20px;
          }
        }
      `}</style>
      <style jsx>{`
        main {
          padding-top: 6rem;
          padding-bottom: 12rem;
          max-width: 35em;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }

        h1 {
          font-size: 1rem;
          margin-bottom: 12vh;
        }

        h1 a {
          color: #454545;
          font-size: 0.7rem;
          margin-left: 0.5rem;
        }

        h1 a:hover {
          color: #777;
        }

        ul {
          list-style: none;
        }

        ul.display-none {
          display: none;
        }

        li::before {
          content: "*";
          position: relative;
          top: 4px;
          display: inline-block;
          opacity: 0.5;
          margin-left: -1.25em; /* same as padding-left set on li */
          width: 1.25em;
        }

        li {
          padding-left: 1.25em;
          margin-top: 1em;
          margin-bottom: 1em;
          font-size: 1rem;
          line-height: 1.25;
        }
      `}</style>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await fetch(
    `https://api.are.na/v2/channels/${ARENA_CHANNEL_ID}/contents?per=200`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .then((json) => json.contents.reverse());

  return {
    props: {
      data,
    },
  };
};
