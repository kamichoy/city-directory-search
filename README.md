# City Directory Search

Search the OCR full text of city directories on the Internet Archive across many years at once, without downloading the scans. Every result links straight to its page scan.

**Try it: <https://city-directory-search.kami-cai.com/>**

The tool is a static web page: `index.html` plus `collections.js`, the list of collections in the menu. There is no build step, no server, no account, and no dependencies. It talks directly to the Internet Archive's public APIs from your browser.

## Why I built it

City directories are one of the best sources for tracing a person, a business, or an address over time. I use them constantly in my research, and for a long time I relied on the Internet Archive’s “Search text contents” option to find what I needed.

That search tells you which books contain your term, but not where, or in what context. Every result had to be opened and searched again before I could tell whether it held the entry I was looking for, and in a directory with thousands of pages, a word like “Meridian” turns up hundreds of times in a single volume. Following one address through forty years meant forty rounds of opening, searching, and scrolling.

This tool skips that step. It runs the search across every volume you select and lists each individual hit in one table, grouped by year, with the surrounding text and a link straight to the page scan. You can tell at a glance which entry is the one you want before opening anything.

I built it around the [Indianapolis Public Library’s city directory collection](https://archive.org/details/indianapolispubliclibrarycitydirectories), but it works with any city directories on the Internet Archive that have OCR text. The menu lists nearly thirty collections across fourteen states, Canada, and Scotland, and you can search for any other city by name.

## Getting started

Use the hosted version at <https://city-directory-search.kami-cai.com/>, or run it yourself by opening `index.html` in a browser (keep `collections.js` next to it).

If a request is blocked when the page is opened from `file://`, serve the folder locally instead:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. The file can also be hosted as-is on any static host, such as Cloudflare Pages or GitHub Pages.

## How to use it

### 1. Pick the directories

Nothing is loaded until you choose a source in the **Directory collection** menu:

- **A collection from the list.** Collections are grouped by state. Some are filtered to leave out other material the library filed with them (plat books, histories, maps); the note under the menu says so and links to the collection on the Internet Archive.
- **Search by city name…** finds volumes anywhere on the Internet Archive whose title has that name and the word "directory". Results can include other places with the same name, or phone and church directories; remove those with ×.
- **Custom Internet Archive query…** takes any advanced search query, e.g. `collection:allen_county AND title:("fort wayne" AND "city directory")`. **Query notes** lists the syntax.

Choosing a source replaces the list of volumes. The choice is remembered in your browser and shown in the address bar, so you can bookmark it or use **Copy link to this collection** to send a colleague a link that opens the same collection:

| Link | Opens |
| --- | --- |
| `?c=fort-wayne` | a collection from the menu, by its `id` in `collections.js` |
| `?collection=allen_county` | any Internet Archive collection |
| `?city=Evansville` | a search by city name |
| `?q=...` | a custom query |

**Add to list** adds individual Internet Archive identifiers or `archive.org` links, one per line, on top of the current list.

Then choose which volumes to search:

- **Select range** selects every volume between two years.
- **Decade buttons** select a decade. Hold Shift, Ctrl, or Cmd while clicking to add the decade to the current selection instead of replacing it.
- **Select all** and **Clear selection** check or uncheck every volume.
- **Year checkboxes** toggle all volumes for a year. Each volume is listed under its year with its own checkbox, and the × button removes it from the list.
- **Remove unselected from list** keeps only the checked volumes, and **Empty list** clears everything.

### 2. Enter search terms

Put one term per line: an address, a name, a business. Each term is searched in each selected volume.

- Words in a term must all appear in the same passage.
- Put words in quotes to require them to appear together, e.g. `"N Meridian" 1234`. Case, punctuation, and line breaks are ignored, so `"N Meridian"` also matches `N. Meridian`. The quotes carry over to the Internet Archive viewer's search box when you open a result.
- Quoted terms are also much faster. The Internet Archive's search returns every passage containing any one of the words, so an unquoted term with common words like `N` or `Meridian` can take a minute per volume or time out. A request that gets no answer in 45 seconds is dropped and reported as failed.
- To look up an address, search house number plus street, e.g. `1234 N Meridian`. The street directory section (usually in the back) is arranged by street and house number.
- **OCR-tolerant house numbers** (on by default). In the name listings an address comes last, after a code letter: `Chung Paul P pres Bamboo Inn Inc r118 W Ohio` (r = resides, h = householder). OCR reads `r118` as one word and often misreads the digits, so the index holds `rll8`, which a search for `118` never finds. In a test on the 1945 Indianapolis directory, `"118 W Ohio"` found 3 entries and `"rll8 W Ohio"` found 13 more. With this option, an address term also searches the number's common OCR forms (prefixed with r, h, x or t; 1 as l or i; 0 as o; 8 as b) and keeps those followed by the street. They are labelled **OCR variant**. It adds one request per address term and volume.
- **Street sweep** (off by default) also searches the street on its own and keeps house numbers that are one character off after correcting OCR, e.g. `rlli8 W O‘hio` for 118 W Ohio. These are labelled **possible** and can be different addresses (here, 1118). Street names tolerate stray apostrophes and periods inside words.
- OCR often confuses `0`/`O` and `1`/`l`, and multi-column layouts can run lines together. If nothing comes up, try a shorter term or an alternate spelling.
- If an address doesn't turn up in a year, search the neighboring house numbers on the same street. Open the page where they appear and look for your address in the scan: it may be there but misread, or the page may be folded or damaged in the scan.

Common Polk directory abbreviations:

| Abbreviation | Meaning |
| --- | --- |
| `av` | avenue |
| `h` | householder |
| `r` | resides |
| `wid` | widow |
| `(c)` | "colored," used in older directories to designate Black residents |

**Stop** halts a search in progress and keeps the results found so far.

### 3. Read the results

Results appear as they come in, grouped by year.

- Click a column header (**Year**, **Term**, **Scan**) to sort; click again to reverse.
- **Filter results** narrows the table by excerpt text, term, or year.
- Long excerpts are trimmed around the hit. Click one to show the full OCR passage.
- **likely ad or heading** marks a short, mostly capital-letter passage that starts at the match, such as `E 118 W. OHIO ST. INDIANAPOLIS`. These are usually the last line of an advertisement: OCR splits ads into fragments and often misses the company name in large type. Read them on the scan. An ad can corroborate a business listed at the same address that year.
- The Internet Archive returns one OCR paragraph per hit. When that paragraph starts at the hit, as it often does when an address wraps onto its own line, the name it belongs to is in the line before. For those hits the tool downloads just that page's OCR (one byte range of the item's `_hocr.html`, located with `_hocr_pageindex.json.gz`) and rebuilds the excerpt to include the text before it. This is capped at 10 pages per volume and 80 per search.
- Each hit has an ID under its year, e.g. `1947-002`. It appears in the CSV and in Copy for AI, so a row in a spreadsheet or an AI summary can be traced back to its source.
- The **Scan** link opens the page in the Internet Archive viewer with your term highlighted. The two-page view shows the matching page next to its neighbor. `scan 332` is the scan (image) number; below it, `p. 412` is the page number printed in the directory, when the Internet Archive has it.
- A `≈` before the scan number means the page was estimated (see *Volumes missing from the full-text index* below). The entry may be many pages away.
- **Cite** copies a citation for the page, e.g. *Polk's Indianapolis City Directory (1945), p. 412, scan 2311. Internet Archive, https://archive.org/details/…/page/leaf2311 (accessed October 23, 2026).* Check the title and publisher against the volume's title page before using it in a nomination.
- **Export CSV** downloads the currently filtered results with these columns: `hit_id`, `year`, `term`, `match` (term, variant, or possible), `matched_text`, `flags` (ad, starts_at_match, page_estimated, from_ocr_text), `snippet`, `context` (about 900 characters around the hit), `full_text` (the whole OCR passage), `scan`, `scan_estimated`, `printed_page`, `source` (search index or OCR text), `link`, `citation`, `title`, `volume`, `identifier`.
- **Copy for AI** copies the shown results to the clipboard, ready to paste into an AI assistant. See below.

### 4. Sorting results with an AI assistant

Directory hits are messy: OCR errors, abbreviations, and neighboring entries run together. An AI assistant is good at the first pass of sorting them into a table of who was at an address each year. **Copy for AI** copies the filtered results together with instructions that:

- mark the matched words with `[[ ]]` and flag variant and possible matches, likely ads, excerpts that start at the match, and estimated pages;
- explain how to read names listings (the address ends the entry, so the person is the name before it), business listings, the street directory, and advertisements, plus common OCR misreadings and Polk abbreviations;
- tell the assistant to use only the excerpts, not to fill gaps from elsewhere, and to show the original text when it corrects an OCR error;
- ask for an occupancy table by year (address, names, occupation, household notes, confidence, hit ID, link), a separate list of advertisements and what they corroborate, hits that don't match, coverage gaps, changes over time, and the hits most worth checking on the scan;
- list the volumes that were searched without a hit, and any searches that failed.

Paste it into the assistant you use; nothing is sent anywhere by the tool. Treat the result as a finding aid, not a source: open the link on every row you plan to use and confirm it against the scan, and cite the directory, not the AI.


## How it works

| Step | Endpoint |
| --- | --- |
| List the volumes in a collection | `archive.org/advancedsearch.php` |
| Look up each item's server, path, and file names | `archive.org/metadata/{identifier}` |
| Search inside a volume | `{server}/fulltext/inside.php` |
| Printed page numbers, for citations | `archive.org/download/{identifier}/{name}_page_numbers.json` |
| Fallback: download the OCR text | `archive.org/download/{identifier}/{name}_hocr_searchtext.txt.gz` and `_hocr_pageindex.json.gz`, or `_djvu.txt` |

Requests use `fetch`, falling back to JSONP if that fails. Searches run three at a time.

**Volumes missing from the full-text index.** Some items have OCR text but have not been indexed for search-inside. For those, the tool downloads the item's OCR text once per session and searches it in the browser. These results are labelled **OCR text**.

- When the item has `_hocr_searchtext.txt.gz` (the text the Internet Archive's search engine uses, about 10 MB), `_hocr_pageindex.json.gz` (where each page starts and ends in that text), and `_page_numbers.json` (each page's scan leaf and printed page number), every hit is placed on its exact scan.
- Older items without those files fall back to `_djvu.txt`. That file has no page breaks, so the page is estimated from the hit's position in the file and shown with `≈`. In a volume of a few thousand pages the estimate can be dozens of pages off.

This fallback returns at most 300 hits per volume and term.

**Adding a collection to the menu.** Edit `collections.js`: copy a line in the right state group and change its `id`, `label`, `q` (the Internet Archive query), and optional `note`. The `id` appears in shared links, so don't change it once published. Suggestions are welcome as [GitHub issues](https://github.com/kamichoy/city-directory-search/issues/new).

**Saved state and privacy.** Your chosen collection, directory list, selections, search terms, and cached item metadata are kept in the browser's `localStorage`, so they persist between visits on the same browser. There are no accounts and no analytics; nothing is sent anywhere other than the Internet Archive. To move a setup to another device, use **Copy link to this collection**.

## Limitations

- OCR text contains errors. Treat every result as a lead and verify it against the page scan.
- A missing result does not mean the person or address is absent from the directory. The OCR may have misread it, and pages that were folded, damaged, or tightly bound in the scan may have no text at all. The tool can't detect or fix these; check the neighboring entries and the scan itself.
- Page links marked `≈` are estimates and can be dozens of pages off.
- Collection loading is capped at 1,000 volumes per query.
- Years are inferred from each item's metadata, title, or identifier, and may occasionally be wrong or missing (shown as **Undated**).
- Availability and speed depend on the Internet Archive's services.

## Credits

Directory scans and OCR text are served by the [Internet Archive](https://archive.org) and belong to the libraries and archives that contributed them, including the Indianapolis Public Library, whose [city directory collection](https://archive.org/details/indianapolispubliclibrarycitydirectories) the tool was built around. This tool is not affiliated with the Internet Archive or any contributing library.
