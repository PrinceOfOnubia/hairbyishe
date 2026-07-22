import {Shell} from "./storefront";
type Section={title:string;body?:string;items?:string[]};
export function PolicyPage({eyebrow,title,intro,sections}:{eyebrow:string;title:string;intro:string;sections:Section[]}){return <Shell><section className="policy-page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="policy-intro">{intro}</p>{sections.map(section=><article key={section.title}><h2>{section.title}</h2>{section.body&&<p>{section.body}</p>}{section.items&&<ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</article>)}</section></Shell>}
