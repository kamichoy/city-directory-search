/* Directory collections offered in the "Directory collection" menu.

   To add a collection, copy one line inside the right group (or add a group) and edit it:
     id     short, unique, lowercase; it appears in shared links as ?c=<id>, so don't change it later
     label  what the menu shows
     q      the Internet Archive advanced-search query that lists the volumes
     note   optional; shown under the menu (who holds it, what it contains)

   A collection's ID is the last part of its address: archive.org/details/allen_county -> collection:allen_county.
   If a collection mixes directories with other material, narrow it by title, e.g.
     collection:allen_county AND title:("fort wayne" AND "city directory")
   Groups and entries appear in the order written here. */
window.CDS_COLLECTIONS = [
  { group: 'Indiana', items: [
    { id: 'indianapolis', label: 'Indianapolis', q: 'collection:indianapolispubliclibrarycitydirectories',
      note: 'Indianapolis Public Library, 1858 to 2001.' },
    { id: 'fort-wayne', label: 'Fort Wayne', q: 'collection:allen_county AND title:("fort wayne" AND "city directory")',
      note: 'Allen County Public Library, filtered to Fort Wayne city directories.' },
    { id: 'lake-county-in', label: 'Lake County (Calumet Region)', q: 'collection:LakeCoDirectories AND title:("city directory")',
      note: 'Lake County Public Library city directories, 1909 to 1996: mostly Crown Point and Hobart, a few Gary and Griffith. For Gary, Hammond, East Chicago and Whiting, use the Lake County telephone directories.' },
    { id: 'lake-county-in-phone', label: 'Lake County telephone directories (Calumet Region)', q: 'collection:LakeCoDirectories AND description:("telephone directory") AND NOT title:("city directory")',
      note: 'Lake County Public Library, 1909 to 1999: Gary, Hammond, East Chicago, Whiting and the Calumet District, plus the smaller towns. Listings are alphabetical by name, with addresses.' },
    { id: 'new-albany', label: 'New Albany and Jeffersonville', q: 'collection:nafcpubliclibrary AND title:("city directory")',
      note: 'New Albany-Floyd County Public Library, 1845 to 1920. From 1884 most volumes also cover Jeffersonville.' },
    { id: 'indiana-other', label: 'Other Indiana cities and counties', q: 'collection:allen_county AND mediatype:texts AND title:(directory) AND title:(indiana OR ind) AND NOT title:("fort wayne" OR indianapolis OR school OR schools OR "york rite" OR telephone OR rural OR alumni OR church OR churches OR masonic OR lodge OR medical OR physicians OR club OR society OR members OR membership OR genealogy OR family OR scientists OR war OR pythian OR "western address" OR atlas)',
      note: 'Allen County Public Library: one to a few volumes each for Anderson, Elkhart, Evansville, Hartford City, Huntington, Lafayette, LaPorte, Logansport, Michigan City, Muncie, New Castle, Richmond, South Bend, Valparaiso and other places, plus Indiana State gazetteers and county farm directories. Check each title before searching.' },
  ]},
  { group: 'California', items: [
    { id: 'sacramento', label: 'Sacramento', q: 'collection:cshcitydirectories', note: 'Center for Sacramento History.' },
  ]},
  { group: 'Connecticut', items: [
    { id: 'hartford', label: 'Hartford', q: 'collection:connecticutdirectories', note: 'Three volumes, 1956 to 1966.' },
  ]},
  { group: 'Iowa', items: [
    { id: 'des-moines', label: 'Des Moines and Polk County', q: 'collection:desmoinesandpolkcountycitydirectories' },
  ]},
  { group: 'Massachusetts', items: [
    { id: 'cambridge-ma', label: 'Cambridge', q: 'collection:cambridgecitydirectories' },
    { id: 'new-bedford', label: 'New Bedford', q: 'collection:newbedfordfreenewbedfordcitydirectories' },
    { id: 'waltham', label: 'Waltham and Watertown', q: 'collection:walthamcitydirectories' },
  ]},
  { group: 'Michigan', items: [
    { id: 'saginaw', label: 'Saginaw', q: 'collection:saginaw-city-directories' },
  ]},
  { group: 'New Jersey', items: [
    { id: 'bloomfield', label: 'Bloomfield', q: 'collection:bloomfieldpubliclibrarycitydirectories', note: 'Bloomfield Public Library, 1870 to 1971.' },
    { id: 'new-brunswick', label: 'New Brunswick', q: 'collection:newbrunswickfreepubliclibrary', note: 'Four volumes, 1855 to 1871.' },
    { id: 'newark', label: 'Newark', q: 'collection:newarkcitydirectories' },
    { id: 'plainfield', label: 'Plainfield', q: 'collection:plainfieldpubliclibrarycitydirs', note: 'Plainfield Public Library, 1870 to 1982 with gaps.' },
  ]},
  { group: 'New York', items: [
    { id: 'brooklyn', label: 'Brooklyn', q: 'collection:brooklyncitydirectoriesonmicrofiche' },
    { id: 'staten-island', label: 'Staten Island', q: 'collection:statenislandmuseumdirectories AND title:(directory)',
      note: 'Staten Island Museum, filtered to directories (the full collection also holds histories and maps).' },
  ]},
  { group: 'North Carolina', items: [
    { id: 'greensboro', label: 'Greensboro', q: 'collection:gso-city-directory', note: '1884 to 1963.' },
    { id: 'nc-cities', label: 'North Carolina cities, 1879 to 1959', q: 'collection:dulcitydirectory',
      note: 'Asheville, Charlotte, Durham, High Point, Wilmington and more, plus a few telephone directories.' },
    { id: 'nc-statewide', label: 'North Carolina (statewide)', q: 'collection:ncdir' },
  ]},
  { group: 'Ohio', items: [
    { id: 'akron', label: 'Akron and Summit County', q: 'collection:akron-summit-directories' },
  ]},
  { group: 'Oregon', items: [
    { id: 'clatsop', label: 'Clatsop County (Astoria, Seaside)', q: 'collection:clatsopcountycitydirectories', note: '1890 to 1998.' },
  ]},
  { group: 'Rhode Island', items: [
    { id: 'providence', label: 'Providence', q: 'collection:providencepublicdirectories', note: 'Some volumes have no year in their catalog record and are listed as Undated.' },
    { id: 'warwick', label: 'Warwick and East Greenwich', q: 'collection:warwickpubliclibrarycitydirectories', note: '1914 to 1979, plus a few Providence volumes.' },
  ]},
  { group: 'Virginia', items: [
    { id: 'virginia-beach', label: 'Virginia Beach and Norfolk area', q: 'collection:vbpl-citydirectories',
      note: 'Includes telephone directories. Some volumes have no year in their catalog record.' },
  ]},
  { group: 'Wisconsin', items: [
    { id: 'menomonie', label: 'Menomonie (Dunn County)', q: 'collection:dunncountydirectories', note: 'Mostly telephone directories, 1919 to 1960.' },
  ]},
  { group: 'Canada', items: [
    { id: 'hamilton-on', label: 'Hamilton, Ontario', q: 'collection:hamiltondirectories', note: '1853 to 1999.' },
    { id: 'peterborough-on', label: 'Peterborough, Ontario', q: 'collection:peterboroughcitydirectories', note: '1858 to 2010, including county directories.' },
    { id: 'windsor-on', label: 'Windsor, Ontario', q: 'collection:WindsorOntarioCityDirectories', note: '1888 to 1988.' },
  ]},
  { group: 'Scotland', items: [
    { id: 'scotland', label: 'Scottish Post Office directories', q: 'collection:scottishdirectories',
      note: 'Over 1,000 volumes for towns across Scotland. Use a year range before searching.' },
  ]},
];
