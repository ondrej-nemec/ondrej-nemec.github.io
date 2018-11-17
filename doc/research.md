# Strukturované formáty - research
## CSV
```csv
1995,Opel,Vectra,"klimatizace, støešní okno",45000
1998,Škoda,"Felicia ""Fun""",,80000
2002,Škoda,Octavia,"klimatizace, ABS
bouraná",70000
```
Soubor ve formátu CSV sestává z øádkù,
 ve kterıch jsou jednotlivé poloky oddìleny znakem èárka (,).
Hodnoty poloek mohou bıt uzavøeny do uvozovek ("), co umoòuje,
aby text poloky obsahoval èárku. Pokud text poloky
obsahuje uvozovky, jsou tyto zdvojeny.
Nemá komentáøe
**????**
Mùe bıt text v jednoduchıch uvozovkách?

## JSON
```json
{
    "0": 1,
    "1": -2,
    "2": 3.333,
    "3": 4.0e+17,
    "4": "abc",
    "5": "\u00e1\n",
    "6": null,
    "7": [
        2.1,
        2.2,
        [
            "2.2.1"
        ]
    ],
    "8": false,
    "9": true,
    "10": "",
    "key": "value",
    "abc\"def": [],
    "object": {
		"a": "a",
		"b": {
			"c": "c"
		}    
    }
}
```
Vstupem je libovolná datová struktura (èíslo, øetìzec, boolean, objekt nebo z nich sloené pole), vıstupem je vdy øetìzec. Sloitost hierarchie vstupní promìnné není teoreticky nijak omezena.
JSON umí pojmout pole hodnot (neindexované i indexované, tzv. hash), objekty (coby pole dvojic index:hodnota) a jednotlivé hodnoty, kterımi mohou bıt øetìzce, èísla (celá i s pohyblivou øádovou èárkou) a speciální hodnoty true, false a null. Indexy polí v objektu mají notaci jako øetìzce; øetìzce jsou uvádìny v uvozovkách a escapovány pomocí zpìtného lomítka. Mezi prvky a hodnotami mohou bıt libovolné bílé znaky, které na vısledku nic nemìní.
Nemá komentáøe

## XML
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!-- Poznamka je nutné pøidat více receptù. -->
<recept jméno="chleba" èas_pøípravy="5 minut" èas_vaøení="3 hodiny">
  <titulek>Jednoduchı chleba</titulek>
  <pøísada mnoství="3" jednotka="šálky">Mouka</pøísada>
  <pøísada mnoství="0,25" jednotka="unce">Kvasnice</pøísada>
  <pøísada mnoství="1,5" jednotka="šálku">Horká voda</pøísada>
  <pøísada mnoství="1" jednotka="kávová lièka">Sùl</pøísada>
  <empty />
  <empty></empty>
  <postup>
    <krok>Smíchejte všechny pøísady dohromady a dobøe prohnìte.</krok>
    <krok>Zakryjte tkaninou a nechejte hodinu v teplé místnosti.</krok>
    <krok>Znovu prohnìte, umístìte na plech a peète v troubì.</krok>
  </postup>
</recept>
```
Musí mít právì jeden koøenovı (root) element.
Neprázdné elementy musí bıt ohranièeny startovací a ukonèovací znaèkou. Prázdné elementy mohou bıt oznaèeny tagem „prázdnı element“.
Všechny hodnoty atributù musí bıt uzavøeny v uvozovkách – jednoduchıch (') nebo dvojitıch ("), ale jednoduchá uvozovka musí bıt uzavøena jednoduchou a dvojitá dvojitou. Opaènı pár uvozovek mùe bıt pouit uvnitø hodnot.
Elementy mohou bıt vnoøeny, ale nemohou se pøekrıvat; to znamená, e kadı (ne koøenovı) element musí bıt celı obsaen v jiném elementu.
Jména elementù v XML rozlišují malá a velká písmena: napø. „<Pøíklad>“ a „</Pøíklad>“ je pár, kterı vyhovuje správnì strukturovanému dokumentu, pár „<Pøíklad>“ a „</pøíklad>“ je chybnı.

## NEON
```neon
# my web application config

php:
    date.timezone: Europe/Prague
    zlib.output_compression: true  # use gzip

database:
    driver: mysql
    username: root
    password: beruska92

users:
    - Dave
    - Kryten
    - Rimmer
```
vs

```json
{
"php": {
    "date.timezone": "Europe\/Prague",
    "zlib.output_compression": true
},
"database": {
    "driver": "mysql",
    "username": "root",
    "password": "beruska92"
},
"users": [
    "Dave", "Kryten", "Rimmer"
]
}
```

## YAML
```yaml
 # Toto je poznámka
 # pole
 - Banány
 - Pomeranèe
 - Mandarinky
 
 # mapa
 Boena Nìmcová: Babièka
 Ernest Hemingway: Staøec a moøe
 Douglas Addams: Stopaøùv prùvodce po Galaxii
 
 # dokument
 --- # Seznam knih
 Autor: Boena Nìmcová
 Kniha: Babièka
 ---
 Autor: Ernest Hemingway
 Kniha: Staøec a moøe
 ...
 
 
 # zachovani radku
 data: |
   There once was a short man from Ealing
   Who got on a bus to Darjeeling
       It said on the door
       "Please don't spit on the floor"
   So he carefully spat on the ceiling
  # vynechani radku
  specialDelivery:  >
    Follow the Yellow Brick
    Road to the Emerald City.
    Pay no attention to the
    man behind the curtain.
  # Nové øádky budou zamìnìny za mezery, úvodní mezery budou vynechány.
  
  # asociativni pole
  - {name: John Smith, age: 33}
  
  - name: John Smith
    age: 33
    
    # neasociatni pole
    [John Smith, Bill Jones]
    
    {0: John Smith, 1: Bill Jones}
    
    ---
	a: 123                     # celé èíslo
	b: "123"                   # øetìzec, vynuceno uvozovkami
	c: 123.0                   # èíslo s plovoucí desetinnou èárkou
	d: !!float 123             # ditto, pøetypování vynuceno klíèovım slovem
	e: !!str 123               # pøetypování pro øetìzec, jako b)
	g: Yes                     # boolean
	f: No                      # boolean
	h: !!str Yes               # øetìzec, pøetypování vynuceno klíèovım slovem
	i: Yes we have No bananas  # øetìzec
	---                        # binární data (base64)
	picture: !!binary |
	  R0lGODlhDAAMAIQAAP//9/X
	  17unp5WZmZgAAAOfn515eXv
	  Pz7Y6OjuDg4J+fn5OTk6enp
	  56enmleECcgggoBADs=mZmE
```
èitelnost nejen strojem, ale i èlovìkem
struktura a hierarchie dat je øešena indentací (pøedsazením)
pøedsazení o jednu úroveò sestává ze 2 nebo 4 mezer; tabulátory nejsou povoleny.
neomezené úrovnì vnoøování

## .env
```
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```
Add environment-specific variables on new lines in the form of NAME=VALUE.

* BASIC=basic becomes {BASIC: 'basic'} 
* empty lines are skipped
* lines beginning with # are treated as comments
* empty values become empty strings (EMPTY= becomes {EMPTY: ''})
* single and double quoted values are escaped (SINGLE_QUOTE='quoted' becomes {SINGLE_QUOTE: "quoted"})
* new lines are expanded if in double quotes (MULTILINE="new\nline" becomes
{MULTILINE: 'new
line'}
* inner quotes are maintained (think JSON) (JSON={"foo": "bar"} becomes {JSON:"{\"foo\": \"bar\"}")
* whitespace is removed from both ends of the value (see more on trim) (FOO=" some value " becomes {FOO: 'some value'})

## MD
```md
==Pøíklad uití==
{|class="wikitable"
! width="33%" | Zdrojovı text ve formátu jazyka Markdown
! width="33%" | Zdrojovı text ve formátu [[HyperText Markup Language|HTML]]
! width="33%" | Text zobrazenı v [[webovı prohlíeè|prohlíeèi]]
|- valign="top"
|
 <nowiki>
Hlavní nadpis
==========

* toto
* je
* seznam

Menší podnadpis
---------------

1. toto 
2. se èísluje
1. ale na èíslech nezáleí

# Hlavní nadpis jinak

## Menší nadpis jinak

### Ještì menší nadpis jinak

Odstavce se oddìlují
prázdnım øádkem. Na délce øádkù nezáleí

Udìlám novı odstavec. Ještì odkaz na 
[dokumentaci](http://daringfireball.net/projects/markdown/syntax)

Horizontální oddìlovaè:
---

Vlastnosti textu _kurzíva_, *kurzíva*, __tuènì__, **tuènì**, `neproporcionální`.

<p>Dle libosti <em>mùu pouívat</em> html</p>
</nowiki>
||
<syntaxhighlight lang="html5">
<h1>Hlavní nadpis</h1>

<ul>
<li>toto</li>
<li>je</li>
<li>seznam</li>
</ul>

<h2>Menší podnadpis</h2>

<ol>
<li>toto </li>
<li>se èísluje</li>
<li>ale na èíslech nezáleí</li>
</ol>

<h1>Hlavní nadpis jinak</h1>

<h2>Menší nadpis jinak</h2>

<h3>Ještì menší nadpis jinak</h3>

<p>Odstavce se oddìlují
prázdnım øádkem. Na délce øádkù nezáleí</p>

<p>Udìlám novı odstavec. Ještì odkaz na 
<a href="http://daringfireball.net/projects/markdown/syntax">dokumentaci</a></p>

Horizontální oddìlovaè:
<hr>

Vlastnosti textu <i>kurzíva</i>, <i>kurzíva</i>, <b>tuènì</b>, <b>tuènì</b>, <code>neproporcionální</code>.

<p>Dle libosti <em>mùu pouívat</em> html</p>
</syntaxhighlight>
||
<h1>Hlavní nadpis</h1>

* toto
* je
* seznam

<h2>Menší podnadpis</h2>
# toto 
# se èísluje
# ale na èíslech nezáleí

<h1>Hlavní nadpis jinak</h1>

<h2>Menší nadpis jinak</h2>

<h3>Ještì menší nadpis jinak</h3>

Odstavce se oddìlují
prázdnım øádkem. Na délce øádkù nezáleí

Udìlám novı odstavec. Ještì odkaz na 
[http://daringfireball.net/projects/markdown/syntax dokumentaci]

Horizontální oddìlovaè:
<hr>

Vlastnosti textu <i>kurzíva</i>, <i>kurzíva</i>, <b>tuènì</b>, <b>tuènì</b>, <code>neproporcionální</code>.

<p>Dle libosti <em>mùu pouívat</em> html</p>

|- valign="top"
|
 <nowiki>
Nebo obrázek 
![Alt text](https://commons.wikimedia.org/wiki/File:Markdown-mark.svg)
</nowiki>
||
<syntaxhighlight lang="html5">
<p>Nebo obrázek 
<img alt="Alt text" src="https://commons.wikimedia.org/wiki/File:Markdown-mark.svg" /></p>
</syntaxhighlight>
|| 
Nebo obrázek 
[[File:Markdown-mark.svg]]

|- valign="top"
|
 <nowiki>
Konec øádku uprostøed odstavce      
se udìlá  
pomocí nìkolika mezer na konci øádku.

Toto je [hyperlink](https://cs.wikipedia.org/wiki/Hyperlink)

nebo <http://cs.wikipedia.org>
</nowiki>
||
<syntaxhighlight lang="html5">
<p>Konec øádku uprostøed odstavce  <br />
se udìlá<br />
pomocí nìkolika mezer na konci øádku.</p>

<p>Toto je <a href="https://cs.wikipedia.org/wiki/Hyperlink">hyperlink</a></p>

<p>nebo <a href="http://cs.wikipedia.org">http://cs.wikipedia.org</a></p>
</syntaxhighlight>
|| 
Konec øádku uprostøed [[odstavec|odstavce]]<br />
se udìlá  <br />
pomocí nìkolika mezer na konci øádku.


Toto je [[hyperlink]]

nebo http://cs.wikipedia.org
|}

```

