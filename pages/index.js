import React, { Component } from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-fetch';
import unescape from 'unescape';
import reset from '@rosszurowski/vanilla';

const ARENA_CHANNEL_ID = 'broken-idioms';


export default class IndexPage extends Component {
  state = {
    data: []
  }

  componentDidMount () {
    fetch(`https://api.are.na/v2/channels/${ARENA_CHANNEL_ID}/contents?per=200`)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(json => this.setState({ data: json.contents.reverse() }))
      .catch(err => console.log(err));
  }

  render () {
    const { data } = this.state;

    return (
      <main>
        <Head>
          <meta charset="utf-8" />
          <title>Broken Idioms</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
          <meta name="description" content="Designer and developer from Toronto." />
        </Head>
        <h1>Broken Idioms</h1>
        {data.length === 0 && (
          <ul>
            <li>{'—'}</li>
            <li>&mdash;</li>
            <li>&mdash;</li>
          </ul>
        )}
        <ul className={data.length > 0 ? '' : 'display-none'}>
        {data.map(d => (
          <li key={d.id}>
            {unescape(d.content)}
          </li>
        ))}
        </ul>
        <style jsx global>{reset}</style>
        <style jsx global>{`
          html {
            font-family: Georgia, Times, serif;
            font-size: 17px;
          }

          @media only screen and (min-width: 560px) {
            font-size: 21px;
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
            margin-bottom: 20vh;
          }

          ul {
            list-style: none;
          }

          ul.display-none {
            display: none;
          }

          li::before {
            content: '*';
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
    )
  }
}
