import parse, {domToReact} from 'html-react-parser'
import Link from 'next/link'
import Image from 'next/image'

import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

export function fixInternalLinks(html_string) {
  const pattern =
    /href="https:\/\/staging.fribuffet.fr\/([-a-z0-9]+)/i
  const replacement = 'data-internal-link="true" href="/blog/$1"'

  return html_string.replace(pattern, replacement)
}

export default function parseHtml(html) {
  const content = fixInternalLinks(html)

  const options = {
    replace: ({name, attribs, children}) => {
      // Convert internal links to Next.js Link components.
    //  console.log(attribs)
      const isInternalLink =
        name === 'a' && attribs['data-internal-link'] === 'true'

      if (isInternalLink) {
        return <Link href={attribs.href}>{domToReact(children, options)}</Link>
      } else if (name === 'img') {
        return (
          <Image
            src={attribs.src}
            width={attribs.width}
            height={attribs.height}
            alt={attribs.alt ? attribs.alt : 'Blog post image'}
          />
        )
     
    } else if (name === 'iframe') {
        console.log(attribs.src)
        if(attribs.src.includes('youtube')) {
        //if(/src=".+youtube/.test(attribs.src)){ console.log( 'esyoutube' )}
        return (
        <LiteYouTubeEmbed
        aspectHeight="9"
        aspectWidth="16"
        id="TMMX32ershU"
        title="test"
        />
        )
        }
    }
    }
  }

  return parse(content, options)
}
