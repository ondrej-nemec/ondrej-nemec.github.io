# Strukturované formáty - research
## CSV
```csv
1995,Opel,Vectra,"klimatizace, stresni okno",45000
1998,Skoda,"Felicia ""Fun""",,80000
2002,Skoda,Octavia,"klimatizace, ABS
bourani",70000
```
Soubor ve formátu CSV sestává z řádků,
 ve kterých jsou jednotlivé položky odděleny znakem čárka (,).
Hodnoty polo?ek mohou b?t uzav?eny do uvozovek ("), co? umo??uje,
aby text polo?ky obsahoval ??rku. Pokud text polo?ky
obsahuje uvozovky, jsou tyto zdvojeny.
Nem? koment??e
**????**
M??e b?t text v jednoduch?ch uvozovk?ch?

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
Vstupem je libovoln? datov? struktura (??slo, ?et?zec, boolean, objekt nebo z nich slo?en? pole), v?stupem je v?dy ?et?zec. Slo?itost hierarchie vstupn? prom?nn? nen? teoreticky nijak omezena.
JSON um? pojmout pole hodnot (neindexovan? i indexovan?, tzv. hash), objekty (coby pole dvojic index:hodnota) a jednotliv? hodnoty, kter?mi mohou b?t ?et?zce, ??sla (cel? i s pohyblivou ??dovou ??rkou) a speci?ln? hodnoty true, false a null. Indexy pol? v objektu maj? notaci jako ?et?zce; ?et?zce jsou uv?d?ny v uvozovk?ch a escapov?ny pomoc? zp?tn?ho lom?tka. Mezi prvky a hodnotami mohou b?t libovoln? b?l? znaky, kter? na v?sledku nic nem?n?.
Nem? koment??e

## XML
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!-- Poznamka je nutn? p?idat v?ce recept?. -->
<recept jm?no="chleba" ?as_p??pravy="5 minut" ?as_va?en?="3 hodiny">
  <titulek>Jednoduch? chleba</titulek>
  <p??sada mno?stv?="3" jednotka="??lky">Mouka</p??sada>
  <p??sada mno?stv?="0,25" jednotka="unce">Kvasnice</p??sada>
  <p??sada mno?stv?="1,5" jednotka="??lku">Hork? voda</p??sada>
  <p??sada mno?stv?="1" jednotka="k?vov? l?i?ka">S?l</p??sada>
  <empty />
  <empty></empty>
  <postup>
    <krok>Sm?chejte v?echny p??sady dohromady a dob?e prohn??te.</krok>
    <krok>Zakryjte tkaninou a nechejte hodinu v tepl? m?stnosti.</krok>
    <krok>Znovu prohn??te, um?st?te na plech a pe?te v troub?.</krok>
  </postup>
</recept>
```
Mus? m?t pr?v? jeden ko?enov? (root) element.
Nepr?zdn? elementy mus? b?t ohrani?eny startovac? a ukon?ovac? zna?kou. Pr?zdn? elementy mohou b?t ozna?eny tagem ?pr?zdn? element?.
V?echny hodnoty atribut? mus? b?t uzav?eny v uvozovk?ch ? jednoduch?ch (') nebo dvojit?ch ("), ale jednoduch? uvozovka mus? b?t uzav?ena jednoduchou a dvojit? dvojitou. Opa?n? p?r uvozovek m??e b?t pou?it uvnit? hodnot.
Elementy mohou b?t vno?eny, ale nemohou se p?ekr?vat; to znamen?, ?e ka?d? (ne ko?enov?) element mus? b?t cel? obsa?en v jin?m elementu.
Jm?na element? v XML rozli?uj? mal? a velk? p?smena: nap?. ?<P??klad>? a ?</P??klad>? je p?r, kter? vyhovuje spr?vn? strukturovan?mu dokumentu, p?r ?<P??klad>? a ?</p??klad>? je chybn?.

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
 # Toto je pozn?mka
 # pole
 - Ban?ny
 - Pomeran?e
 - Mandarinky
 
 # mapa
 Bo?ena N?mcov?: Babi?ka
 Ernest Hemingway: Sta?ec a mo?e
 Douglas Addams: Stopa??v pr?vodce po Galaxii
 
 # dokument
 --- # Seznam knih
 Autor: Bo?ena N?mcov?
 Kniha: Babi?ka
 ---
 Autor: Ernest Hemingway
 Kniha: Sta?ec a mo?e
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
  # Nov? ??dky budou zam?n?ny za mezery, ?vodn? mezery budou vynech?ny.
  
  # asociativni pole
  - {name: John Smith, age: 33}
  
  - name: John Smith
    age: 33
    
    # neasociatni pole
    [John Smith, Bill Jones]
    
    {0: John Smith, 1: Bill Jones}
    
    ---
	a: 123                     # cel? ??slo
	b: "123"                   # ?et?zec, vynuceno uvozovkami
	c: 123.0                   # ??slo s plovouc? desetinnou ??rkou
	d: !!float 123             # ditto, p?etypov?n? vynuceno kl??ov?m slovem
	e: !!str 123               # p?etypov?n? pro ?et?zec, jako b)
	g: Yes                     # boolean
	f: No                      # boolean
	h: !!str Yes               # ?et?zec, p?etypov?n? vynuceno kl??ov?m slovem
	i: Yes we have No bananas  # ?et?zec
	---                        # bin?rn? data (base64)
	picture: !!binary |
	  R0lGODlhDAAMAIQAAP//9/X
	  17unp5WZmZgAAAOfn515eXv
	  Pz7Y6OjuDg4J+fn5OTk6enp
	  56enmleECcgggoBADs=mZmE
```
?itelnost nejen strojem, ale i ?lov?kem
struktura a hierarchie dat je ?e?ena indentac? (p?edsazen?m)
p?edsazen? o jednu ?rove? sest?v? ze 2 nebo 4 mezer; tabul?tory nejsou povoleny.
neomezen? ?rovn? vno?ov?n?

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
==P??klad u?it?==
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

