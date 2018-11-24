# Strukturované formáty - research
* [CSV](#csv)
* [JSON](#json)
* [XML](#xml)
* [YAML](#yaml)
* [NEON](#neon)
* [ENV](#.env)
* [MD](#md)

## [CSV](https://cs.wikipedia.org/wiki/CSV)
```csv
1995,Opel,Vectra,"klimatizace, stresni okno",45000
1998,Skoda,"Felicia ""Fun""",,80000
2002,Skoda,Octavia,"klimatizace, ABS
bourani",70000
```
Soubor ve formátu CSV sestává z řádků,
 ve kterých jsou jednotlivé položky odděleny znakem čárka (,).
Hodnoty položek mohou být uzavřeny do uvozovek ("), což umožňuje,
aby text položky obsahoval čárku. Pokud text položky
obsahuje uvozovky, jsou tyto zdvojeny.
Nemá komentáře, text nemůže být v jednoduchých uvozovkách

## [JSON](https://cs.wikipedia.org/wiki/JavaScript_Object_Notation)
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
Vstupem je libovolná datová struktura (číslo, řetězec, boolean, objekt nebo z nich složené pole), výstupem je vždy řetězec. Složitost hierarchie vstupní proměnné není teoreticky nijak omezena.
JSON umí pojmout pole hodnot (neindexované i indexované, tzv. hash), objekty (coby pole dvojic index:hodnota) a jednotlivé hodnoty, kterými mohou být řetězce, čísla (celá i desetinná) a speciální hodnoty true, false a null. Indexy polí v objektu mají notaci jako řetězce; řetězce jsou uvedeny v uvozovkách a escapovány pomocí zpětného lomítka. Mezi prvky a hodnotami mohou být libovolné bílé znaky, které na výsledku nic nemění.
Nemá komentáře

## [XML](https://cs.wikipedia.org/wiki/Extensible_Markup_Language)
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!-- Poznamka -->
<recept jmeno="chleba" cas_pripravy="5 minut" cas_vareni="3 hodiny">
  <titulek>Jednoduchý chleba</titulek>
  <prisada mnozstvi="3" jednotka="unce">Mouka</prisada>
  <prisada mnozstvi="0,25" jednotka="unce">Kvasnice</prisada>
  <prisada mnozstvi="1,5" jednotka="unce">Horká voda</prisada>
  <prisada mnozstvi="1" jednotka="unce">Sůl</prisada>
  <empty />
  <empty></empty>
  <postup>
    <krok>asaaaaaaaaaaaaaaaaaaaaaa</krok>
    <krok>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</krok>
    <krok>cccccccccccccccccccccccccc</krok>
  </postup>
</recept>
```
Musí mít právě jeden kořenový (root) element.
Neprázdný elementy musí být ohraničeny startovací a ukončovací značkou. Prázdné elementy mohou být označeny tagem prázdný element.
Všechny hodnoty atributů musí být uzavřeny v uvozovkách jednoduchých (') nebo dvojitých ("), ale jednoduchá uvozovka musí být uzavřena jednoduchou a dvojitá dvojitou. Opačný pár uvozovek může být použit uvnitř hodnot.
Elementy mohou být vnořeny, ale nemohou se překrývat; to znamená, že každý (ne kořenový) element musí být celý obsažen v jiném elementu.
Jména elementů v XML rozlišují malá a velká písmena: např. <Priklad> a </Priklad> je pár, který vyhovuje správně strukturovanému dokumentu, pár <Priklad> a </priklad> je chybný.

## [NEON](https://doc.nette.org/cs/2.4/neon)
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

## [YAML](https://cs.wikipedia.org/wiki/YAML)
```yaml
 # Toto je pozn?mka
 # pole
 - Ban?ny
 - Pomeran?e
 - Mandarinky
 
 # mapa
 Božena Němcová: Babička
 Ernest Hemingway: Stařec a moře
 Douglas Addams: Stopařův průvodce po Galaxii
 
 # dokument
 --- # Seznam knih
 Autor: Božena Němcová
 Kniha: Babička
 ---
 Autor: Ernest Hemingway
 Kniha: Stařec a moře
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
  # Nove radky budou zameneny za mezery, uvodni mezery budou vynechany.
  
  # asociativni pole
  - {name: John Smith, age: 33}
  
  - name: John Smith
    age: 33
    
    # neasociatni pole
    [John Smith, Bill Jones]
    
    {0: John Smith, 1: Bill Jones}
    
    ---
	a: 123                     # cele cislo
	b: "123"                   # retezec, vynuceno uvozovkami
	c: 123.0                   # cislo s plovouci desetinnou carkou
	d: !!float 123             # ditto, pretypovani vynuceno klicovym slovem
	e: !!str 123               # pretypovani pro retezec, jako b)
	g: Yes                     # boolean
	f: No                      # boolean
	h: !!str Yes               # retezec, pretypovani vynuceno klicovym slovemm
	i: Yes we have No bananas  # retezec
	---                        # binarni data (base64)
	picture: !!binary |
	  R0lGODlhDAAMAIQAAP//9/X
	  17unp5WZmZgAAAOfn515eXv
	  Pz7Y6OjuDg4J+fn5OTk6enp
	  56enmleECcgggoBADs=mZmE
```
čitelnost nejen strojem, ale i člověkem
struktura a hierarchie dat je dosažena indentací (předsazením)
předsazení o jednu úroveň sestává ze 2 nebo 4 mezer; tabulátory nejsou povoleny.
neomezeně úovní vnořovoní

## [.env](https://www.npmjs.com/package/dotenv)
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

## [MD](https://cs.wikipedia.org/wiki/Markdown)
```md
==Příklad==
{|class="wikitable"
! width="33%" | Zdrojov? text ve form?tu jazyka Markdown
! width="33%" | Zdrojov? text ve form?tu [[HyperText Markup Language|HTML]]
! width="33%" | Text zobrazen? v [[webov? prohl??e?|prohl??e?i]]
|- valign="top"
|
 <nowiki>
Hlavn? nadpis
==========

* toto
* je
* seznam

Men?? podnadpis
---------------

1. toto 
2. se ??sluje
1. ale na ??slech nez?le??

# Hlavn? nadpis jinak

## Men?? nadpis jinak

### Je?t? men?? nadpis jinak

Odstavce se odd?luj?
pr?zdn?m ??dkem. Na d?lce ??dk? nez?le??

Ud?l?m nov? odstavec. Je?t? odkaz na 
[dokumentaci](http://daringfireball.net/projects/markdown/syntax)

Horizont?ln? odd?lova?:
---

Vlastnosti textu _kurz?va_, *kurz?va*, __tu?n?__, **tu?n?**, `neproporcion?ln?`.

<p>Dle libosti <em>m??u pou??vat</em> html</p>
</nowiki>
||
<syntaxhighlight lang="html5">
<h1>Hlavn? nadpis</h1>

<ul>
<li>toto</li>
<li>je</li>
<li>seznam</li>
</ul>

<h2>Men?? podnadpis</h2>

<ol>
<li>toto </li>
<li>se ??sluje</li>
<li>ale na ??slech nez?le??</li>
</ol>

<h1>Hlavn? nadpis jinak</h1>

<h2>Men?? nadpis jinak</h2>

<h3>Je?t? men?? nadpis jinak</h3>

<p>Odstavce se odd?luj?
pr?zdn?m ??dkem. Na d?lce ??dk? nez?le??</p>

<p>Ud?l?m nov? odstavec. Je?t? odkaz na 
<a href="http://daringfireball.net/projects/markdown/syntax">dokumentaci</a></p>

Horizont?ln? odd?lova?:
<hr>

Vlastnosti textu <i>kurz?va</i>, <i>kurz?va</i>, <b>tu?n?</b>, <b>tu?n?</b>, <code>neproporcion?ln?</code>.

<p>Dle libosti <em>m??u pou??vat</em> html</p>
</syntaxhighlight>
||
<h1>Hlavn? nadpis</h1>

* toto
* je
* seznam

<h2>Men?? podnadpis</h2>
# toto 
# se ??sluje
# ale na ??slech nez?le??

<h1>Hlavn? nadpis jinak</h1>

<h2>Men?? nadpis jinak</h2>

<h3>Je?t? men?? nadpis jinak</h3>

Odstavce se odd?luj?
pr?zdn?m ??dkem. Na d?lce ??dk? nez?le??

Ud?l?m nov? odstavec. Je?t? odkaz na 
[http://daringfireball.net/projects/markdown/syntax dokumentaci]

Horizont?ln? odd?lova?:
<hr>

Vlastnosti textu <i>kurz?va</i>, <i>kurz?va</i>, <b>tu?n?</b>, <b>tu?n?</b>, <code>neproporcion?ln?</code>.

<p>Dle libosti <em>m??u pou??vat</em> html</p>

|- valign="top"
|
 <nowiki>
Nebo obr?zek 
![Alt text](https://commons.wikimedia.org/wiki/File:Markdown-mark.svg)
</nowiki>
||
<syntaxhighlight lang="html5">
<p>Nebo obr?zek 
<img alt="Alt text" src="https://commons.wikimedia.org/wiki/File:Markdown-mark.svg" /></p>
</syntaxhighlight>
|| 
Nebo obr?zek 
[[File:Markdown-mark.svg]]

|- valign="top"
|
 <nowiki>
Konec ??dku uprost?ed odstavce      
se ud?l?  
pomoc? n?kolika mezer na konci ??dku.

Toto je [hyperlink](https://cs.wikipedia.org/wiki/Hyperlink)

nebo <http://cs.wikipedia.org>
</nowiki>
||
<syntaxhighlight lang="html5">
<p>Konec ??dku uprost?ed odstavce  <br />
se ud?l?<br />
pomoc? n?kolika mezer na konci ??dku.</p>

<p>Toto je <a href="https://cs.wikipedia.org/wiki/Hyperlink">hyperlink</a></p>

<p>nebo <a href="http://cs.wikipedia.org">http://cs.wikipedia.org</a></p>
</syntaxhighlight>
|| 
Konec ??dku uprost?ed [[odstavec|odstavce]]<br />
se ud?l?  <br />
pomoc? n?kolika mezer na konci ??dku.


Toto je [[hyperlink]]

nebo http://cs.wikipedia.org
|}

```

