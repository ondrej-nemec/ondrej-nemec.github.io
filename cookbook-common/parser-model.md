* [CSV](#csv)
* [JSON](#json)
* [XML](#xml)
* [YAML](#yaml)
* [NEON](#neon)
* [ENV](#.env)
* [MD](#md)

jednořádkový komentář
víceřádkový komentář
hodnota + výčet
vnořené objekty
dvojité uvozovky + escape
jednoduché uvozovky + escape
seznam-pole
mapa
pre / post ignoring
text se zachováním bílích znaků
text bez zachování bílích znaků
jméno

objekt
	jméno
	atributy (list, mapa) - jméno a hodnota
	vnořené objekty (list, mapa) - jméno a objekt

* začátek objektu
* konec objektu
* začátek jména atributu
* konec jména atributu
* začátek hodnoty
* konec hodnoty

<table>
	<thead>
		<tr>
			<th></th>
			<th>CSV</th>
			<th>JSON</th>
			<th>XML</th>
			<th>YAML</th>
			<th>NEON</th>
			<th>DOTENV</th>
			<th>MD</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Začátek objektu</td>
			<td>začátek řádku</td>
			<td>{</td>
			<td>&lt;jmeno&gt; <br>prázný objekt: &lt;jmeno /&gt;</td>
			<td>začátek řádku</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Konec objektu</td>
			<td>'/n'</td>
			<td>}</td>
			<td>&lt;/jmeno&gt;</td>
			<td>:</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Jméno objektu + začátek a konec</td>
			<td>není </td>
			<td>není</td>
			<td>&lt;jmeno mezera</td>
			<td>od začátku řádku k ":"</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Jméno atributu, začátek + konec, oddělení od hodnoty</td>
			<td>není</td>
			<td>"jmeno":</td>
			<td>jmeno="hodnota" mezera</td>
			<td>"\t" od objektu, k ":"</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Pole, začátek a konec, oddělovač</td>
			<td>není</td>
			<td>[hodnota, hodnota]</td>
			<td>ne</td>
			<td>- hodnota jednotlivé řádky <br> - {hodnota, hodnota}</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Hodnota, začátek a konec, oddělovač</td>
			<td>hodnota,<br>neosekává bílé znaky</td>
			<td>"hodnota",<br>111<br>osekává bílé znaky okolo, čísla bez uvozovek<br>"false, true ,null"</td>
			<td>mezi &gt; a &lt;</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>" escape</td>
			<td>""</td>
			<td>\"</td>
			<td>\"</td>
			<td>\"</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>' jako obal hodnot</td>
			<td>ne</td>
			<td>ne</td>
			<td>ano, escape \'</td>
			<td>ano</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>jednořádkový komentář</td>
			<td>ne</td>
			<td>ne</td>
			<td>ne</td>
			<td>#</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>víceřádkový komentář</td>
			<td>ne</td>
			<td>ne</td>
			<td>&lt;!-- text --&gt;</td>
			<td>ne</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>vnořený objekt</td>
			<td>ne</td>
			<td>ano</td>
			<td>ano</td>
			<td>ano</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>více root elementů</td>
			<td>ano</td>
			<td>ne</td>
			<td>ne</td>
			<td>ano</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Ignore</td>
			<td>'\r' mimo uvozovky</td>
			<td>ne</td>
			<td>&lt;?xml version="1.0" encoding="UTF-8" ?&gt;</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Víceřádkový text</td>
			<td>jen v uvozovkách</td>
			<td></td>
			<td>ano</td>
			<td> | text o tab dále</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Víceřádkový text s ignorováním nového řádku</td>
			<td>ne</td>
			<td>ne</td>
			<td>ne</td>
			<td>&gt; nový řádek text o tab dále</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>

</table>