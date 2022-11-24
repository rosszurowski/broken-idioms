import unescape from "unescape"

export default async function Page() {
  const data = await getArenaBlocks()

  return (
    <main>
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
    </main>
  )
}

const ARENA_CHANNEL_ID = "broken-idioms"
const ARENA_CHANNEL_SLUG = "ross-zurowski/broken-idioms"

type ArenaBlock = {
  id: string
  title: string
  description: string
  content: string
}

async function getArenaBlocks(): Promise<ArenaBlock[]> {
  const data = await fetch(
    `https://api.are.na/v2/channels/${ARENA_CHANNEL_ID}/contents?per=200`,
    { next: { revalidate: 5 * 60 } }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res
    })
    .then((res) => res.json())
    .then((json) => json.contents.reverse())

  return data
}
