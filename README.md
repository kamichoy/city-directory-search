# City Directory Search

Search the OCR full text of city directories on the Internet Archive across many years at once, without downloading the scans. Every result links straight to its page scan.

**Try it: <https://city-directory-search.pages.dev/>**

The tool is a single static HTML file. There is no build step, no server, and no dependencies. It talks directly to the Internet Archive's public APIs from your browser.

## Why I built it

City directories are one of the best sources for tracing a person, a business, or an address over time. I use them constantly in my research, and for a long time I relied on the Internet Archive’s “Search text contents” option to find what I needed.

That search tells you which books contain your term, but not where, or in what context. Every result had to be opened and searched again before I could tell whether it held the entry I was looking for, and in a directory with thousands of pages, a word like “Meridian” turns up hundreds of times in a single volume. Following one address through forty years meant forty rounds of opening, searching, and scrolling.

This tool skips that step. It runs the search across every volume you select and lists each individual hit in one table, grouped by year, with the surrounding text and a link straight to the page scan. You can tell at a glance which entry is the one you want before opening anything.

I built it around the [Indianapolis Public Library’s city directory collection](https://archive.org/details/indianapolispubliclibrarycitydirectories), but it works with any city directories on the Internet Archive that have OCR text.

## Getting started

Use the hosted version at <https://city-directory-search.pages.dev/>, or run it yourself by opening `index.html` in a browser.

If a request is blocked when the page is opened from `file://`, serve the folder locally instead:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. The file can also be hosted as-is on any static host, such as Cloudflare Pages or GitHub Pages.

## How to use it

### 1. Pick the directories

On first load the tool fetches the list of volumes in the default collection. Nothing is selected until you choose which years to search.

The panel has two parts. The top part builds the list of volumes:

- **Load / refresh** runs the Internet Archive query in the box and adds the matching volumes to the list. Change the query to load a different collection; any Internet Archive advanced search query works.
- **Query notes** under the box lists filter syntax and one-click queries for other cities. Many library collections mix directories with other genealogy material, so narrow them by title, e.g. `collection:allen_county AND title:("fort wayne" AND "city directory")`.
- **Add to list** adds the Internet Archive identifiers or `archive.org` links typed in the box above it, one per line, for items outside the loaded collection.

The bottom part chooses which of those volumes to search:

- **Select range** selects every volume between two years.
- **Decade buttons** select a decade. Hold Shift, Ctrl, or Cmd while clicking to add the decade to the current selection instead of replacing it.
- **Select all** and **Clear selection** check or uncheck every volume.
- **Year checkboxes** toggle all volumes for a year. Each volume is listed under its year with its own checkbox, and the × button removes it from the list.

Loading a query adds to the list and the list is saved between visits, so volumes from different cities accumulate. Below the list, **Remove unselected from list** keeps only the checked volumes and **Empty list** clears everything so you can start over with one collection.

### 2. Enter search terms

Put one term per line: an address, a name, a business. Each term is searched in each selected volume.

- Words in a term must all appear in the same passage.
- Put words in quotes to require them to appear together, e.g. `"N Meridian" 1234`. Case, punctuation, and line breaks are ignored, so `"N Meridian"` also matches `N. Meridian`. The quotes carry over to the Internet Archive viewer's search box when you open a result.
- Quoted terms are also much faster. The Internet Archive's search returns every passage containing any one of the words, so an unquoted term with common words like `N` or `Meridian` can take a minute per volume or time out. A request that gets no answer in 45 seconds is dropped and reported as failed.
- To look up an address, search house number plus street, e.g. `1234 N Meridian`. The street directory section (usually in the back) is arranged by street and house number.
- OCR often confuses `0`/`O` and `1`/`l`, and multi-column layouts can run lines together. If nothing comes up, try a shorter term or an alternate spelling.

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
- The **Scan** link opens the page in the Internet Archive viewer with your term highlighted. The two-page view shows the matching page next to its neighbor.
- **Export CSV** downloads the currently filtered results with these columns: `year`, `term`, `snippet`, `scan_index`, `link`, `title`, `volume`, `identifier`.

## How it works

| Step | Endpoint |
| --- | --- |
| List the volumes in a collection | `archive.org/advancedsearch.php` |
| Look up each item's server, path, and file names | `archive.org/metadata/{identifier}` |
| Search inside a volume | `{server}/fulltext/inside.php` |
| Fallback: download the OCR text | `archive.org/download/{identifier}/{name}_djvu.txt` |

Requests use `fetch`, falling back to JSONP if that fails. Searches run three at a time.

**Volumes missing from the full-text index.** Some items have OCR text but have not been indexed for search-inside. For those, the tool downloads the item's `_djvu.txt` file (usually tens of MB) once per session and searches it in the browser. These results are labelled **OCR text**. If the text file has no page breaks, the page number is estimated from the hit's position in the file and shown with a `≈` prefix. This fallback returns at most 300 hits per volume and term.

**Saved state.** Your directory list, selections, search terms, and cached item metadata are kept in the browser's `localStorage`, so they persist between visits on the same browser. Nothing is sent anywhere other than the Internet Archive.

## Limitations

- OCR text contains errors. Treat every result as a lead and verify it against the page scan.
- A missing result does not mean the person or address is absent from the directory; the OCR may have misread it.
- Collection loading is capped at 1,000 volumes per query.
- Years are inferred from each item's metadata, title, or identifier, and may occasionally be wrong or missing (shown as **Undated**).
- Availability and speed depend on the Internet Archive's services.

## Credits

Directory scans and OCR text are served by the [Internet Archive](https://archive.org/details/indianapolispubliclibrarycitydirectories) from the Indianapolis Public Library's city directory collection. This tool is not affiliated with either.
